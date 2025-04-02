package com.ssafy.babyspot.converter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ListToJsonConverter implements AttributeConverter<List<String>, String> {

	private static final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		if (attribute == null) {
			return null;
		}
		try {
			// 단순 리스트를 JSON 배열로 직렬화
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException("Error converting List<String> to JSON string.", e);
		}
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		if (dbData == null) {
			return new ArrayList<>();
		}
		try {
			// 우선 JSON 배열로 읽으려고 시도
			return objectMapper.readValue(dbData, new TypeReference<List<String>>() {
			});
		} catch (Exception e) {
			// 배열로 읽는데 실패하면 JSON 객체일 가능성이 있으므로, 객체로 파싱 후 summary와 reviews의 content를 추출
			try {
				JsonNode root = objectMapper.readTree(dbData);
				List<String> result = new ArrayList<>();
				// summary가 존재하면 추가
				if (root.has("summary")) {
					result.add(root.get("summary").asText());
				}
				// reviews 배열이 존재하면 각 review의 content 값을 추가
				if (root.has("reviews") && root.get("reviews").isArray()) {
					Iterator<JsonNode> elements = root.get("reviews").elements();
					while (elements.hasNext()) {
						JsonNode reviewNode = elements.next();
						if (reviewNode.has("content")) {
							result.add(reviewNode.get("content").asText());
						}
					}
				}
				return result;
			} catch (IOException ex) {
				throw new IllegalArgumentException("Error reading JSON string to List<String>.", ex);
			}
		}
	}
}
