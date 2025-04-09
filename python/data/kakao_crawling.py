from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time
import re

def clean_text(text):
    """개행문자 및 불필요한 공백 제거"""
    return " ".join(text.replace("\n", " ").replace("\r", " ").split())

def truncate_address(address):
    """
    주소 문자열에서 '구' 또는 '로'가 마지막으로 나타나는 부분까지의 문자열을 반환합니다.
    만약 해당 키워드가 없으면 원본 문자열을 그대로 반환합니다.
    """
    match = re.search(r'^(.*(?:구|로))', address)
    if match:
        return match.group(1)
    return address

# 카카오맵 검색 URL
BASE_URL = "https://map.kakao.com/"

# 크롬 드라이버 설정
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 🚨 브라우저 창을 띄우고 싶으면 주석 해제하지 마세요.
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 크롬 드라이버 실행
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# CSV에서 가게 이름과 주소 가져오기
input_csv = "okay_zone_restlist.csv"
try:
    df = pd.read_csv(input_csv, encoding="cp949")
    df = df.dropna(subset=["cot_conts_name", "cot_addr_full_new"])  # 빈값 제거
    # (원본 가게 이름, 검색에 사용할 쿼리: "가게이름 주소") 튜플 리스트 생성
    search_queries = df.apply(
        lambda row: (
            clean_text(row['cot_conts_name']),
            f"{clean_text(row['cot_conts_name'])} {truncate_address(row['cot_addr_full_new'])}"
        ),
        axis=1
    ).tolist()
    print('search_queries 내용:', search_queries)
except FileNotFoundError:
    print(f"❌ 파일 `{input_csv}`을 찾을 수 없습니다.")
    driver.quit()
    exit()

# 결과 저장 리스트
results = []

# 반복문을 통해 카카오맵에서 검색 실행
for original_name, query in search_queries:
    try:
        # 카카오맵 홈으로 이동
        driver.get(BASE_URL)
        
        # 검색창 로드 대기 (검색창의 id는 "search.keyword.query"로 가정)
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "search.keyword.query"))
        )
        search_box.clear()
        search_box.send_keys(query)
        search_box.send_keys(Keys.ENTER)
        
        # 검색 결과 로드 대기 (결과 리스트는 ul 태그, id에 점(.)이 있으므로 이스케이프 필요)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "ul#info\\.search\\.place\\.list > li"))
        )
        
        # 잠시 대기 (동적 로딩 등)
        time.sleep(1)
        
        # 결과 리스트의 첫 번째 항목 추출
        result_items = driver.find_elements(By.CSS_SELECTOR, "ul#info\\.search\\.place\\.list > li")
        
        if result_items:
            first_item = result_items[0]
            # 가게 이름 추출: <span data-id="screenOutName" class="screen_out">
            try:
                result_name = first_item.find_element(By.CSS_SELECTOR, "div[data-id='btnsWrap'] span.screen_out").text
            except Exception:
                result_name = "이름 없음"
            
            # store_kakao_ID 추출: <a data-id="moreview" ...> 태그의 href에서 ID 파싱
            try:
                moreview_element = first_item.find_element(By.CSS_SELECTOR, "a[data-id='moreview']")
                moreview_href = moreview_element.get_attribute("href")
                # URL 형식: "https://place.map.kakao.com/857085291" => ID는 "857085291"
                store_kakao_id = moreview_href.split("https://place.map.kakao.com/")[-1]
            except Exception:
                store_kakao_id = "ID 없음"
            
        else:
            result_name = "결과 없음"
            store_kakao_id = "결과 없음"
            
        # 결과 저장
        results.append({
            "original_name": original_name,
            "query": query,
            "result_name": result_name,
            "store_kakao_id": store_kakao_id
        })
        
        print(f"✅ 완료: {original_name} -> {result_name}, store_kakao_id: {store_kakao_id}")
    
    except Exception as e:
        print(f"❌ 에러 발생 (검색어: {query}): {e}")
        results.append({
            "original_name": original_name,
            "query": query,
            "result_name": "",
            "store_kakao_id": ""
        })

# ✅ 브라우저 종료
driver.quit()

# ✅ 결과를 CSV 파일로 저장 (UTF-8-sig 인코딩)
output_csv = "restaurant_list_kakao.csv"
pd.DataFrame(results).to_csv(output_csv, index=False, encoding="utf-8-sig")
print(f"✅ 데이터 저장 완료! 파일: {output_csv}")
