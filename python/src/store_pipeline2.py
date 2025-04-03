import os
import json
import re
from pipeline.pipeline import Pipeline
from db.database import PostgresImporter


def run_child_facilities_pipeline(restaurant_id):
  """
  홈 정보에서 아이 동반 시설 정보 추출 파이프라인을 실행하고 결과 파일명을 반환합니다.
  노키즈존 여부를 먼저 확인하고, 노키즈존인 경우 모든 시설 정보를 false로 설정합니다.
  """
  # 데이터 정제를 위한 파이프라인 생성
  pipeline = Pipeline()

  # 홈 정보 디렉토리
  review_dir = f"/user/hadoop/big_final_rest_home_information_json/restaurant_id={restaurant_id}"

  system_prompt = f"""
    항상 한국어로 대답 부탁드립니다.

    텍스트 데이터에서 식당의 아이 동반 시설 관련 정보를 분석하여 JSON 형식으로 변환하는 작업입니다.

    **매우 중요**: 먼저 "노키즈존", "노키즈", "노 키즈", "no kids", "No Kids" 등의 표현이 있는지 확인하세요.
    이런 표현이 있다면 해당 식당은 아이 동반이 불가능한 곳이므로, 모든 시설 정보를 false로 설정하고
    "no_kids_zone"을 true로 설정해주세요.

    노키즈존이 아닌 경우에만 다음 시설 정보를 확인하세요:

    1. diaper_changing_station (기저귀 교환대):
       - "기저귀", "교환대", "기저귀 교환", "기저귀 교체" 등의 단어가 있으면 true

    2. nursing_room (수유실):
       - "수유실", "수유 공간", "모유 수유", "수유 가능" 등의 단어가 있으면 true

    3. stroller_access (유모차 가능):
       - "유모차", "베이비카", "유모차 진입", "유모차 접근" 등의 단어가 있으면 true

    4. group_table (다인테이블):
       - "단체 이용 가능", "가족석", "대형 테이블", "다인석", "다인테이블", "키즈 테이블" 등의 단어가 있으면 true

    5. play_zone (놀이방):
       - "놀이방", "키즈존", "키즈 존", "놀이 공간", "놀이터", "아이들 놀이", "키즈룸", "키즈 존" 등의 단어가 있으면 true

    다음과 같은 JSON 형식으로 정보를 정제해주세요:
    {{
      "restaurant_id": "{restaurant_id}",
      "no_kids_zone": false,
      "diaper_changing_station": false,
      "nursing_room": false,
      "stroller_access": false,
      "group_table": false,
      "play_zone": false
    }}

    위 정보를 찾기 위해 모든 텍스트를 철저히 분석해주세요. 해당 시설이 있다는 정보가 명확히
    언급된 경우에만 true로 설정하고, 모호하거나 언급이 없는 경우 false로 설정해주세요.

    반드시 노키즈존 정보를 우선적으로 확인하고, 노키즈존일 경우 다른 모든 시설 정보는 무조건 false로 설정해주세요.

    반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
    다른 언어로 설명을 추가하지 마세요.
    """

  result = pipeline.process_directory(
      hdfs_directory=review_dir,
      system_prompt=system_prompt
  )

  # proceed 디렉토리 생성
  os.makedirs("proceed", exist_ok=True)
  result_filename = f"proceed/child_facilities_result{restaurant_id}.txt"

  if result["success"]:
    print(f"✅ 식당 {restaurant_id} 아이 동반 시설 정보 파이프라인 처리 완료")

    with open(result_filename, "w", encoding="utf-8") as f:
      f.write(result["content"])

    print(f"✅ 결과가 {result_filename} 파일에 저장되었습니다.")
    return result_filename
  else:
    print(f"❌ 식당 {restaurant_id} 아이 동반 시설 정보 파이프라인 처리 실패: {result['error']}")
    return None


def update_store_table(restaurant_id, result_filename):
  """
  레스토랑의 아이 동반 시설 정보를 Store 테이블에 업데이트합니다.
  노키즈존인 경우 모든 시설 정보를 false로 설정합니다.

  Args:
      restaurant_id (str): 레스토랑 ID
      result_filename (str): 결과 파일 경로

  Returns:
      bool: 업데이트 성공 여부
  """
  try:
    # 결과 파일이 없으면 처리 중단
    if not result_filename or not os.path.exists(result_filename):
      print(f"❌ 식당 {restaurant_id} 결과 파일이 존재하지 않습니다.")
      return False

    # 결과 파일 읽기
    with open(result_filename, "r", encoding="utf-8") as f:
      content = f.read()

    # JSON 객체 추출
    json_objects = re.findall(r'({[^{}]*(?:{[^{}]*})*[^{}]*})', content)
    if not json_objects:
      print(f"❌ 식당 {restaurant_id} 결과 파일에서 JSON 객체를 찾을 수 없습니다.")
      return False

    # 첫 번째 JSON 객체 파싱
    try:
      facilities_data = json.loads(json_objects[0])
    except json.JSONDecodeError:
      print(f"❌ 식당 {restaurant_id} 결과 파일의 JSON을 파싱할 수 없습니다.")
      return False

    # 노키즈존 확인
    is_no_kids_zone = facilities_data.get("no_kids_zone", False)

    # 업데이트할 필드 준비 (노키즈존인 경우 모든 시설 정보 false)
    if is_no_kids_zone:
      update_fields = {
        "diaper_changing_station": False,
        "nursing_room": False,
        "stroller_access": False,
        "group_table": False,
        "play_zone": False
      }
      print(f"⚠️ 식당 {restaurant_id}는 노키즈존으로 확인되어 모든 시설 정보를 false로 설정합니다.")
    else:
      update_fields = {
        "diaper_changing_station": facilities_data.get(
          "diaper_changing_station", False),
        "nursing_room": facilities_data.get("nursing_room", False),
        "stroller_access": facilities_data.get("stroller_access", False),
        "group_table": facilities_data.get("group_table", False),
        "play_zone": facilities_data.get("play_zone", False)
      }

    # PostgreSQL 연결 초기화
    db_importer = PostgresImporter()

    # Store 테이블 업데이트
    result = db_importer.update_store_child_facilities(restaurant_id,
                                                       update_fields)

    if result["success"]:
      print(f"✅ 식당 {restaurant_id} Store 테이블 업데이트 완료")
      if is_no_kids_zone:
        print(f"  - 노키즈존이므로 모든 시설 정보가 false로 설정되었습니다.")
      else:
        # 업데이트된 필드 출력
        true_fields = [key for key, value in update_fields.items() if value]
        if true_fields:
          print(f"  - 설정된 시설 정보: {', '.join(true_fields)}")
        else:
          print(f"  - 아이 동반 시설 정보가 없습니다.")
    else:
      print(
        f"❌ 식당 {restaurant_id} Store 테이블 업데이트 실패: {result.get('error', '알 수 없는 오류')}")

    # 연결 종료
    db_importer.close()

    return result["success"]

  except Exception as e:
    print(f"❌ 식당 {restaurant_id} Store 테이블 업데이트 중 오류 발생: {e}")
    return False


def main():
  """
  지정된 범위의 레스토랑에 대해 아이 동반 시설 정보 파이프라인을 실행하고
  결과를 Store 테이블에 업데이트합니다.
  """
  # 처리할 레스토랑 ID 범위
  start_id = 394
  end_id = 500

  # 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
  restaurant_ids = range(start_id, end_id + 1)  # 1부터 10까지
  # restaurant_ids = [2, 5, 10, 15, 20]  # 특정 ID만 처리하려면 이렇게 리스트로 지정

  # 처리 모드 설정
  PIPELINE_ONLY = False  # True: 파이프라인만 실행, False: 파이프라인 + DB 업데이트
  DB_UPDATE_ONLY = False  # True: DB 업데이트만 실행, False: 파이프라인 + DB 업데이트

  # ID 범위 문자열 생성 (로그 출력용)
  if isinstance(restaurant_ids, range):
    id_range_str = f"{start_id}~{end_id}"
  else:
    id_range_str = ", ".join(map(str, restaurant_ids))

  print(f"\n===== 레스토랑 ID {id_range_str} 아이 동반 시설 정보 처리 시작 =====")

  # 파이프라인 처리 및 DB 업데이트 단계
  successful_updates = 0
  no_kids_zone_count = 0
  for i, restaurant_id in enumerate(restaurant_ids, 1):
    restaurant_id_str = str(restaurant_id)
    print(
      f"\n===== [{i}/{len(list(restaurant_ids))}] 식당 {restaurant_id_str} 처리 시작 =====")

    # 파이프라인 처리
    result_filename = None
    if not DB_UPDATE_ONLY:
      # 홈 정보에서 아이 동반 시설 정보 추출
      result_filename = run_child_facilities_pipeline(restaurant_id_str)
    else:
      # DB_UPDATE_ONLY 모드일 때는 기존 결과 파일 사용
      result_filename = f"proceed/child_facilities_result{restaurant_id_str}.txt"
      if not os.path.exists(result_filename):
        print(f"❌ 식당 {restaurant_id_str} 결과 파일이 존재하지 않습니다. 건너뜁니다.")
        continue

    # DB 업데이트
    if not PIPELINE_ONLY:
      # Store 테이블 업데이트
      update_success = update_store_table(restaurant_id_str, result_filename)
      if update_success:
        successful_updates += 1
        # 노키즈존 여부 확인
        try:
          with open(result_filename, "r", encoding="utf-8") as f:
            content = f.read()
          json_objects = re.findall(r'({[^{}]*(?:{[^{}]*})*[^{}]*})', content)
          if json_objects:
            data = json.loads(json_objects[0])
            if data.get("no_kids_zone", False):
              no_kids_zone_count += 1
        except Exception:
          pass

    print(f"===== 식당 {restaurant_id_str} 처리 완료 =====\n")

  print(f"===== 레스토랑 {id_range_str} 아이 동반 시설 정보 처리 완료 =====")
  if not PIPELINE_ONLY:
    print(f"✅ 총 {successful_updates}/{len(list(restaurant_ids))} 레스토랑 업데이트 성공")
    print(f"✅ 노키즈존으로 확인된 레스토랑: {no_kids_zone_count}개\n")


if __name__ == "__main__":
  main()