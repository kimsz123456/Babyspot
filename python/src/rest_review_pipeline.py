from pipeline.pipeline import Pipeline

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()

restaurant_id = "2"
review_dir = f"/user/hadoop/final_rest_review_json/restaurant_id={restaurant_id}"

system_prompt = f'''
항상 한국어로 답해주세요.
다음 리뷰 데이터를 분석하여 다음과 같은 형식으로 키워드를 추출해주세요:

{{
  "restaurant_id": "{restaurant_id}",
  "keywords": {{
    "positive": [
      {{"keyword": "맛있는", "count": 15}},
      {{"keyword": "친절한", "count": 8}},
      ...
    ],
    "negative": [
      {{"keyword": "비싼", "count": 3}},
      {{"keyword": "시끄러운", "count": 2}},
      ...
    ]
  }},
  "facilities": {{
    "has_parking": false,
    "has_large_table": false,
    "has_child_chair": false,
    "has_child_tableware": false,
    "has_diaper_changing": false,
    "has_nursing_room": false,
    "has_playroom": false,
    "has_kids_menu": false
  }}
}}
'''

# Ollama가 자동으로 청크 처리를 하므로 process_directory 사용
result = pipeline.process_directory(
    hdfs_directory=review_dir,
    system_prompt=system_prompt
)

if result["success"]:
  print("✅ 파이프라인 처리 완료")

  # 결과 파일 이름에 restaurant_id 포함
  output_file = f"restaurant_{restaurant_id}_review_keywords.json"

  with open(output_file, "w", encoding="utf-8") as f:
    f.write(result["content"])

  print(f"✅ 결과가 {output_file} 파일에 저장되었습니다.")

else:
  print(f"❌ 파이프라인 처리 실패: {result['error']}")