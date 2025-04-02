from pipeline.pipeline import Pipeline
import time
import os
import json
import re
from db.database import \
  PostgresImporter  # database.py 모듈에서 PostgresImporter 클래스 가져오기

# 처리할 레스토랑 ID 범위
start_id = 1
end_id = 1

# 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
restaurant_ids = range(start_id, end_id + 1)  # 1부터 10까지
# restaurant_ids = [2, 5, 10, 15, 20]  # 특정 ID만 처리하려면 이렇게 리스트로 지정

# 실행 모드 설정
do_extract = False  # True: HDFS에서 리뷰 추출 및 분석 실행
do_save = True  # True: 데이터베이스에 저장 실행

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()

# Ollama 처리를 위한 시스템 프롬프트 - 아이 관련 리뷰용
system_prompt_child = '''
  항상 한국어로 대답 부탁드립니다.
  다음 리뷰들을 분석하여 표준화된 JSON 형식으로 변환해주세요.

  ### 작업 내용:
  1. 각 리뷰를 분석하여 다음 형식의 JSON으로 변환하세요:
  {
    "content": "실제 리뷰 내용만 정제하여 포함",
    "positive_points": "아이와 관련된 긍정적인 요소에 대한 리뷰 원문의 실제 텍스트 (없으면 null)",
    "negative_points": "아이와 관련된 부정적인 요소에 대한 리뷰 원문의 실제 텍스트 (없으면 null)"
  }

  2. "content"에는 사용자 정보, 날짜, 팔로워 수, 버튼 텍스트 등의 메타데이터를 제외하고 실제 리뷰 내용만 정제하여 포함하세요. 예를 들어, "더보기", "팔로우", "리뷰 xxx" 같은 UI 요소나 "재료가 신선해요+3" 같은 태그 정보는 제외해야 합니다.

  3. "positive_points"는 리뷰에서 아이와 관련된 긍정적인 내용을 포함하는 실제 문장이나 구절을 추출합니다. 리뷰에서 직접 발췌한 원문 텍스트만 포함하고, 요약하거나 수정하지 마세요. 예를 들어:
     - 리뷰: "키즈메뉴가 있어서 아이와 함께 가기 좋았어요." → positive_points: "키즈메뉴가 있어서 아이와 함께 가기 좋았어요."
     - 리뷰: "음식이 맛있고 아이도 잘 먹었어요." → positive_points: "아이도 잘 먹었어요."

     매우 중요: 
     - 리뷰에 아이, 어린이, 유아, 아기, 키즈, 베이비 등의 명확한 언급이 없으면 반드시 null로 표시하세요.
     - 리뷰에 아이 관련 단어가 있더라도, 긍정적인 내용이 명시적으로 언급되지 않았다면 null로 표시하세요.
     - 요약이나 해석을 하지 말고 리뷰에서 직접 발췌한 원문 텍스트만 포함하세요.

  4. "negative_points"는 리뷰에서 아이와 관련된 부정적인 내용을 포함하는 실제 문장이나 구절을 추출합니다. 리뷰에서 직접 발췌한 원문 텍스트만 포함하고, 요약하거나 수정하지 마세요. 예를 들어:
     - 리뷰: "키즈메뉴가 없어서 아이가 먹을 게 없었어요." → negative_points: "키즈메뉴가 없어서 아이가 먹을 게 없었어요."
     - 리뷰: "밤에 가니까 술 먹는 사람들 많아서 좀 불편하니 아이 델고 거는 사람들 참고하세요." → negative_points: "밤에 가니까 술 먹는 사람들 많아서 좀 불편하니 아이 델고 거는 사람들 참고하세요."

     매우 중요: 
     - 리뷰에 아이, 어린이, 유아, 아기, 키즈, 베이비 등의 명확한 언급이 없으면 반드시 null로 표시하세요.
     - 리뷰에 아이 관련 단어가 있더라도, 부정적인 내용이 명시적으로 언급되지 않았다면 null로 표시하세요.
     - 요약이나 해석을 하지 말고 리뷰에서 직접 발췌한 원문 텍스트만 포함하세요.

  5. 각 JSON 객체는 서로 분리되어야 합니다. 대괄호([])로 묶지 마세요.
  6. 반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
  7. 항상 한국어로 설명을 해주세요.
'''

# LLM을 사용한 요약 생성을 위한 시스템 프롬프트
system_prompt_summary = '''
  다음은 가게에 대한 여러 리뷰에서 추출한 포인트들입니다:

  이 포인트들을 종합하여 간결하고 명확한 한 문장으로 요약해주세요.
  포인트에 실제로 포함된 내용만 요약하며, 없는 정보를 추가하지 마세요.

  만약 포인트에 아이/어린이에 관한 내용이 있을 경우에만 그 내용을 포함해서 요약하세요.
  아이/어린이에 관한 언급이 없다면, 요약에 아이/어린이를 추가하지 마세요.
  
  반드시 순수한 텍스트만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
  한국어로 설명해주시고, 중국어와 같은 다른 언어로 설명을 추가하지 마세요.
'''


# 파일에서 JSON 객체 파싱하는 함수
def parse_json_objects(file_content):
  # 중괄호로 둘러싸인 JSON 객체 패턴
  pattern = r'(\{[^{}]*\})'

  # 모든 JSON 객체 찾기
  json_objects = re.findall(pattern, file_content)

  # 각 객체 파싱
  reviews = []
  for obj_str in json_objects:
    try:
      review = json.loads(obj_str)
      # source 필드가 없는 경우 기본값 'child' 설정
      if 'source' not in review:
        review['source'] = 'child'
      reviews.append(review)
    except json.JSONDecodeError:
      print(f"잘못된 JSON 형식: {obj_str}")

  return reviews


# 아이 관련 리뷰 처리 함수
def process_child_reviews(restaurant_id):
  """
  아이 관련 리뷰 처리

  Args:
      restaurant_id (str): 레스토랑 ID

  Returns:
      dict: 처리 결과
  """
  # 아이 관련 리뷰 디렉토리
  child_review_dir = f"/user/hadoop/big_final_child_related_review_json/restaurant_id={restaurant_id}"

  print(f"아이 관련 리뷰 - 디렉토리 처리 중: {child_review_dir}")

  # 해당 디렉토리 리뷰 처리
  try:
    result = pipeline.process_directory(
        hdfs_directory=child_review_dir,
        system_prompt=system_prompt_child
    )
    return result
  except Exception as e:
    print(f"❌ 디렉토리 처리 중 오류 발생: {str(e)}")
    return {"success": False, "error": str(e), "content": ""}


# LLM을 사용한 요약 생성 함수
def generate_summary_with_llm(points_list):
  """
  LLM을 사용하여 리뷰 포인트들의 요약 생성

  Args:
      points_list (list): 요약할 포인트 목록

  Returns:
      str: 생성된 요약
  """
  if not points_list:
    return None

  # 포인트 목록을 문자열로 변환
  points_text = "\n".join([f"- {point}" for point in points_list])

  # 프롬프트 생성
  prompt = system_prompt_summary.format(points=points_text)

  print(f"  LLM 요약 생성 중 (포인트 {len(points_list)}개)...")

  try:
    # Ollama 클라이언트를 직접 사용하여 요약 생성
    result = pipeline.ollama_client.chat(
        user_message=points_text,
        system_prompt=system_prompt_summary
    )

    summary = result["content"].strip()
    print(f"  ✅ 요약 생성 완료: {summary}")
    return summary

  except Exception as e:
    print(f"  ❌ LLM 요약 생성 중 오류 발생: {e}")
    return points_list[0]


# 전체 레스토랑 처리 시작
print(f"=== 총 {len(restaurant_ids)}개 레스토랑의 아이 관련 리뷰 처리 시작 ===")
print(f"추출 모드: {'활성화' if do_extract else '비활성화'}")
print(f"저장 모드: {'활성화' if do_save else '비활성화'}")
total_start_time = time.time()

for idx, restaurant_id in enumerate(restaurant_ids, 1):
  restaurant_id = str(restaurant_id)  # ID를 문자열로 변환
  print(f"\n[{idx}/{len(restaurant_ids)}] 레스토랑 ID {restaurant_id} 처리 시작")
  start_time = time.time()

  # 결과 파일 경로
  raw_output_file = f"sentiment/restaurant_{restaurant_id}_raw_review_analysis.txt"
  refined_output_file = f"sentiment/restaurant_{restaurant_id}_refined_review_analysis.json"
  summary_output_file = f"sentiment/restaurant_{restaurant_id}_summary_analysis.json"

  # 1단계: HDFS에서 리뷰 데이터 추출하여 파일로 저장
  if do_extract:
    try:
      print(f"1단계: HDFS에서 아이 관련 리뷰 데이터 가져와 분석 중...")
      child_result = process_child_reviews(restaurant_id)

      # 결과 저장
      if child_result["success"]:
        with open(raw_output_file, "w", encoding="utf-8") as f:
          f.write(child_result["content"])
        print(f"✅ 아이 관련 리뷰 원본 분석 결과가 {raw_output_file} 파일에 저장되었습니다.")
      else:
        print(
          f"❌ 아이 관련 리뷰 파이프라인 처리 실패: {child_result.get('error', '알 수 없는 오류')}")
        continue

    except Exception as e:
      print(f"❌ 레스토랑 ID {restaurant_id} 처리 중 오류 발생: {str(e)}")
      continue

  # 2단계: 리뷰 데이터 정제 및 분류
  if do_save:
    try:
      print(f"2단계: 리뷰 데이터 정제 및 분류 중...")

      # 원본 파일에서 리뷰 로드
      with open(raw_output_file, "r", encoding="utf-8") as f:
        content = f.read()
      reviews = parse_json_objects(content)

      # 긍정 및 부정 리뷰 분류
      positive_reviews = [
        {"content": r["content"], "point": r["positive_points"]}
        for r in reviews if
        r.get("positive_points") and r["positive_points"] != "null"
      ]
      negative_reviews = [
        {"content": r["content"], "point": r["negative_points"]}
        for r in reviews if
        r.get("negative_points") and r["negative_points"] != "null"
      ]

      # 분류된 리뷰를 JSON 파일로 저장
      refined_data = {
        "positive_reviews": positive_reviews,
        "negative_reviews": negative_reviews
      }

      with open(refined_output_file, "w", encoding="utf-8") as f:
        json.dump(refined_data, f, ensure_ascii=False, indent=2)

      print(f"✅ 정제된 리뷰 데이터가 {refined_output_file}에 저장되었습니다.")
      print(f"  - 긍정 리뷰: {len(positive_reviews)}개")
      print(f"  - 부정 리뷰: {len(negative_reviews)}개")

    except Exception as e:
      print(f"❌ 리뷰 정제 중 오류 발생: {str(e)}")
      continue

  # 3단계: LLM을 사용하여 요약 생성
  if do_save:
    try:
      print("3단계: LLM을 사용하여 요약 생성 중...")

      # 정제된 데이터 로드
      with open(refined_output_file, "r", encoding="utf-8") as f:
        refined_data = json.load(f)

      # 긍정/부정 포인트 추출
      positive_points = [review["point"] for review in
                         refined_data["positive_reviews"]]
      negative_points = [review["point"] for review in
                         refined_data["negative_reviews"]]

      # LLM을 사용하여 요약 생성
      positive_summary = generate_summary_with_llm(
        positive_points) if positive_points else None
      negative_summary = generate_summary_with_llm(
        negative_points) if negative_points else None

      # 요약 결과 저장
      summary_data = {
        "positive_summary": positive_summary,
        "negative_summary": negative_summary
      }

      with open(summary_output_file, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, ensure_ascii=False, indent=2)

      print(f"✅ 요약 결과가 {summary_output_file}에 저장되었습니다.")

    except Exception as e:
      print(f"❌ LLM 요약 생성 중 오류 발생: {str(e)}")
      continue

  # 4단계: 데이터베이스에 저장
  if do_save:
    try:
      print("4단계: 데이터베이스에 저장 중...")

      # 요약 파일 로드
      with open(summary_output_file, "r", encoding="utf-8") as f:
        summary_data = json.load(f)

      # point를 제외하고 content만 포함하도록 리뷰 데이터 수정
      positive_reviews_without_point = [{"content": review["content"]} for
                                        review in
                                        refined_data["positive_reviews"]]
      negative_reviews_without_point = [{"content": review["content"]} for
                                        review in
                                        refined_data["negative_reviews"]]

      # 데이터베이스에 저장
      db_importer = PostgresImporter()

      positive_json = json.dumps({
        "summary": summary_data["positive_summary"],
        "reviews": positive_reviews_without_point
      }, ensure_ascii=False) if summary_data["positive_summary"] else None

      negative_json = json.dumps({
        "summary": summary_data["negative_summary"],
        "reviews": negative_reviews_without_point
      }, ensure_ascii=False) if summary_data["negative_summary"] else None

      db_result = db_importer.import_sentiment_analysis(
          positive_json,
          negative_json,
          restaurant_id
      )

      # 연결 종료
      db_importer.close()

      if db_result["success"]:
        print(f"✅ 레스토랑 ID {restaurant_id}의 리뷰 감정 분석 결과가 데이터베이스에 저장되었습니다.")
      else:
        print(f"❌ 감정 분석 결과 저장 실패: {db_result.get('error', '알 수 없는 오류')}")

    except Exception as e:
      print(f"❌ 데이터베이스 저장 중 오류 발생: {str(e)}")

  # 처리 시간 출력
  end_time = time.time()
  elapsed_time = end_time - start_time
  print(f"레스토랑 ID {restaurant_id} 처리 완료 (소요 시간: {elapsed_time:.2f}초)")

# 전체 처리 완료
total_elapsed_time = time.time() - total_start_time
print(f"\n=== 전체 처리 완료 (총 소요 시간: {total_elapsed_time:.2f}초) ===")