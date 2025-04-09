import json

# crawling_raw_data.json 파일 읽기 (encoding을 utf-8-sig로 지정)
with open("crawling_raw_data.json", "r", encoding="utf-8-sig") as f:
    crawling_data = json.load(f)

# final_restaurant_data.json 파일도 동일하게 처리 (필요 시)
with open("final_restaurant_data.json", "r", encoding="utf-8-sig") as f:
    final_data = json.load(f)

# 나머지 병합 로직은 이전과 동일합니다.
extra_mapping = {}
for key, record in final_data.items():
    store_id = record.get("가게ID", "").strip()
    if store_id:  # 가게ID가 비어있지 않다면
        extra_mapping[store_id] = {
            "kidz_menu": record.get("kidz_menu", ""),
            "possible_parking": record.get("possible_parking", False),
            "kidz_item": record.get("kidz_item", "")
        }

merged_data = {}
for key, record in crawling_data.items():
    store_naver_id = record.get("store_naver_ID", "").strip()
    if store_naver_id and store_naver_id in extra_mapping:
        record["kidz_menu"] = extra_mapping[store_naver_id]["kidz_menu"]
        record["possible_parking"] = extra_mapping[store_naver_id]["possible_parking"]
        record["kidz_item"] = extra_mapping[store_naver_id]["kidz_item"]
        merged_data[key] = record

print(merged_data)
output_file = "merged_restaurant_data.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(merged_data, f, ensure_ascii=False, indent=4)

print(f"병합된 데이터가 '{output_file}' 파일에 저장되었습니다.")
