import os
import json
import psycopg2
from dotenv import load_dotenv


class PostgresImporter:
  def __init__(self):
    """
    PostgreSQL 연결 초기화
    """
    # .env 파일에서 PostgreSQL 연결 정보 불러오기
    load_dotenv()

    # PostgreSQL 연결 설정
    postgres_url = os.getenv("POSTGRES_URL")
    # JDBC URL에서 호스트와 데이터베이스 추출
    # jdbc:postgresql://43.201.34.93:5432/babyspot 형식에서 필요한 정보 추출
    host = postgres_url.split("//")[1].split(":")[0]
    database = postgres_url.split("/")[-1]

    self.conn = psycopg2.connect(
        host=host,
        database=database,
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD")
    )
    self.cursor = self.conn.cursor()

  def import_to_postgres(self, restaurant_data):
    """
    JSON 데이터를 store 테이블에 저장합니다.

    Args:
        restaurant_data (dict): 저장할 레스토랑 데이터
    """
    try:
      # 단일 레스토랑을 리스트로 변환 (원래 함수는 리스트를 예상함)
      if not isinstance(restaurant_data, list):
        restaurants = [restaurant_data]
      else:
        restaurants = restaurant_data

      # 각 레스토랑 데이터를 처리
      for restaurant in restaurants:
        id = restaurant.get("restaurant_id")
        title = restaurant.get("title", "")
        parking = restaurant.get("parking", False)
        baby_chair = restaurant.get("baby_chair", False)
        baby_tableware = restaurant.get("baby_tableware", False)
        # kids_menu 가져오기 - 이미 리스트 형태로 되어 있음
        kids_menu_data = restaurant.get("kids_menu", [])
        # JSON 문자열로 변환 (PostgreSQL에 정확히 저장하기 위함)
        kids_menu = json.dumps(kids_menu_data)

        address = restaurant.get("address", "")
        transportation_convenience = restaurant.get(
            "transportation_convenience", "")
        contact_number = restaurant.get("contact_number", "")
        # business_hours 가져오기
        business_hours = restaurant.get("business_hours", {})

        # 항상 JSON 문자열로 변환
        business_hours_json = json.dumps(business_hours)

        # 새로운 필드는 기본값으로 설정
        category = "음식점"  # 기본 카테고리 설정
        rating = 0.0  # 기본 평점
        review_count = 0  # 기본 리뷰 수

        # ok_zone 필드 true로 설정
        ok_zone = True

        # 위치 정보 (PostGIS 호환 형식) 추가
        location = restaurant.get("location", None)

        # 위치 정보가 있는 경우와 없는 경우를 처리
        if location:
          # store 테이블에 데이터 저장 - location 필드 추가
          self.cursor.execute("""
                      INSERT INTO store (
                          id, address, transportation_convenience, contact_number, business_hour,
                          title, baby_chair, baby_tableware, category, kids_menu, parking,
                          rating, review_count, ok_zone, location
                      ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, ST_GeomFromText(%s, 4326))
                      ON CONFLICT (id) 
                      DO UPDATE SET
                          address = EXCLUDED.address,
                          transportation_convenience = EXCLUDED.transportation_convenience,
                          contact_number = EXCLUDED.contact_number,
                          business_hour = EXCLUDED.business_hour,
                          title = EXCLUDED.title,
                          baby_chair = EXCLUDED.baby_chair,
                          baby_tableware = EXCLUDED.baby_tableware,
                          category = EXCLUDED.category,
                          kids_menu = EXCLUDED.kids_menu,
                          parking = EXCLUDED.parking,
                          ok_zone = EXCLUDED.ok_zone,
                          location = EXCLUDED.location;
                  """, (
            id, address, transportation_convenience, contact_number,
            business_hours_json,
            title, baby_chair, baby_tableware, category, kids_menu, parking,
            rating, review_count, ok_zone, location
          ))

      self.conn.commit()
      print(f"✅ {len(restaurants)}개 레스토랑 데이터가 store 테이블에 성공적으로 저장되었습니다.")

    except Exception as e:
      self.conn.rollback()
      print(f"❌ store 테이블 저장 중 오류 발생: {e}")

  def import_to_store_menu(self, menu_data):
    """
    메뉴 데이터를 store_menu 테이블에 저장합니다.

    Args:
        menu_data (dict): 메뉴 데이터 (restaurant_id, name, price, image 포함)
    """
    try:
      # 필수 필드 확인
      store_id = menu_data.get("restaurant_id")
      name = menu_data.get("name", "")
      price = menu_data.get("price", "")
      image = menu_data.get("image", "")

      # 가격이 문자열인 경우 숫자로 변환 시도
      if isinstance(price, str) and price.isdigit():
        price = int(price)

      # 기존 데이터가 있는지 확인
      check_query = """
      SELECT id FROM store_menu 
      WHERE store_id = %s AND name = %s;
      """
      self.cursor.execute(check_query, (store_id, name))
      existing_record = self.cursor.fetchone()

      if existing_record:
        # 이미 존재하는 경우 UPDATE
        update_query = """
        UPDATE store_menu 
        SET price = %s, image = %s
        WHERE store_id = %s AND name = %s;
        """
        self.cursor.execute(update_query, (price, image, store_id, name))
      else:
        # 새로운 데이터인 경우 INSERT
        insert_query = """
        INSERT INTO store_menu 
            (store_id, name, price, image) 
        VALUES 
            (%s, %s, %s, %s);
        """
        self.cursor.execute(insert_query, (store_id, name, price, image))

      self.conn.commit()
      return True

    except Exception as e:
      self.conn.rollback()
      raise e

  def close(self):
    """
    데이터베이스 연결을 닫습니다.
    """
    self.cursor.close()
    self.conn.close()
    print("✅ 데이터베이스 연결이 닫혔습니다.")