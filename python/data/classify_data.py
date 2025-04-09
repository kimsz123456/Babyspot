import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, udf
from pyspark.sql.types import ArrayType, StringType, StructType, StructField
from pyspark import StorageLevel
from functools import reduce

# --- UDF 정의 ---
def ensure_array(val):
    if val is None:
        return []
    if isinstance(val, list):
        return val
    return [val]

ensure_array_udf = udf(ensure_array, ArrayType(StringType()))

def normalize_menu_detail(menu):
    if menu is None:
        return []
    if isinstance(menu, list):
        new_menu = []
        for item in menu:
            if isinstance(item, dict) and "image" in item and "text" in item:
                new_menu.append(item)
            elif isinstance(item, str):
                try:
                    parsed = json.loads(item)
                    if isinstance(parsed, dict) and "image" in parsed and "text" in parsed:
                        new_menu.append(parsed)
                    else:
                        new_menu.append({"image": item, "text": ""})
                except Exception:
                    new_menu.append({"image": item, "text": ""})
            else:
                new_menu.append({"image": str(item), "text": ""})
        return new_menu
    return []

menu_detail_schema = ArrayType(StructType([
    StructField("image", StringType(), True),
    StructField("text", StringType(), True)
]))
normalize_menu_detail_udf = udf(normalize_menu_detail, menu_detail_schema)

def normalize_image_url_menu(val):
    if val is None:
        return []
    if isinstance(val, list):
        result = []
        for item in val:
            if isinstance(item, dict):
                image = item.get("image", "")
                text = item.get("text", "").strip() or "unknown menu"
                result.append({"image": image, "text": text})
            elif isinstance(item, str):
                result.append({"image": item, "text": "unknown menu"})
            else:
                result.append({"image": str(item), "text": "unknown menu"})
        return result
    if isinstance(val, str):
        return [{"image": val, "text": "unknown menu"}]
    return []

normalize_image_url_menu_udf = udf(normalize_image_url_menu, ArrayType(
    StructType([
        StructField("image", StringType(), True),
        StructField("text", StringType(), True)
    ])
))

def split_reviews_by_person(texts, delimiter="\n펼쳐보기\n"):
    if texts is None:
        return []
    result = []
    for text in texts:
        if text is None:
            continue
        if delimiter in text:
            parts = [part.strip() for part in text.split(delimiter) if part.strip()]
            result.extend(parts)
        else:
            result.append(text)
    return result

split_reviews_udf = udf(split_reviews_by_person, ArrayType(StringType()))

# --- Spark 세션 생성 (메모리 관련 옵션 추가) ---
spark = SparkSession.builder \
    .appName("Restaurant Data Processing Optimized") \
    .config("spark.driver.memory", "8g") \
    .config("spark.executor.memory", "8g") \
    .config("spark.driver.maxResultSize", "8g") \
    .config("spark.sql.shuffle.partitions", "500") \
    .config("spark.memory.fraction", "0.8") \
    .getOrCreate()

spark.conf.set("spark.sql.debug.maxToStringFields", "1000")
spark.sparkContext.setLogLevel("ERROR")

checkpoint_dir = "hdfs:///user/hadoop/checkpoint"
spark.sparkContext.setCheckpointDir(checkpoint_dir)

# --- 최종 저장 경로 설정 ---
final_info_path = "hdfs:///user/hadoop/add_big_rest_info"
final_home_path = "hdfs:///user/hadoop/add_big_rest_home_information"
final_url_path = "hdfs:///user/hadoop/add_big_rest_url"
final_review_path = "hdfs:///user/hadoop/add_big_rest_review"
final_ugc_review_path = "hdfs:///user/hadoop/add_big_rest_ugc_review"
final_menu_detail_path = "hdfs:///user/hadoop/add_big_rest_menu_detail_information"
final_review_kakao_path = "hdfs:///user/hadoop/add_big_rest_kakao_review"
final_review_dining_path = "hdfs:///user/hadoop/add_big_rest_dining_review"
final_review_google_path = "hdfs:///user/hadoop/add_big_rest_google_review"

# --- 원본 JSON 파일 읽기 ---
raw_df = spark.read.option("multiLine", "true").json("file:///home/ubuntu/merged_restaurant_data2.json")
print(f"총 {len(raw_df.columns)}개의 레스토랑 데이터 발견")

# --- 배치 처리 설정 (메모리 부담을 줄이기 위해 배치 크기를 5로 조정) ---
batch_size = 5
all_keys = raw_df.columns
num_batches = (len(all_keys) + batch_size - 1) // batch_size

for batch_idx in range(num_batches):
    start_idx = batch_idx * batch_size
    end_idx = min(start_idx + batch_size, len(all_keys))
    batch_keys = all_keys[start_idx:end_idx]
    
    print(f"배치 {batch_idx+1}/{num_batches} 처리 중 (레스토랑 {start_idx+1}-{end_idx}/{len(all_keys)})")
    
    # 각 카테고리별 임시 DataFrame 리스트
    batch_info_dfs = []
    batch_home_dfs = []
    batch_url_dfs = []
    batch_review_dfs = []
    batch_ugc_review_dfs = []
    batch_menu_detail_dfs = []
    batch_review_kakao_dfs = []
    batch_review_dining_dfs = []
    batch_review_google_dfs = []
    
    for key in batch_keys:
        restaurant_df = raw_df.select(col(key).alias("data")).repartition(10)
        first_row = restaurant_df.first()
        if first_row is None or first_row["data"] is None:
            continue

        info_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            col("data.store_name"),
            col("data.store_naver_ID"),
            col("data.store_kakao_id"),
            col("data.store_dining_id"),
            ensure_array_udf(col("data.menu_information")).alias("menu_information"),
            ensure_array_udf(col("data.information")).alias("information"),
            col("data.kidz_menu"),
            col("data.possible_parking"),
            ensure_array_udf(col("data.kidz_item")).alias("kidz_item")
        ).persist(StorageLevel.MEMORY_AND_DISK)
        
        home_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            ensure_array_udf(col("data.home_information")).alias("home_information")
        ).persist(StorageLevel.MEMORY_AND_DISK)
                
        url_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            col("data.image_url_store"),
            normalize_image_url_menu_udf(col("data.image_url_menu")).alias("image_url_menu")
        ).persist(StorageLevel.MEMORY_AND_DISK)
        
        review_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            split_reviews_udf(ensure_array_udf(col("data.review_total_text"))).alias("review_total_text")
        ).persist(StorageLevel.MEMORY_AND_DISK)
        
        ugc_review_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            split_reviews_udf(ensure_array_udf(col("data.ugc_review_total_text"))).alias("ugc_review_total_text")
        ).persist(StorageLevel.MEMORY_AND_DISK)

        menu_detail_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            normalize_menu_detail_udf(col("data.menu_detail_information")).alias("menu_detail_information")
        ).persist(StorageLevel.MEMORY_AND_DISK)
        
        review_kakao_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            ensure_array_udf(col("data.rest_review_kakao")).alias("rest_review_kakao")
        ).persist(StorageLevel.MEMORY_AND_DISK)

        review_dining_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            ensure_array_udf(col("data.rest_review_dining")).alias("rest_review_dining")
        ).persist(StorageLevel.MEMORY_AND_DISK)

        review_google_df = restaurant_df.select(
            lit(key).alias("restaurant_id"),
            ensure_array_udf(col("data.rest_review_google")).alias("rest_review_google")
        ).persist(StorageLevel.MEMORY_AND_DISK)
        
        batch_info_dfs.append(info_df)
        batch_home_dfs.append(home_df)
        batch_url_dfs.append(url_df)
        batch_review_dfs.append(review_df)
        batch_ugc_review_dfs.append(ugc_review_df)
        batch_menu_detail_dfs.append(menu_detail_df)
        batch_review_kakao_dfs.append(review_kakao_df)
        batch_review_dining_dfs.append(review_dining_df)
        batch_review_google_dfs.append(review_google_df)
        
        # 첫 번째 레스토랑의 샘플 데이터 출력 (선택 사항)
        if key == batch_keys[0]:
            print(f"\n===== 배치 {batch_idx+1} 첫 번째 레스토랑({key}) 샘플 데이터 =====")
            info_df.show(3, truncate=False)
    
    # 각 배치 내에서 union한 후 바로 HDFS에 저장 (append 모드)
    if batch_info_dfs:
        batch_info_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_info_dfs)
        batch_info_df.write.mode("append").partitionBy("restaurant_id").parquet(final_info_path)
    if batch_home_dfs:
        batch_home_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_home_dfs)
        batch_home_df.write.mode("append").partitionBy("restaurant_id").parquet(final_home_path)
    if batch_url_dfs:
        batch_url_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_url_dfs)
        batch_url_df.write.mode("append").partitionBy("restaurant_id").parquet(final_url_path)
    if batch_review_dfs:
        batch_review_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_review_dfs)
        batch_review_df.write.mode("append").partitionBy("restaurant_id").parquet(final_review_path)
    if batch_ugc_review_dfs:
        batch_ugc_review_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_ugc_review_dfs)
        batch_ugc_review_df.write.mode("append").partitionBy("restaurant_id").parquet(final_ugc_review_path)
    if batch_menu_detail_dfs:
        batch_menu_detail_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_menu_detail_dfs)
        batch_menu_detail_df.write.mode("append").partitionBy("restaurant_id").parquet(final_menu_detail_path)
    if batch_review_kakao_dfs:
        batch_review_kakao_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_review_kakao_dfs)
        batch_review_kakao_df.write.mode("append").partitionBy("restaurant_id").parquet(final_review_kakao_path)
    if batch_review_dining_dfs:
        batch_review_dining_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_review_dining_dfs)
        batch_review_dining_df.write.mode("append").partitionBy("restaurant_id").parquet(final_review_dining_path)
    if batch_review_google_dfs:
        batch_review_google_df = reduce(lambda df1, df2: df1.unionByName(df2), batch_review_google_dfs)
        batch_review_google_df.write.mode("append").partitionBy("restaurant_id").parquet(final_review_google_path)
    
    # 배치 처리 완료 후 메모리 해제
    for df in (batch_info_dfs + batch_home_dfs + batch_url_dfs + batch_review_dfs +
               batch_ugc_review_dfs + batch_menu_detail_dfs + batch_review_kakao_dfs +
               batch_review_dining_dfs + batch_review_google_dfs):
        df.unpersist()
    spark.catalog.clearCache()
    print(f"배치 {batch_idx+1} 처리 완료")

print("데이터 처리 및 저장 완료")
spark.stop()
