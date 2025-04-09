import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, coalesce, lit, udf, size
from pyspark.sql.types import ArrayType, StringType

# --- UDF 정의 ---
def parse_home_information(text):
    if text is None:
        result = {"주소": "", "찾아가는길": "", "영업시간": "", "전화번호": ""}
        return json.dumps(result, ensure_ascii=False)
    if isinstance(text, list):
        text = "\n".join(text)
    keys = ["주소", "찾아가는길", "영업시간", "전화번호"]
    found_any = False
    result = {}
    for i, key in enumerate(keys):
        start = text.find(key)
        if start == -1:
            result[key] = ""
        else:
            found_any = True
            start += len(key)
            end = len(text)
            for next_key in keys[i+1:]:
                next_index = text.find(next_key, start)
                if next_index != -1:
                    end = next_index
                    break
            result[key] = text[start:end].strip()
    if not found_any:
        return text
    else:
        return json.dumps(result, ensure_ascii=False)

parse_home_information_udf = udf(parse_home_information, StringType())

def split_blog_reviews(text):
    if text is None:
        return []
    reviews = []
    if isinstance(text, list):
        for element in text:
            element = element.strip()
            if element:
                lines = element.split("\n", 1)
                if len(lines) > 1:
                    author = lines[0].strip()
                    review_text = lines[1].strip()
                else:
                    author = lines[0].strip()
                    review_text = ""
                reviews.append(author + "|||" + review_text)
    else:
        text = text.strip()
        if text:
            lines = text.split("\n", 1)
            if len(lines) > 1:
                author = lines[0].strip()
                review_text = lines[1].strip()
            else:
                author = lines[0].strip()
                review_text = ""
            reviews.append(author + "|||" + review_text)
    return reviews

split_blog_reviews_udf = udf(split_blog_reviews, ArrayType(StringType()))

def process_review_text(text):
    if text is None:
        return ""
    if isinstance(text, list):
        text = "\n".join(text)
    parts = text.split("\n")
    if len(parts) >= 5:
        return "\n".join(parts[4:])
    else:
        return text

process_review_text_udf = udf(process_review_text, StringType())

def filter_child_reviews(reviews):
    if reviews is None:
        return []
    filtered = []
    for review in reviews:
        if review is None:
            continue
        for keyword in [
            "아이", "아기", "애", "어린이", "유아", "영아", "꼬마", "미취학아", "유치원생", "키즈", "기저귀", 
            "장난감", "포크", "신생아", "영유아", "꼬맹이", "작은아이", "애기", "유모차", "유아용식기", 
            "유아의자", "유아용품", "유아침대", "유아카시트", "아기옷", "아기수유용품", "유아장난감", "아기용품", 
            "유아신발", "아기침구", "유아가구", "영유아용품", "영유아돌봄", "놀이방", "놀이공간", "어린이집", 
            "키즈카페", "아동놀이터", "실내놀이터", "어린이도서관", "어린이박물관", "어린이미술관", "체험학습",
            "유아교육", "아이방", "유아놀이터", "키즈존", "놀이시설", "어린이공간"
        ]:
            if keyword in review:
                filtered.append(review)
                break
    return filtered

filter_child_reviews_udf = udf(filter_child_reviews, ArrayType(StringType()))

# --- Spark 세션 생성 ---
spark = SparkSession.builder.appName("SumDataProcessing").getOrCreate()
base_path = "hdfs:///user/hadoop/"

# --- 데이터 읽기 ---
rest_info_df = spark.read.parquet(base_path + "add_big_rest_info")
rest_home_df = spark.read.parquet(base_path + "add_big_rest_home_information")
rest_url_df = spark.read.parquet(base_path + "add_big_rest_url")
rest_review_df = spark.read.parquet(base_path + "add_big_rest_review")
rest_ugc_review_df = spark.read.parquet(base_path + "add_big_rest_ugc_review")
rest_menu_detail_df = spark.read.parquet(base_path + "add_big_rest_menu_detail_information")
rest_review_kakao_df = spark.read.parquet(base_path + "add_big_rest_kakao_review")
rest_review_dining_df = spark.read.parquet(base_path + "add_big_rest_dining_review")
rest_review_google_df = spark.read.parquet(base_path + "add_big_rest_google_review")

# --- home_information 파싱 ---
rest_home_df = rest_home_df.withColumn("home_information", parse_home_information_udf(col("home_information")))

# --- rest_info에 store_kakao_id 포함 ---
if "store_kakao_id" not in rest_info_df.columns:
    rest_info_df = rest_info_df.withColumn("store_kakao_id", lit(""))

# --- 데이터 저장 ---
rest_info_output = base_path + "add_big_final_rest_info_json"
rest_info_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_info_output)
print(f"rest_info 데이터 저장 완료: {rest_info_output}")

rest_home_output = base_path + "add_big_final_rest_home_information_json"
rest_home_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_home_output)
print(f"rest_home_information 데이터 저장 완료: {rest_home_output}")

rest_url_output = base_path + "add_big_final_rest_url_json"
rest_url_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_url_output)
print(f"rest_url 데이터 저장 완료: {rest_url_output}")

processed_review_df = rest_review_df.withColumn("processed_review", process_review_text_udf(col("review_total_text")))
rest_review_output = base_path + "add_big_final_rest_review_json"
processed_review_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_review_output)
print(f"rest_review 데이터 저장 완료: {rest_review_output}")

child_related_review_df = rest_review_df.withColumn("child_related_review", filter_child_reviews_udf(col("review_total_text"))) \
    .filter((col("child_related_review").isNotNull()) & (size(col("child_related_review")) > 0)) \
    .select("restaurant_id", "child_related_review") \
    .repartition("restaurant_id")

child_review_output = base_path + "add_big_final_child_related_review_json"
child_related_review_df.write.mode("overwrite").partitionBy("restaurant_id").json(child_review_output)
print(f"child 관련 리뷰 데이터 저장 완료: {child_review_output}")

all_ids_df = rest_info_df.select("restaurant_id").distinct()
ugc_review_full = all_ids_df.join(
    rest_ugc_review_df, on="restaurant_id", how="left"
).withColumn(
    "ugc_review_total_text",
    coalesce(col("ugc_review_total_text"), lit([]).cast("array<string>"))
)

ugc_exploded = ugc_review_full.select("restaurant_id", explode(col("ugc_review_total_text")).alias("review_raw"))
ugc_split = ugc_exploded.withColumn("review_parts", split_blog_reviews_udf(col("review_raw")))
ugc_exploded_parts = ugc_split.select("restaurant_id", explode(col("review_parts")).alias("review_combined"))
ugc_final = ugc_exploded_parts.withColumn("author", split(col("review_combined"), "\|\|\|").getItem(0)) \
    .withColumn("review_text", split(col("review_combined"), "\|\|\|").getItem(1))

rest_ugc_review_output = base_path + "add_big_final_rest_ugc_review_json"
ugc_final.write.mode("overwrite").partitionBy("restaurant_id", "author").json(rest_ugc_review_output)
print(f"rest_ugc_review 데이터 저장 완료: {rest_ugc_review_output}")

rest_menu_detail_output = base_path + "add_big_final_rest_menu_detail_information_json"
rest_menu_detail_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_menu_detail_output)
print(f"rest_menu_detail_information 데이터 저장 완료: {rest_menu_detail_output}")

# --- 카카오 리뷰 별도 저장 (rest_review_kakao) ---
rest_review_kakao_output = base_path + "add_big_final_rest_review_kakao_json"
rest_review_kakao_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_review_kakao_output)
print(f"rest_review_kakao 데이터 저장 완료: {rest_review_kakao_output}")

rest_review_google_output = base_path + "add_big_final_rest_review_google_json"
rest_review_google_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_review_google_output)
print(f"rest_review_google 데이터 저장 완료: {rest_review_google_output}")

rest_review_dining_output = base_path + "add_big_final_rest_review_dining_json"
rest_review_dining_df.write.mode("overwrite").partitionBy("restaurant_id").json(rest_review_dining_output)
print(f"rest_review_dining 데이터 저장 완료: {rest_review_dining_output}")
spark.stop()
