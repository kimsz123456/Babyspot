from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import json
import time

# 네이버 지도 검색 URL
BASE_URL = "https://map.naver.com/p/search/"

# 크롬 드라이버 설정
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 화면 확인이 필요하면 주석 처리
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 크롬 드라이버 실행
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# CSV 파일 읽기 및 필수 컬럼이 없는 행 제거
input_csv = "okay_zone_restlist.csv"
try:
    df = pd.read_csv(input_csv, encoding="cp949")
    df = df.dropna(subset=["cot_conts_name", "cot_addr_full_new"])
except FileNotFoundError:
    print(f"❌ 파일 `{input_csv}`을 찾을 수 없습니다.")
    exit()

result_dict = {}
# CSV 행의 순서에 따라 인덱스를 1부터 시작
for new_index, (_, row) in enumerate(df.iterrows(), start=1):
    # CSV의 가게명과 주소를 활용해 검색 쿼리 생성
    place_name = str(row["cot_conts_name"]).strip()
    rest_name = f"{place_name} {row['cot_addr_full_new']}"
    
    print(f"🔍 `{rest_name}` 검색 중... ({new_index}/{len(df)})")
    
    # 네이버 지도 검색 페이지 열기
    search_url = BASE_URL + rest_name
    driver.get(search_url)
    time.sleep(5)  # 페이지 로딩 대기
    
    place_id = None
    try:
        # iframe 전환: 검색 결과가 있는 iframe으로 전환
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "searchIframe"))
        )
        driver.switch_to.frame("searchIframe")
        time.sleep(2)
        
        # 첫 번째 검색 결과 요소 찾기
        place_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.ApCpt.k4f_J"))
        )
        if place_element:
            # 첫 번째 결과 클릭
            driver.execute_script("arguments[0].click();", place_element)
            time.sleep(3)  # 상세 페이지 로딩 대기
            
            # iframe 해제 후 URL에서 가게ID 추출
            driver.switch_to.default_content()
            time.sleep(2)
            current_url = driver.current_url
            if "/place/" in current_url:
                place_id = current_url.split("/place/")[-1].split("?")[0]
            else:
                place_id = "ID 추출 실패"
        else:
            place_id = "검색 결과 없음"
        
        print(f"✅ {place_name} - ID: {place_id}")
    except Exception as e:
        print(f"❌ `{rest_name}` 크롤링 오류: {e}")
        place_id = "크롤링 오류"
    finally:
        driver.switch_to.default_content()
        time.sleep(2)
    
    # CSV 추가 정보 처리
    # kidz_menu: 원본 문자열 그대로, NaN이면 빈 문자열, \n은 공백으로 대체
    kidz_menu = str(row["cot_value_01"]).strip() if pd.notnull(row["cot_value_01"]) else ""
    kidz_menu = kidz_menu.replace("\n", " ")
    
    # possible_parking: "cot_value_05" 값에 "O" 문자가 있으면 True, 그렇지 않으면 False
    possible_value = str(row["cot_value_05"]).strip() if pd.notnull(row["cot_value_05"]) else ""
    possible_value = possible_value.replace("\n", " ")
    possible_parking = True if "O" in possible_value else False
    
    # kidz_item: 원본 문자열 그대로, NaN이면 빈 문자열, \n은 공백으로 대체
    kidz_item = str(row["cot_value_02"]).strip() if pd.notnull(row["cot_value_02"]) else ""
    kidz_item = kidz_item.replace("\n", " ")
    
    # 최종 결과에 데이터 병합 (인덱스는 1부터 시작)
    result_dict[str(new_index)] = {
        "가게명": place_name,
        "가게ID": place_id,
        "kidz_menu": kidz_menu,
        "possible_parking": possible_parking,
        "kidz_item": kidz_item
    }

# 브라우저 종료
driver.quit()

# 최종 JSON 문자열로 변환 (한글 깨지지 않도록)
json_output = json.dumps(result_dict, ensure_ascii=False, indent=4)

# 최종 JSON 파일 저장
final_json_file = "final_restaurant_data.json"
with open(final_json_file, "w", encoding="utf-8") as f:
    f.write(json_output)

print(f"✅ 최종 JSON 데이터가 '{final_json_file}' 파일로 저장되었습니다.")
