import time
import json
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def get_reviews_for_store(store_kakao_id, driver, max_scroll_attempts=10):
    """
    주어진 store_kakao_id의 리뷰 페이지(https://place.map.kakao.com/{store_kakao_id}#comment)로 접속하여,
    스크롤을 통해 동적으로 로드되는 모든 리뷰를 수집한 후,
    각 리뷰 요소 내에서 "더보기" 버튼이 있으면 클릭하여 전체 리뷰 내용을 펼친 후,
    p.desc_review 텍스트를 리스트로 반환합니다.
    """
    url = f"https://place.map.kakao.com/{store_kakao_id}#comment"
    driver.get(url)
    
    # 리뷰 컨테이너 로드 대기
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "ul.list_review"))
        )
    except Exception as e:
        print(f"리뷰 컨테이너 로드 실패 (store_kakao_id: {store_kakao_id}): {e}")
        return []
    
    # 스크롤을 내려서 추가 리뷰 로드 (최대 max_scroll_attempts 회)
    last_height = driver.execute_script("return document.body.scrollHeight")
    scroll_attempts = 0
    while scroll_attempts < max_scroll_attempts:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # 페이지 로딩 대기
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break  # 더 이상 새로운 리뷰가 로드되지 않으면 중단
        last_height = new_height
        scroll_attempts += 1

    # ul.list_review 내부의 모든 리뷰(li 요소)에서 리뷰 텍스트 추출
    review_elements = driver.find_elements(By.CSS_SELECTOR, "ul.list_review li")
    reviews = []
    for element in review_elements:
        try:
            # "더보기" 버튼이 있으면 클릭하여 전체 리뷰를 펼침
            more_buttons = element.find_elements(By.CSS_SELECTOR, "span.btn_more")
            if more_buttons:
                try:
                    driver.execute_script("arguments[0].click();", more_buttons[0])
                    time.sleep(2)  # 리뷰 확장 대기
                except Exception as e:
                    print("더보기 버튼 클릭 오류:", e)
            # 리뷰 텍스트 추출
            review_text = element.find_element(By.CSS_SELECTOR, "p.desc_review").text
            reviews.append(review_text)
        except Exception as e:
            print("리뷰 텍스트 추출 오류:", e)
    return reviews

# --- Selenium 드라이버 설정 ---
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 필요시 headless 모드 사용
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# --- CSV 파일 읽기 및 매핑 생성 ---
csv_file = "restaurant_list_kakao.csv"
df_csv = pd.read_csv(csv_file, encoding="utf-8-sig")

# CSV에는 original_name, query, result_name, store_kakao_id 컬럼이 있다고 가정합니다.
# original_name을 key로, store_kakao_id를 value로 하는 매핑 딕셔너리를 생성하는데,
# store_kakao_id가 NaN이면 빈 문자열("")로 처리합니다.
mapping = {}
for idx, row in df_csv.iterrows():
    original_name = row["original_name"].strip()
    store_kakao_id_val = row["store_kakao_id"]
    if pd.isna(store_kakao_id_val):
        store_kakao_id = ""
    else:
        store_kakao_id = str(store_kakao_id_val).strip()
    mapping[original_name] = store_kakao_id

# --- practice.json 파일 읽기 ---
json_file = "merged_restaurant_data.json"
with open(json_file, "r", encoding="utf-8-sig") as f:
    practice_data = json.load(f)

# --- practice.json 업데이트 ---
# practice_data의 각 레코드에서 store_name이 CSV의 original_name과 일치하면,
# store_kakao_id가 있으면 리뷰를 크롤링하고, 없으면 빈 데이터를 넣습니다.
for key, record in practice_data.items():
    store_name = record.get("store_name", "").strip()
    if store_name in mapping:
        store_kakao_id = mapping[store_name]
        if store_kakao_id == "":
            print(f"{store_name}: store_kakao_id가 없으므로 크롤링 건너뜁니다.")
            record["store_kakao_id"] = ""
            record["rest_review_kakao"] = []
        else:
            print(f"Processing '{store_name}' (store_kakao_id: {store_kakao_id})...")
            reviews = get_reviews_for_store(store_kakao_id, driver)
            record["store_kakao_id"] = store_kakao_id
            record["rest_review_kakao"] = reviews
    else:
        print(f"매핑되지 않은 store_name: {store_name}")
        record["store_kakao_id"] = ""
        record["rest_review_kakao"] = []

# --- 업데이트된 practice.json 저장 ---
with open(json_file, "w", encoding="utf-8-sig") as f:
    json.dump(practice_data, f, ensure_ascii=False, indent=4)

driver.quit()
print(f"✅ '{json_file}' 파일이 store_kakao_id와 rest_review_kakao 필드로 업데이트되었습니다.")
