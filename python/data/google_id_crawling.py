import time
import json
import pandas as pd
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def extract_location(address):
    """
    주소 문자열에서 "구" 또는 "로"까지의 부분을 추출합니다.
    """
    idx = address.find("구")
    if idx != -1:
        return address[:idx+1]
    idx = address.find("로")
    if idx != -1:
        return address[:idx+1]
    return address

def click_review_tab(driver, retry_limit=3, wait_time=3):
    """
    상세페이지에서 리뷰 탭 버튼(aria-label에 "리뷰" 포함)을 최대 retry_limit회 재시도하여 클릭합니다.
    """
    xpath = "//button[contains(@aria-label, '리뷰')]"
    for attempt in range(retry_limit):
        try:
            review_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, xpath))
            )
            driver.execute_script("arguments[0].scrollIntoView(true);", review_button)
            time.sleep(wait_time)
            driver.execute_script("arguments[0].click();", review_button)
            print(f"리뷰 탭 버튼 클릭 성공 (시도 {attempt+1}).")
            return True
        except Exception as e:
            print(f"리뷰 탭 버튼 클릭 시도 {attempt+1} 실패: {e}")
            time.sleep(wait_time)
    return False

def get_reviews_from_google_maps_combined(search_query, driver, max_scroll_attempts=10):
    """
    주어진 검색어(가게명 + 추출된 주소)를 이용해 구글 지도에서 검색한 후,
    첫 번째 결과(링크에 클래스 "hfpxzc"가 있는)를 클릭하여 상세 페이지로 이동합니다.
    상세 페이지에 도달하면 무조건 리뷰 탭 버튼을 클릭(최대 3회 재시도)하여 리뷰 탭으로 전환합니다.
    이후, 리뷰 컨테이너(클래스 "div.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde")를 스크롤해
    모든 리뷰를 로드한 뒤, 리뷰 텍스트는 "div.jftiEf.fontBodyMedium span.wiI7pd" 셀렉터를 사용해 추출합니다.
    함수는 구글 지도에서 추출한 가게명과 리뷰 리스트를 반환합니다.
    """
    base_url = "https://www.google.com/maps/search/"
    encoded_query = urllib.parse.quote(search_query)
    search_url = base_url + encoded_query
    driver.get(search_url)
    
    # 검색 결과 로드 대기: a.hfpxzc 요소
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.hfpxzc"))
        )
    except Exception as e:
        print(f"검색 결과 로드 실패: {e}")
        return None, []
    
    # 첫 번째 결과 클릭
    try:
        first_result = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a.hfpxzc"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", first_result)
        time.sleep(2)
        driver.execute_script("arguments[0].click();", first_result)
    except Exception as e:
        print(f"첫 번째 검색 결과 클릭 실패: {e}")
        return None, []
    
    time.sleep(3)  # 상세 페이지 로드 대기

    # 무조건 리뷰 탭 버튼을 클릭하도록 재시도 (검색 결과가 하나여서 바로 상세페이지로 진입해도)
    if not click_review_tab(driver, retry_limit=3, wait_time=3):
        print("리뷰 탭 버튼 클릭 실패 -> 진행 중단")
        return None, []
    
    time.sleep(3)  # 리뷰 페이지 전환 대기

    # 상세 페이지에서 실제 가게명 추출 (셀렉터는 실제 페이지에 맞게 수정)
    try:
        google_store_name = driver.find_element(By.CSS_SELECTOR, "h1.DUwDvf.lfPIob").text
    except Exception as e:
        google_store_name = "N/A"
    
    # 리뷰 컨테이너 스크롤: "div.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde"를 대상으로 스크롤
    review_elements = []
    try:
        review_container = driver.find_element(By.CSS_SELECTOR, "div.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde")
        last_count = 0
        scroll_attempts = 0
        while scroll_attempts < max_scroll_attempts:
            driver.execute_script("arguments[0].scrollTo(0, arguments[0].scrollHeight);", review_container)
            time.sleep(3)
            review_elements = review_container.find_elements(By.CSS_SELECTOR, "div.jftiEf.fontBodyMedium span.wiI7pd")
            current_count = len(review_elements)
            if current_count == last_count:
                time.sleep(2)
                review_elements = review_container.find_elements(By.CSS_SELECTOR, "div.jftiEf.fontBodyMedium span.wiI7pd")
                if len(review_elements) == last_count:
                    break
            last_count = current_count
            scroll_attempts += 1
    except Exception as e:
        print("리뷰 컨테이너 스크롤 오류:", e)
        # fallback: window 스크롤
        last_count = 0
        scroll_attempts = 0
        while scroll_attempts < max_scroll_attempts:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
            review_elements = driver.find_elements(By.CSS_SELECTOR, "div.jftiEf.fontBodyMedium span.wiI7pd")
            current_count = len(review_elements)
            if current_count == last_count:
                break
            last_count = current_count
            scroll_attempts += 1

    # 리뷰 텍스트 추출
    reviews = []
    for idx, element in enumerate(review_elements, start=1):
        try:
            review_text = element.text
            reviews.append(review_text)
        except Exception as e:
            print(f"[리뷰 {idx}] 텍스트 추출 오류: {e}")
            reviews.append("")
    return google_store_name, reviews


# --- Selenium 드라이버 설정 ---
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 디버깅 시 창을 보고 싶으면 headless 모드 해제
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# --- CSV 파일 읽기: okay_zone_restlist.csv ---
input_csv = "okay_zone_restlist.csv"
try:
    df = pd.read_csv(input_csv, encoding="cp949")
    df = df.dropna(subset=["cot_conts_name", "cot_addr_full_new"])
    # 각 행에서 (가게명, "가게명 + 추출된 주소") 튜플 생성
    csv_queries = df.apply(
        lambda row: (row['cot_conts_name'], f"{row['cot_conts_name']} {extract_location(row['cot_addr_full_new'])}"),
        axis=1
    ).tolist()
except FileNotFoundError:
    print(f"❌ 파일 `{input_csv}`을 찾을 수 없습니다.")
    driver.quit()
    exit()

# CSV 기반 매핑: 가게명을 key, 쿼리를 value로 생성
mapping_csv = {name: query for name, query in csv_queries}

results = []

# --- merged_restaurant_data.json 업데이트: 구글 지도 리뷰 추가 ---
json_file = "merged_restaurant_data2.json"
with open(json_file, "r", encoding="utf-8-sig") as f:
    merged_data = json.load(f)

total_records = len(merged_data)
processed_count = 0

for record in merged_data.values():
    merged_store_name = record.get("store_name", "").strip()
    processed_count += 1
    if merged_store_name in mapping_csv:
        query = mapping_csv[merged_store_name]
        try:
            google_store_name, reviews = get_reviews_from_google_maps_combined(query, driver)
        except Exception as e:
            print(f"❌ `{query}` 크롤링 오류: {e}")
            google_store_name, reviews = "N/A", []
        print(f"[{processed_count}/{total_records}] Merged JSON 가게명: '{merged_store_name}' | Google 지도 가게명: '{google_store_name}'")
        print(f"--- '{merged_store_name}' 구글 지도 리뷰 크롤링 결과 ({len(reviews)}개) ---")
        for r in reviews:
            print(r)
        print("--------------------------------------------")
        record["rest_review_google"] = reviews
    else:
        print(f"[{processed_count}/{total_records}] CSV에 매핑되지 않은 store_name: '{merged_store_name}'")
        record["rest_review_google"] = []

with open(json_file, "w", encoding="utf-8-sig") as f:
    json.dump(merged_data, f, ensure_ascii=False, indent=4)

driver.quit()
print(f"✅ '{json_file}' 파일이 rest_review_google 필드로 업데이트되었습니다.")
