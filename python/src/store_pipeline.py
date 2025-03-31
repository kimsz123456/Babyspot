import os
import json
import shutil
import re
from pipeline.pipeline import Pipeline
from db.database import PostgresImporter
from converter.address_converter import naver_geocode


def run_home_info_pipeline(restaurant_id):
  """
  home_info_pipeline을 실행하고 결과 파일명을 반환합니다.
  """
  # 데이터 정제를 위한 파이프라인 생성
  pipeline = Pipeline()

  review_dir = f"/user/hadoop/big_final_rest_home_information_json/restaurant_id={restaurant_id}"

  system_prompt = f"""
  항상 한국어로 대답 부탁드립니다.

  텍스트 데이터에서 식당 정보를 분석하여 정제된 JSON 형식으로 변환하는 작업입니다.

  주소 파싱 규칙:
  1. "주소" 값에서 도로명 주소만 추출 (예: "서울 중랑구 용마산로 707 1층")
  2. "주소" 값에서 역 정보와 출구 정보만 대중교통 편의성으로 추출
  3. 역 이름 앞에 붙은 다음 노선 정보는 모두 제거해야 함:
     - 숫자 (예: "숫자+역이름" → "역이름", "2강남역" → "강남역", "26신당역" → "신당역")
     - "경춘" (예: "경춘신내역" → "신내역", "6경춘신내역" → "신내역")
     - "수인분당" (예: "수인분당왕십리역" → "왕십리역")
     - "신분당" (예: "신분당강남역" → "강남역")
     - "공항" (예: "공항홍대입구역" → "홍대입구역")
     - "우이신설" (예: "우이신설북한산우이역" → "북한산우이역")
     - "신림" (예: "신림서울대입구역" → "서울대입구역")
  4. 거리 정보에서 "미터"가 중복으로 표기되는 경우 하나만 남깁니다.
    - 예: "756m 미터" → "756m"
  5. "찾아가는길" 정보는 무시

  영업시간 파싱 규칙:
  1. "영업시간" 값에서 요일(월, 화, 수, 목, 금, 토, 일) 뒤에 나오는 시간이 해당 요일의 영업시간
     - 예: "목 11:30 - 22:00" → "목": "11:30-22:00"
     - 예: "수 11:00 - 21:30" → "수": "11:00-21:30"
  2. 영업시간에 공백이 있으면 제거 (예: "11:00 - 22:00" → "11:00-22:00")
  3. 브레이크타임이 명시되어 있으면 추출 (예: "14:30 - 17:00 브레이크타임" → "14:30-17:00")
  4. 24시간 영업은 "00:00-24:00"으로 표시
  5. 정기휴무일은 해당 요일에 "휴무"로 표시

  다음과 같은 JSON 형식으로 정보를 정제해주세요:
  {{
    "restaurant_id": "{restaurant_id}",
    "address": "매장 도로명 주소",
    "transportation_convenience": "교통편의성",
    "contact_number": "전화번호",
    "business_hours": {{
      "월": "영업시간 (예: 11:30-22:00)",
      "화": "영업시간",
      "수": "영업시간",
      "목": "영업시간",
      "금": "영업시간",
      "토": "영업시간",
      "일": "영업시간 또는 휴무",
      "브레이크타임": "브레이크타임 있으면 시간, 없으면 빈 문자열",
      "특이사항": "라스트오더 정보나 기타 특이사항"
    }}
  }}

  restaurant_id를 제외하고, 데이터에서 찾을 수 없는 정보는 빈 문자열("")로 표시해주세요.
  반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
  다른 언어로 설명을 추가하지 마세요.
  """

  result = pipeline.process_directory(
      hdfs_directory=review_dir,
      system_prompt=system_prompt
  )

  # proceed 디렉토리 생성
  os.makedirs("proceed", exist_ok=True)
  result_filename = f"proceed/home_result{restaurant_id}.txt"

  if result["success"]:
    print(f"✅ 식당 {restaurant_id} 홈 정보 파이프라인 처리 완료")

    with open(result_filename, "w", encoding="utf-8") as f:
      f.write(result["content"])

    print(f"✅ 결과가 {result_filename} 파일에 저장되었습니다.")
    return result_filename
  else:
    print(f"❌ 식당 {restaurant_id} 홈 정보 파이프라인 처리 실패: {result['error']}")
    return None


def run_rest_info_pipeline(restaurant_id):
  """
  rest_info_pipeline을 실행하고 결과 파일명을 반환합니다.
  """
  # 데이터 정제를 위한 파이프라인 생성
  pipeline = Pipeline()

  review_dir = f"/user/hadoop/big_final_rest_info_json/restaurant_id={restaurant_id}"

  system_prompt = f"""
  항상 한국어로 대답 부탁드립니다.

  텍스트 데이터에서 식당 정보를 분석하여 아이 동반 관련 정보를 중심으로 정제된 JSON 형식으로 변환하는 작업입니다.

  "kidz_menu" 파싱 규칙:
  - 입력된 "kidz_menu" 값을 그대로 쉼표(,)로 분리하여 배열 요소로 사용
  - 예: "누룽지 등심,갈비" → ["누룽지 등심", "갈비"]
  - 공백이나 다른 문자는 모두 그대로 유지

  "kidz_item" 파싱 규칙:
  - "유아의자", "의자", "체어" 등의 단어가 포함되어 있으면 baby_chair를 true로 설정
  - "유아식기", "수저", "포크" 등의 단어가 포함되어 있으면 baby_tableware를 true로 설정

  다음과 같은 JSON 형식으로 정보를 정제해주세요:
  {{
    "restaurant_id": "{restaurant_id}",
    "title": "식당 이름", // store_name
    "parking": false, 
    "baby_chair": false, // "kidz_item"에서 판단할 수 있는 유아의자(의자,체어) 유무
    "baby_tableware": false, // "kidz_item"에서 판단할 수 있는 유아식기(수저,포크) 유무
    "kids_menu": [] // "kidz_menu" 값을 그대로 배열로 변환
  }}

  restaurant_id를 제외하고, 데이터에서 찾을 수 없는 정보는 텍스트는 빈 문자열("")로, 데이터에서 찾을 수 없는 불리언은 false로 표시해주세요.
  반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
  다른 언어로 설명을 추가하지 마세요.
  """

  result = pipeline.process_directory(
      hdfs_directory=review_dir,
      system_prompt=system_prompt
  )

  # proceed 디렉토리 생성
  os.makedirs("proceed", exist_ok=True)
  result_filename = f"proceed/rest_result{restaurant_id}.txt"

  if result["success"]:
    print(f"✅ 식당 {restaurant_id} 레스토랑 정보 파이프라인 처리 완료")

    with open(result_filename, "w", encoding="utf-8") as f:
      f.write(result["content"])

    print(f"✅ 결과가 {result_filename} 파일에 저장되었습니다.")
    return result_filename
  else:
    print(f"❌ 식당 {restaurant_id} 레스토랑 정보 파이프라인 처리 실패: {result['error']}")
    return None


def merge_restaurant_data(start_id, end_id):
  """
  지정된 범위의 레스토랑에 대해 home_result와 rest_result 파일을 병합합니다.

  Args:
      start_id (int): 시작 레스토랑 ID
      end_id (int): 종료 레스토랑 ID

  Returns:
      list: 병합된 JSON 파일 경로 목록
  """
  merged_file_paths = []

  for restaurant_id in range(start_id, end_id + 1):
    restaurant_id_str = str(restaurant_id)
    home_result_path = f"proceed/home_result{restaurant_id_str}.txt"
    rest_result_path = f"proceed/rest_result{restaurant_id_str}.txt"

    # 두 파일이 모두 존재하는지 확인
    if not (
        os.path.exists(home_result_path) and os.path.exists(rest_result_path)):
      print(f"❌ 식당 {restaurant_id_str} 파일이 존재하지 않습니다. 병합을 건너뜁니다.")
      continue

    try:
      # home_result 파일 읽기
      with open(home_result_path, "r", encoding="utf-8") as f:
        home_data = json.loads(f.read())

      # rest_result 파일 읽기
      with open(rest_result_path, "r", encoding="utf-8") as f:
        rest_content = f.read()

      # rest_result에 여러 JSON 객체가 있을 수 있으므로 분리하여 처리
      # 각 JSON 객체 추출
      json_objects = re.findall(r'({[^{}]*(?:{[^{}]*})*[^{}]*})', rest_content)

      rest_data_list = []
      for json_obj in json_objects:
        try:
          rest_data = json.loads(json_obj)
          rest_data_list.append(rest_data)
        except json.JSONDecodeError:
          print(
            f"⚠️ 식당 {restaurant_id_str} rest_result 파일의 일부 JSON을 파싱할 수 없습니다.")

      # 병합할 데이터 생성
      merged_data = {}

      # home_data의 모든 필드 복사
      merged_data.update(home_data)
      merged_data["restaurant_id"] = restaurant_id_str
      # rest_data_list에서 모든 유효한 정보 추출
      for rest_data in rest_data_list:
        for key, value in rest_data.items():
          if key != "restaurant_id" and value and value != "":
            # 빈 값이 아닌 경우에만 저장 (빈 값은 ""나 false일 수 있음)
            if key not in merged_data or merged_data[key] == "":
              merged_data[key] = value

      # 병합된 데이터를 파일로 저장
      merged_file_path = f"restaurants/restaurant_{restaurant_id_str}.json"
      with open(merged_file_path, "w", encoding="utf-8") as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)

      print(f"✅ 식당 {restaurant_id_str} 데이터 병합 완료: {merged_file_path}")
      merged_file_paths.append(merged_file_path)

    except Exception as e:
      print(f"❌ 식당 {restaurant_id_str} 데이터 병합 중 오류 발생: {e}")

  return merged_file_paths

def add_location_to_restaurant_json(json_file_path):
    """
    레스토랑 JSON 파일에 위치 정보를 추가하고 저장합니다.
    """
    try:
      # JSON 파일 읽기
      with open(json_file_path, 'r', encoding='utf-8') as f:
        restaurant_data = json.loads(f.read())

      # 주소 확인
      address = restaurant_data.get("address")
      if not address:
        print(f"❌ {json_file_path} 파일에 주소 정보가 없습니다.")
        return None

      # 지오코딩 수행 - 분리된 모듈 사용
      location_wkt = naver_geocode(address)
      if not location_wkt:
        print(f"❌ {address} 주소에 대한 위치 정보를 가져올 수 없습니다.")
        return None

      # 위치 정보 추가
      restaurant_data["location"] = location_wkt

      # 업데이트된 JSON 저장
      with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(restaurant_data, f, ensure_ascii=False, indent=2)

      print(f"✅ 위치 정보가 추가된 데이터를 {json_file_path} 파일에 저장했습니다.")
      print(f"   주소: {address}")
      print(f"   위치: {location_wkt}")
      return restaurant_data

    except Exception as e:
      print(f"❌ 위치 정보 추가 중 오류 발생: {e}")
      return None


def save_to_database(json_file_paths):
  """
  JSON 파일을 PostgreSQL 데이터베이스에 저장합니다.

  Args:
      json_file_paths (list): 저장할 JSON 파일 경로 목록
  """
  # PostgreSQL 연결 초기화
  db_importer = PostgresImporter()

  try:
    # 각 JSON 파일을 데이터베이스에 저장
    for json_file_path in json_file_paths:
      try:
        # JSON 파일 읽기
        with open(json_file_path, 'r', encoding='utf-8') as f:
          data = json.loads(f.read())

        # PostgreSQL에 데이터 저장
        db_importer.import_to_postgres(data)
      except Exception as e:
        print(f"❌ {json_file_path} 파일 저장 중 오류 발생: {e}")
  except Exception as e:
    print(f"❌ 데이터베이스 저장 중 오류 발생: {e}")
  finally:
    db_importer.close()


def main():
  """
  지정된 범위의 레스토랑에 대해 파이프라인을 실행하고
  결과를 병합한 후, 사용자가 원하는 시점에 PostgreSQL 데이터베이스에 저장합니다.
  """
  # 처리할 레스토랑 ID 범위
  start_id = 10
  end_id = 10

  # 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
  restaurant_ids = range(start_id, end_id + 1)  # 1부터 10까지
  # restaurant_ids = [2, 5, 10, 15, 20]  # 특정 ID만 처리하려면 이렇게 리스트로 지정

  # 처리 모드 설정
  PIPELINE_ONLY = True  # True: 파이프라인만 실행, False: 파이프라인 + 병합
  MERGE_ONLY = False  # True: 병합만 실행, False: 파이프라인 + 병합

  # ID 범위 문자열 생성 (로그 출력용)
  if isinstance(restaurant_ids, range):
    id_range_str = f"{start_id}~{end_id}"
  else:
    id_range_str = ", ".join(map(str, restaurant_ids))

  print(f"\n===== 레스토랑 ID {id_range_str} 처리 시작 =====")

  # 파이프라인 처리 단계
  if not MERGE_ONLY:
    for i, restaurant_id in enumerate(restaurant_ids, 1):
      print(
        f"\n===== [{i}/{len(list(restaurant_ids))}] 식당 {restaurant_id} 처리 시작 =====")

      # 홈 정보 파이프라인 실행
      home_result = run_home_info_pipeline(str(restaurant_id))

      # 레스토랑 정보 파이프라인 실행
      rest_result = run_rest_info_pipeline(str(restaurant_id))

      print(f"===== 식당 {restaurant_id} 처리 완료 =====\n")

  # 데이터 병합 단계
  json_file_paths = []
  if not PIPELINE_ONLY:
    print(f"\n===== 레스토랑 {id_range_str} 데이터 병합 시작 =====")

    # 각 ID에 대해 데이터 병합 처리
    for restaurant_id in restaurant_ids:
      paths = merge_restaurant_data(restaurant_id, restaurant_id)
      json_file_paths.extend(paths)

    print(f"===== 레스토랑 {id_range_str} 데이터 병합 완료 =====\n")

  # 위치 정보 추가 단계
  if json_file_paths:
    print(f"\n===== 위치 정보 추가 시작 =====")
    for i, json_file_path in enumerate(json_file_paths):
      updated_data = add_location_to_restaurant_json(json_file_path)
      if updated_data:
        print(f"✅ {i + 1}/{len(json_file_paths)} 식당 위치 정보 추가 완료")
      else:
        print(f"❌ {i + 1}/{len(json_file_paths)} 식당 위치 정보 추가 실패")
    print(f"===== 위치 정보 추가 완료 =====\n")

  # 데이터베이스 저장 단계
  if json_file_paths:
    print(f"\n===== 데이터베이스 저장 시작 =====")
    save_to_database(json_file_paths)
    print(f"===== 데이터베이스 저장 완료 =====\n")


if __name__ == "__main__":
  main()