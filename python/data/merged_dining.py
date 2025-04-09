import time
import json
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def get_reviews_for_store_dining(store_dining_id, driver, max_scroll_attempts=10):
    """
    주어진 store_dining_id의 DiningCode 리뷰 페이지(예: https://www.diningcode.com/profile.php?rid={store_dining_id})
    에 접속하여, 스크롤을 통해 동적으로 로드되는 모든 리뷰를 수집합니다.
    각 리뷰 텍스트는 <p class="review_contents btxt"> 요소에서 추출됩니다.
    """
    url = f"https://www.diningcode.com/profile.php?rid={store_dining_id}"
    driver.get(url)
    
    # 리뷰 컨테이너 로드 대기 (예시로 "div_review" ID 사용)
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "div_review"))
        )
    except Exception as e:
        print(f"리뷰 컨테이너 로드 실패 (store_dining_id: {store_dining_id}): {e}")
        return []
    
    # 스크롤을 내려서 리뷰를 모두 불러오기 (최대 max_scroll_attempts 회)
    last_height = driver.execute_script("return document.body.scrollHeight")
    scroll_attempts = 0
    while scroll_attempts < max_scroll_attempts:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # 로딩 대기
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        scroll_attempts += 1

    # 리뷰 텍스트 추출: <p class="review_contents btxt">
    review_elements = driver.find_elements(By.CSS_SELECTOR, "p.review_contents.btxt")
    reviews = []
    for idx, element in enumerate(review_elements, start=1):
        try:
            review_text = element.text
            reviews.append(review_text)
        except Exception as e:
            print(f"[다이닝 리뷰 {idx}] 텍스트 추출 오류: {e}")
            reviews.append("")
    return reviews

# --- Selenium 드라이버 설정 ---
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # 필요시 headless 모드 사용
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# --- restaurant_list_dining.csv 읽기 및 매핑 생성 ---
# CSV 파일에는 컬럼명이 "가게명"과 "가게ID"로 되어 있다고 가정합니다.
csv_file_dining = "restaurant_list_dining.csv"
df_csv_dining = pd.read_csv(csv_file_dining, encoding="utf-8-sig")

mapping_dining = {}
for idx, row in df_csv_dining.iterrows():
    # CSV의 "가게명"을 key, "가게ID"를 value로 매핑
    csv_store_name = row["가게명"].strip()
    store_dining_id_val = row["가게ID"]
    if pd.isna(store_dining_id_val):
        store_dining_id = ""
    else:
        store_dining_id = str(store_dining_id_val).strip()
    mapping_dining[csv_store_name] = store_dining_id

# 디버깅: CSV 매핑 건수 및 예시 출력
print(f"Dining CSV 매핑 건수: {len(mapping_dining)}")
print("예시 매핑 (상위 5개):")
for i, (k, v) in enumerate(mapping_dining.items()):
    if i >= 5:
        break
    print(f"  '{k}' -> '{v}'")

# --- merged_restaurant_data2.json 읽기 ---
json_file = "merged_restaurant_data2.json"
with open(json_file, "r", encoding="utf-8-sig") as f:
    merged_data = json.load(f)

total_records = len(merged_data)
processed_count = 0
matched_count = 0
unmatched_count = 0

# --- merged_data 업데이트: DiningCode 리뷰 추가 ---
# merged_data의 각 레코드에서 store_name이 dining CSV의 "가게명"과 일치하면,
# 해당 가게의 store_dining_id와 다이닝 리뷰(rest_review_dining)를 추가합니다.
for key, record in merged_data.items():
    merged_store_name = record.get("store_name", "").strip()
    processed_count += 1
    if merged_store_name in mapping_dining:
        matched_count += 1
        store_dining_id = mapping_dining[merged_store_name]
        # 디버깅: merged JSON의 가게명과 CSV의 가게명을 함께 출력 (둘이 일치함)
        print(f"[{processed_count}/{total_records}] Merged JSON store name: '{merged_store_name}' | CSV store name: '{merged_store_name}' -> store_dining_id: '{store_dining_id}'")
        if store_dining_id == "":
            print(f"[{processed_count}/{total_records}] {merged_store_name}: store_dining_id가 없으므로 다이닝 리뷰 크롤링 건너뜁니다.")
            record["store_dining_id"] = ""
            record["rest_review_dining"] = []
        else:
            print(f"[{processed_count}/{total_records}] Processing '{merged_store_name}' (store_dining_id: {store_dining_id})...")
            reviews = get_reviews_for_store_dining(store_dining_id, driver)
            print(f"--- '{merged_store_name}' 다이닝 리뷰 크롤링 결과 ({len(reviews)}개) ---")
            for r in reviews:
                print(r)
            print("--------------------------------------------")
            record["store_dining_id"] = store_dining_id
            record["rest_review_dining"] = reviews
    else:
        unmatched_count += 1
        print(f"[{processed_count}/{total_records}] 매핑되지 않은 store_name: '{merged_store_name}'")
        record["store_dining_id"] = ""
        record["rest_review_dining"] = []

print(f"총 {total_records}개 레코드 중 매핑된 레코드: {matched_count}, 매핑되지 않은 레코드: {unmatched_count}")

with open(json_file, "w", encoding="utf-8-sig") as f:
    json.dump(merged_data, f, ensure_ascii=False, indent=4)

driver.quit()
print(f"'{json_file}' 파일이 store_dining_id와 rest_review_dining 필드로 업데이트되었습니다.")
