from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

# 네이버 지도 검색 URL
BASE_URL = "https://map.naver.com/p/search/"

# 크롬 드라이버 설정
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 🚨 눈으로 보고 싶으면 비활성화
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 크롬 드라이버 실행
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# CSV에서 가게 이름 가져오기
input_csv = "okay_zone_restlist.csv"
try:
    df = pd.read_csv(input_csv, encoding="cp949")
    df = df.dropna(subset=["cot_conts_name", "cot_addr_full_new"])  # 빈값 제거
    search_queries = df.apply(lambda row: (row['cot_conts_name'], f"{row['cot_conts_name']} {row['cot_addr_full_new']}"), axis=1).tolist()
    # search_queries = search_queries[:10]  # 테스트용으로 10개만 실행
except FileNotFoundError:
    print(f"파일 `{input_csv}`을 찾을 수 없습니다.")
    exit()

# 결과 저장 리스트
results = []

# 네이버 지도 검색 및 가게 상세 정보 크롤링
for idx, (place_name, rest_name) in enumerate(search_queries):
    print(f"🔍 `{rest_name}` 검색 중... ({idx+1}/{len(search_queries)})")

    # 네이버 지도 검색 페이지 열기
    search_url = BASE_URL + rest_name
    driver.get(search_url)
    time.sleep(5)  # 🚨 URL 변화를 반영할 시간 필요

    try:
        # `iframe`이 존재하는지 확인 후 전환
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "searchIframe")))
        driver.switch_to.frame("searchIframe")
        time.sleep(2)  # 🚨 `iframe` 내부 로딩 대기

        # 검색 결과에서 첫 번째 가게 찾기
        place_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.ApCpt.k4f_J"))
        )

        if not place_element:
            print(f"`{rest_name}` 검색 결과 없음.")
            continue

        print(f"`{rest_name}` 검색 결과 발견!")

        # 첫 번째 검색 결과 클릭
        driver.execute_script("arguments[0].click();", place_element)
        time.sleep(3)  # 🚨 상세 페이지 로딩 대기

        # `iframe` 해제하고 URL에서 가게 ID 가져오기
        driver.switch_to.default_content()
        time.sleep(2)

        # 가게 ID를 URL에서 추출
        current_url = driver.current_url
        if "/place/" in current_url:
            place_id = current_url.split("/place/")[-1].split("?")[0]  # ID 추출
        else:
            place_id = "ID 추출 실패"

        print(f"{place_name} - ID: {place_id}")

        # 결과 저장 (네이버플레이스URL 제거)
        results.append({
            "가게명": place_name,  # 오케이존 데이터의 cot_conts_name 사용
            "가게ID": place_id
        })

    except Exception as e:
        print(f"`{rest_name}` 크롤링 오류: {e}")

    # 원래 페이지로 돌아가기
    driver.switch_to.default_content()
    time.sleep(2)

# 🔹 브라우저 종료
driver.quit()

# 🔹 결과를 TXT로 저장 (탭으로 구분)
output_csv = "restaurant_list.csv"
pd.DataFrame(results).to_csv(output_csv, index=False, encoding="utf-8-sig")

print(f"데이터 저장 완료! 파일: {output_csv}")

