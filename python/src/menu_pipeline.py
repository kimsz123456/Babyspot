import os
import json
import re
from pipeline.pipeline import Pipeline
from db.database import PostgresImporter


def run_menu_detail_pipeline(restaurant_id):
  """
  menu_detail_pipeline을 실행하고 결과 파일명을 반환합니다.
  """
  # 데이터 정제를 위한 파이프라인 생성
  pipeline = Pipeline()

  review_dir = f"/user/hadoop/final_rest_menu_detail_information_json/restaurant_id={restaurant_id}"

  system_prompt = f"""
    항상 한국어로 대답 부탁드립니다.
    
    restaurant_id는 수정히지 말고, 데이터에서 찾을 수 없는 정보는 빈 문자열("")로 표시해주세요.
    반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
    다른 언어로 설명을 추가하지 마세요.
    다음 텍스트 데이터를 분석하여 다음과 같은 형식으로 정제해주세요:

    {{
      "restaurant_id": "{restaurant_id}",
      "name": "메뉴 이름",
      "price": "8000" // 가격은 Integer형태로 ( 1,000원 -> 1000 ) 없으면 null
    }}

    """

  result = pipeline.process_directory(
      hdfs_directory=review_dir,
      system_prompt=system_prompt
  )

  # proceed 디렉토리 생성
  os.makedirs("proceed", exist_ok=True)
  result_filename = f"proceed/menu_detail_{restaurant_id}.txt"

  if result["success"]:
    print(f"✅ 식당 {restaurant_id} 메뉴 상세 정보 파이프라인 처리 완료")

    with open(result_filename, "w", encoding="utf-8") as f:
      f.write(result["content"])

    print(f"✅ 결과가 {result_filename} 파일에 저장되었습니다.")
    return result_filename
  else:
    print(f"❌ 식당 {restaurant_id} 메뉴 상세 정보 파이프라인 처리 실패: {result['error']}")
    return None


def parse_menu_data(restaurant_id):
  """
  menu_detail 파일을 파싱하여 JSON 객체 목록을 반환합니다.

  Args:
      restaurant_id (str): 레스토랑 ID

  Returns:
      list: 파싱된 메뉴 데이터 객체 리스트
  """
  menu_detail_path = f"proceed/menu_detail_{restaurant_id}.txt"
  menu_data_list = []

  if not os.path.exists(menu_detail_path):
    print(f"❌ 식당 {restaurant_id} 메뉴 상세 파일이 존재하지 않습니다.")
    return menu_data_list

  try:
    # 파일 내용 읽기
    with open(menu_detail_path, "r", encoding="utf-8") as f:
      content = f.read()

    # JSON 객체가 여러 개 있을 경우를 대비한 정규식 패턴
    json_objects = re.findall(r'({[^{}]*(?:{[^{}]*})*[^{}]*})', content)

    for json_obj in json_objects:
      try:
        menu_data = json.loads(json_obj)
        # restaurant_id가 있는지 확인하고 없으면 추가
        if "restaurant_id" not in menu_data:
          menu_data["restaurant_id"] = restaurant_id
        menu_data_list.append(menu_data)
      except json.JSONDecodeError as e:
        print(f"⚠️ 식당 {restaurant_id} 메뉴 데이터 일부 JSON을 파싱할 수 없습니다: {e}")

    return menu_data_list
  except Exception as e:
    print(f"❌ 식당 {restaurant_id} 메뉴 데이터 파싱 중 오류 발생: {e}")
    return menu_data_list


def save_menu_to_database(menu_data_list):
  """
  메뉴 데이터를 PostgreSQL의 store_menu 테이블에 저장합니다.

  Args:
      menu_data_list (list): 저장할 메뉴 데이터 목록
  Returns:
      int: 성공적으로 저장된 메뉴 항목 수
  """
  # PostgreSQL 연결 초기화
  db_importer = PostgresImporter()

  try:
    saved_count = 0
    # 메뉴 데이터를 store_menu 테이블에 저장
    for menu_item in menu_data_list:
      try:
        # 데이터베이스에 저장
        db_importer.import_to_store_menu(menu_item)
        print(
          f"✅ 메뉴 '{menu_item.get('name', '이름 없음')}' 저장 완료 (레스토랑 ID: {menu_item.get('restaurant_id', '알 수 없음')})")
        saved_count += 1
      except Exception as e:
        print(f"❌ 메뉴 데이터 저장 중 오류 발생: {e}")
        print(f"   데이터: {menu_item}")
    return saved_count
  except Exception as e:
    print(f"❌ 데이터베이스 연결 중 오류 발생: {e}")
    return 0
  finally:
    db_importer.close()


def process_restaurant_menu(restaurant_id):
  """
  하나의 레스토랑에 대해 메뉴 파이프라인을 처리하고 데이터베이스에 저장합니다.

  Args:
      restaurant_id (str): 레스토랑 ID

  Returns:
      bool: 처리 성공 여부
  """
  # 1. 메뉴 상세 파이프라인 실행
  menu_detail_file = run_menu_detail_pipeline(restaurant_id)
  if not menu_detail_file:
    return False

  # 2. 메뉴 데이터 파싱
  menu_data_list = parse_menu_data(restaurant_id)
  if not menu_data_list:
    print(f"⚠️ 식당 {restaurant_id} 메뉴 데이터가 없습니다.")
    return False

  # 3. 메뉴 데이터 저장
  saved_count = save_menu_to_database(menu_data_list)

  return saved_count > 0


def main():
  """
  지정된 범위의 레스토랑에 대해 메뉴 파이프라인을 실행하고
  결과를 PostgreSQL의 store_menu 테이블에 저장합니다.
  """
  # 설정
  START_ID = 3  # 시작 레스토랑 ID
  END_ID = 3  # 종료 레스토랑 ID

  # 유효한 범위인지 확인
  if START_ID < 1 or START_ID > END_ID:
    print("❌ 레스토랑 ID 범위가 잘못되었습니다.")
    return

  print(f"\n===== 레스토랑 ID {START_ID}~{END_ID} 메뉴 처리 시작 =====")

  # 레스토랑별 처리
  successful_count = 0
  for restaurant_id in range(START_ID, END_ID + 1):
    print(f"\n===== 식당 {restaurant_id} 메뉴 처리 시작 =====")
    success = process_restaurant_menu(str(restaurant_id))
    if success:
      successful_count += 1
    print(f"===== 식당 {restaurant_id} 메뉴 처리 완료 =====\n")

  print(f"\n===== 메뉴 처리 결과 요약 =====")
  print(f"처리 대상 레스토랑: {END_ID - START_ID + 1}개")
  print(f"성공: {successful_count}개")
  print(f"실패: {END_ID - START_ID + 1 - successful_count}개")
  print(f"===== 메뉴 파이프라인 완료 =====\n")


if __name__ == "__main__":
  main()