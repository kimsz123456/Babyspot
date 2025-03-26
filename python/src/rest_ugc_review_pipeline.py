from pipeline.pipeline import Pipeline
from src.hadoop.hdfs_client import HDFSClient
import json  # JSON 처리를 위해 추가

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()
hdfs_client = HDFSClient()

restaurant_id = "1"
review_dir = f"/user/hadoop/final_rest_ugc_review_json/restaurant_id={restaurant_id}"

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

author_dirs = hdfs_client.list_directory(review_dir)

all_results = []
for author_dir in author_dirs:
    author_path = f"{review_dir}/{author_dir}"
    result = pipeline.process_directory(
        hdfs_directory=author_path,
        system_prompt=system_prompt
    )

    if result["success"]:
      print("✅ 파이프라인 처리 완료")
      all_results.append(result["content"])  # 처리 결과의 content만 저장
    else:
      print(f"❌ 파이프라인 처리 실패: {result['error']}")

# 결과 파일 이름에 restaurant_id 포함
output_file = f"restaurant_{restaurant_id}_review_keywords.json"

# 결과를 JSON 문자열로 변환하여 파일에 저장
with open(output_file, "w", encoding="utf-8") as f:
  f.write(json.dumps(all_results, ensure_ascii=False, indent=2))

print(f"✅ 결과가 {output_file} 파일에 저장되었습니다.")