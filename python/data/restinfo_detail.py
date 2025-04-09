import os
import pandas as pd
import json
import copy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import csv

# 크롤링할 상세 페이지 경로 (홈, 메뉴, 가게 리뷰, 블로그 리뷰, 정보) 
PLACE_PATHS = ["/home", "/menu", "/review/ugc", "/review", "/information"]

# 파일 경로들
input_csv = "restaurant_list.csv"
output_csv = "restaurant_full_details5.csv"
output_txt = "restaurant_full_details5.txt"  # TXT 출력 파일 경로
output_json = "restaurant_full_details5.json"  # JSON 출력 파일 경로
checkpoint_file = "checkpoint2.txt"

# 이미 처리된 가게ID 목록 (중복 저장 방지)
processed_store_ids = set()
if os.path.exists(output_csv):
    try:
        df_existing = pd.read_csv(output_csv, encoding="utf-8-sig")
        processed_store_ids = set(df_existing["가게ID"].astype(str).tolist())
        print(f"기존 저장 파일 {output_csv}에서 {len(processed_store_ids)}개의 가게 데이터가 이미 저장되어 있음.")
    except Exception as e:
        print("기존 CSV 파일 읽기 실패:", e)
else:
    print("기존 저장 파일이 없으므로 새로 생성합니다.")

# 체크포인트 읽기 (마지막으로 성공적으로 처리된 인덱스)
start_index = 0
if os.path.exists(checkpoint_file):
    try:
        with open(checkpoint_file, "r") as f:
            start_index = int(f.read().strip())
        print(f"체크포인트 발견: 인덱스 {start_index}부터 재시작합니다.")
    except Exception as e:
        print("체크포인트 읽기 실패:", e)
else:
    print("체크포인트 파일이 없습니다. 처음부터 시작합니다.")

# CSV 출력 파일이 없다면 헤더부터 작성
if not os.path.exists(output_csv):
    header_fields = [
        "store_name", "store_naver_ID", "home_information", "image_url_store",
        "review_total_text", "ugc_review_total_text", "menu_information",
        "image_url_menu", "menu_detail_information", "information"
    ]
    with open(output_csv, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=header_fields, quoting=csv.QUOTE_ALL)
        writer.writeheader()

# txt 출력 파일 초기화 (기존 내용 삭제)
with open(output_txt, "w", encoding="utf-8-sig") as f:
    f.write("")

# 크롬 드라이버 설정
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# CSV 파일로부터 가게목록 읽기
restaurant_data = []
try:
    with open(input_csv, "r", encoding="utf-8", newline="") as csvfile:
        reader = csv.reader(csvfile)
        header = next(reader, None)  # 헤더 건너뛰기
        print("원본 데이터:")
        for row in reader:
            print(row)
            if len(row) == 2 and row[1].isdigit():
                restaurant_data.append((row[0], row[1]))
except FileNotFoundError:
    print(f"파일 {input_csv}을 찾을 수 없습니다.")
    driver.quit()
    exit()

print("유효한 데이터:", restaurant_data)

def click_more_button():
    try:
        while True:
            more_buttons = driver.find_elements(By.CSS_SELECTOR, 'a.fvwqf')
            if not more_buttons:
                break
            for btn in more_buttons:
                try:
                    driver.execute_script("arguments[0].click();", btn)
                    time.sleep(1.5)
                except Exception:
                    continue
    except Exception as e:
        print(f"'더보기' 버튼 클릭 중 오류 발생: {e}")

def scroll_to_bottom():
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

# 네이버 플레이스 상세 정보 크롤링
for idx, (store_name, place_id) in enumerate(restaurant_data):
    if idx < start_index:
        continue
    if place_id in processed_store_ids:
        print(f"{store_name}({place_id})는 이미 처리된 가게입니다. 건너뜁니다.")
        continue

    print(f"[{idx+1}/{len(restaurant_data)}] {store_name} 상세 정보 크롤링 중...")
    store_data = {
        "store_name": store_name,
        "store_naver_ID": place_id,
        "home_information": [],
        "image_url_store": [],
        "review_total_text": [],
        "ugc_review_total_text": [],
        "menu_information": [],
        "image_url_menu": [],
        "menu_detail_information": [],
        "information": []
    }

    for path in PLACE_PATHS:
        page_url = f"https://map.naver.com/p/entry/place/{place_id}?c=15.00,0,0,0,dh&placePath={path}"
        driver.get(page_url)
        time.sleep(3)
        # iframe 로딩 재시도 로직: 최대 3회 시도, 각 시도마다 30초 대기, 실패 시 페이지 새로고침 후 재시도
        max_attempts = 3
        attempt = 0
        loaded = False
        while attempt < max_attempts and not loaded:
            try:
                WebDriverWait(driver, 30).until(
                    EC.presence_of_element_located((By.ID, "entryIframe"))
                )
                driver.switch_to.frame("entryIframe")
                time.sleep(2)
                loaded = True
            except Exception as e:
                attempt += 1
                print(f"{store_name} {path} iframe 로딩 시도 {attempt} 실패: {e}")
                driver.refresh()  # 페이지 새로고침
                time.sleep(3)
        if not loaded:
            print(f"{store_name} {path} iframe 로딩 최종 실패")
            continue

        if path == "/menu":
            try:
                menu_elements = driver.find_elements(By.CSS_SELECTOR, "div span")
                menu_items = [menu.text.strip() for menu in menu_elements if menu.text.strip()]
                store_data["menu_information"].extend(menu_items)
                print(f"{store_name} - 메뉴 데이터 수집 완료: {menu_items}")

                menu_image_elements = driver.find_elements(By.CSS_SELECTOR, 'img[alt^="메뉴판"]')
                menu_image_urls = [img.get_attribute("src") for img in menu_image_elements if img.get_attribute("src")]
                if menu_image_urls:
                    store_data["image_url_menu"].extend(menu_image_urls)
                    print(f"{store_name} - 메뉴판 이미지 수집 완료: {menu_image_urls}")
                else:
                    print(f"{store_name} - 메뉴판 이미지 없음")

                li_elements = driver.find_elements(By.CSS_SELECTOR, "li.E2jtL")
                menu_details = []
                for li in li_elements:
                    text_content = li.text.strip()
                    try:
                        img = li.find_element(By.CSS_SELECTOR, "img")
                        image_url = img.get_attribute("src")
                    except Exception as img_error:
                        image_url = None
                    menu_details.append({"text": text_content, "image": image_url})
                if menu_details:
                    store_data["menu_detail_information"] = menu_details
                    print(f"{store_name} - 메뉴 상세 데이터 수집 완료: {menu_details}")
            except Exception as menu_error:
                print(f"{store_name} 메뉴 크롤링 실패: {menu_error}")

        elif path == "/review/ugc":
            try:
                while True:
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(1)
                    more_buttons = driver.find_elements(By.CSS_SELECTOR, 'a.fvwqf')
                    if more_buttons:
                        more_buttons[0].click()
                        time.sleep(2)
                    else:
                        print("더이상 더보기 버튼이 없음")
                        break
            except Exception as e:
                print("더보기 버튼 클릭 중 에러 발생:", e)
            review_elements = driver.find_elements(By.CSS_SELECTOR, "ul > li")
            review_texts = [elem.text.strip().replace(',', '') for elem in review_elements if elem.text.strip()]
            store_data["ugc_review_total_text"].extend(review_texts)
            print(f"{store_name} - 블로그 리뷰 데이터 수집 완료: {review_texts}")

        elif path == "/review":
            try:
                while True:
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(1)
                    more_buttons = driver.find_elements(By.CSS_SELECTOR, 'a.fvwqf')
                    if more_buttons:
                        more_buttons[0].click()
                        time.sleep(2)
                    else:
                        print("더이상 더보기 버튼이 없음")
                        break
            except Exception as e:
                print("더보기 버튼 클릭 중 에러 발생:", e)
            review_elements = driver.find_elements(By.CSS_SELECTOR, "ul > li")
            review_texts = [elem.text.strip().replace(',', '') for elem in review_elements if elem.text.strip()]
            store_data["review_total_text"].extend(review_texts)
            print(f"{store_name} - 가게 리뷰 데이터 수집 완료: {review_texts}")

        elif path == "/home":
            try:
                # 1. 기본 가게 정보가 포함된 요소(div.O8qbU)가 렌더링될 때까지 대기
                WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "div.O8qbU"))
                )
                print(f"{store_name} - 기본 가게 정보 로드 완료.")

                # 2. '펼쳐보기' 버튼(a.gKP9i.RMgN0)이 클릭 가능해질 때까지 대기 후 클릭
                try:
                    more_button = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR, "a.gKP9i.RMgN0"))
                    )
                    driver.execute_script("arguments[0].click();", more_button)
                    print(f"{store_name} - '펼쳐보기' 버튼 클릭하여 추가 정보 로드 시작.")
                except Exception as click_exception:
                    print(f"{store_name} - '펼쳐보기' 버튼 클릭 실패: {click_exception}")

                # 3. 추가 정보가 로드되는 것을 확인하기 위해, 예를 들어 div.O8qbU의 개수가 2개 이상이 되는지 대기
                WebDriverWait(driver, 10).until(
                    lambda d: len(d.find_elements(By.CSS_SELECTOR, "div.O8qbU")) > 1
                )
                time.sleep(1) 

                image_elements = driver.find_elements(By.CSS_SELECTOR, 'img[alt="업체"]')
                image_urls = [img.get_attribute("src") for img in image_elements if img.get_attribute("src")]
                store_data["image_url_store"].extend(image_urls)
                print(f"{store_name} - 업체 이미지 수집 완료: {image_urls}")

                # 5. 렌더링된 모든 가게 정보 텍스트 수집
                elements = driver.find_elements(By.CSS_SELECTOR, "div.O8qbU")
                all_text = " ".join([el.text.strip().replace('\n', ' ').replace(',', '') for el in elements if el.text.strip()])
                store_data["home_information"] = all_text
                print(f"{store_name} - 가게 정보 수집 완료: {all_text}")

            except Exception as e:
                print(f"{store_name} - /home 데이터 수집 중 에러 발생: {e}")

        elif path == "/information":
            try:
                info_container = driver.find_element(By.CSS_SELECTOR, 'div[data-nclicks-area-code="inf"]')
                info_text = info_container.text.strip().split("\n")
                store_data["information"].extend(info_text)
                print(f"{store_name} - 정보 페이지 데이터 수집 완료: {info_text}")
            except Exception as info_error:
                print(f"{store_name} 정보 페이지 크롤링 실패: {info_error}")

        driver.switch_to.default_content()
        time.sleep(2)

    # → 원본 데이터를 CSV나 TXT 저장 전에 deep copy하여 JSON 갱신용 원본 데이터로 보존 (리스트 그대로)
    store_data_raw = copy.deepcopy(store_data)

    # CSV 저장 전에 리스트 형식의 항목들을 JSON 문자열로 변환 (쉼표 문제 방지)
    for key in ["image_url_store", "review_total_text", "ugc_review_total_text", "menu_information", "menu_detail_information", "image_url_menu", "home_information", "information"]:
        store_data[key] = json.dumps(store_data[key], ensure_ascii=False)

    # CSV에 저장
    try:
        with open(output_csv, "a", encoding="utf-8-sig", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=store_data.keys(), quoting=csv.QUOTE_ALL)
            writer.writerow(store_data)
        print(f"{store_name} 데이터 CSV 저장 완료!")
    except Exception as csv_e:
        print(f"{store_name} 데이터 CSV 저장 실패: {csv_e}")

    # TXT 파일에도 저장 (한 줄에 하나의 JSON 객체)
    try:
        with open(output_txt, "a", encoding="utf-8-sig") as f:
            f.write(json.dumps(store_data, ensure_ascii=False) + "\n")
        print(f"{store_name} 데이터 TXT 저장 완료!")
    except Exception as txt_e:
        print(f"{store_name} 데이터 TXT 저장 실패: {txt_e}")

    # JSON 파일 갱신: 체크포인트를 활용해 현재 인덱스 값을 key로 사용하여 저장
    try:
        if os.path.exists(output_json):
            with open(output_json, "r", encoding="utf-8-sig") as f:
                existing_data = json.load(f)
            if not isinstance(existing_data, dict):
                existing_data = {}
        else:
            existing_data = {}
    except Exception as e:
        print("JSON 파일 읽기 실패:", e)
        existing_data = {}

    # 현재 인덱스의 다음 번호(문자열)를 key로 사용
    key = str(idx + 1)
    existing_data[key] = store_data_raw

    try:
        with open(output_json, "w", encoding="utf-8-sig") as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=4)
        print(f"{store_name} 데이터 JSON 파일 갱신 완료!")
    except Exception as json_e:
        print(f"{store_name} 데이터 JSON 파일 갱신 실패: {json_e}")

    # 처리 완료된 가게ID를 추가하고 체크포인트 업데이트
    processed_store_ids.add(place_id)
    try:
        with open(checkpoint_file, "w") as f:
            f.write(str(idx + 1))
        print(f"체크포인트 업데이트: {idx+1}")
    except Exception as cp_e:
        print("체크포인트 업데이트 실패:", cp_e)

driver.quit()
print("전체 크롤링 완료!")
