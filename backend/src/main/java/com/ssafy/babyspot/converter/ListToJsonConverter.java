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
			return objectMapper.readValue(dbData, new TypeReference<List<String>>() {
			});
		} catch (Exception e) {
			try {
				JsonNode root = objectMapper.readTree(dbData);
				List<String> result = new ArrayList<>();
				if (root.has("summary")) {
					result.add(root.get("summary").asText());
				}
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
