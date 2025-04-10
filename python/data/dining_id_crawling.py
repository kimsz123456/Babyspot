from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time
import urllib.parse

# 다이닝코드 기본 URL
BASE_URL = "https://www.diningcode.com/"

# 주소에서 "구" 또는 "로"까지 추출하는 함수
def extract_location(address):
    idx = address.find("구")
    if idx != -1:
        return address[:idx+1]
    idx = address.find("로")
    if idx != -1:
        return address[:idx+1]
    return address

# a 태그의 href를 재시도하여 추출하는 함수
def get_href_retry(driver, retries=3, delay=1):
    for attempt in range(retries):
        try:
            # 구체적인 선택자 사용: Poi__List__Wrap 영역 내의 a.PoiBlock
            a_tag = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "div.Poi__List__Wrap a.PoiBlock"))
            )
            href = a_tag.get_attribute("href")
            if href:
                return href
        except (StaleElementReferenceException, TimeoutException):
            time.sleep(delay)
    return None

# 크롬 드라이버 옵션 설정
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 결과를 눈으로 확인하려면 headless 모드 해제
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# CSV에서 가게명과 주소 읽기
input_csv = "okay_zone_restlist.csv"
try:
    df = pd.read_csv(input_csv, encoding="cp949")
    df = df.dropna(subset=["cot_conts_name", "cot_addr_full_new"])
    # 각 행에서 (가게명, "가게명 + 추출된 주소") 튜플 생성
    search_queries = df.apply(
        lambda row: (row['cot_conts_name'], f"{row['cot_conts_name']} {extract_location(row['cot_addr_full_new'])}"),
        axis=1
    ).tolist()
except FileNotFoundError:
    print(f"❌ 파일 `{input_csv}`을 찾을 수 없습니다.")
    driver.quit()
    exit()

results = []

for idx, (restaurant_name, search_query) in enumerate(search_queries):
    print(f"🔍 `{search_query}` 검색 중... ({idx+1}/{len(search_queries)})")
    try:
        # 검색어 URL 인코딩 및 검색 URL 생성
        encoded_query = urllib.parse.quote(search_query)
        search_url = BASE_URL + "list.dc?query=" + encoded_query
        driver.get(search_url)
        # 검색 결과 리스트 영역이 로드될 때까지 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.Poi__List__Wrap"))
        )
        time.sleep(1)  # 컨테이너 안정화를 위한 잠깐 대기

        # 지정한 영역 내의 a 태그의 href 속성을 재시도하여 추출
        href = get_href_retry(driver, retries=3, delay=1)
        print(f"DEBUG: {restaurant_name} href: {href}")
        if not href:
            print(f"❌ {restaurant_name}의 href 속성을 찾을 수 없습니다.")
            continue

        # href 문자열에서 "rid=" 이후 텍스트 추출
        if "rid=" in href:
            restaurant_id = href.split("rid=")[1].split("&")[0]
        else:
            restaurant_id = "ID 추출 실패"
        print(f"✅ {restaurant_name} - ID: {restaurant_id}")
        results.append({
            "가게명": restaurant_name,
            "가게ID": restaurant_id
        })
    except Exception as e:
        print(f"❌ `{search_query}` 크롤링 오류: {e}")

driver.quit()
output_csv = "restaurant_list_dining.csv"
pd.DataFrame(results).to_csv(output_csv, index=False, encoding="utf-8-sig")
print(f"✅ 데이터 저장 완료! 파일: {output_csv}")
