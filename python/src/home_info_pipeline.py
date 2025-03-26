from pipeline.pipeline import Pipeline

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()

restaurant_id = "2"
review_dir = f"/user/hadoop/final_rest_home_information_json/restaurant_id={restaurant_id}"

system_prompt = f"""
다음 텍스트 데이터를 분석하여 다음과 같은 형식으로 정제해주세요:

{{
  "restaurant_id": "{restaurant_id}",
  "address": "주소",
  "public_transport": "대중교통 접근성",
  "phone": "전화번호",
  "operating_hours": "영업시간"
}}

단, 데이터에서 찾을 수 없는 정보는 빈 문자열("")로 표시해주세요.
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

