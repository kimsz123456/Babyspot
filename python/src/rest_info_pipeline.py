from pipeline.pipeline import Pipeline

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()

restaurant_id = "2"
review_dir = f"/user/hadoop/final_rest_info_json/restaurant_id={restaurant_id}"

system_prompt = f"""
항상 한국어로 대답 부탁드립니다.
다음 텍스트 데이터를 분석하여 다음과 같은 형식으로 정제해주세요:

{{
  "restaurant_id": "{restaurant_id}",
  "name": "",
  "has_parking": false,
  "has_kids_menu": false,
  "menus": [
    {{
      "name": "",
      "price": 0,
      "image_url": ""
    }}
  ]
}}

메뉴 정보는 데이터에서 찾을 수 있는 모든 메뉴를 포함해주세요.
단, 데이터에서 찾을 수 없는 정보는 텍스트는 빈 문자열("")로, 숫자는 0으로, 불리언은 false로 표시해주세요.
price는 숫자 형식으로 변환해주세요 (예: "8,000원" → 8000).
"""

result = pipeline.process_directory(
    hdfs_directory=review_dir,
    system_prompt=system_prompt
)

if result["success"]:
    print("✅ 파이프라인 처리 완료")

    with open("result_output.txt", "w", encoding="utf-8") as f:
        f.write(result["content"])

    print(f"✅ 결과가 result_output.txt 파일에 저장되었습니다.")

else:
    print(f"❌ 파이프라인 처리 실패: {result['error']}")

