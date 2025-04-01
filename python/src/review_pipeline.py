from pipeline.pipeline import Pipeline
from db.database import PostgresImporter
import time
import os
from collections import Counter
import json
import re
import subprocess

# 처리할 레스토랑 ID 범위
start_id = 9
end_id = 9

# 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
restaurant_ids = range(start_id, end_id + 1)  # 1부터 10까지
# restaurant_ids = [2, 5, 10, 15, 20]  # 특정 ID만 처리하려면 이렇게 리스트로 지정

# 실행 모드 설정
extract_mode = True  # True: HDFS에서 리뷰 추출, False: 저장된 파일에서 DB 저장

# 저장할 데이터 제한 설정
MAX_KEYWORDS = 5  # 상위 5개 키워드만 저장
MAX_REVIEWS = 3  # 각 키워드당 최대 3개 리뷰만 저장

# 데이터 정제를 위한 파이프라인 생성
pipeline = Pipeline()

# Ollama 처리를 위한 시스템 프롬프트 - 일반 리뷰용
system_prompt_naver = '''
  항상 한국어로 대답 부탁드립니다.
  다음 리뷰 데이터를 분석하여 표준화된 JSON 형식으로 변환해주세요.

  ### 작업 내용:
  1. 각 리뷰에서 의미 있는 키워드를 하나만 추출하세요. 여러 키워드가 있더라도 가장 중요한 하나만 선택해야 합니다.

  2. 리뷰 내용에서 음식이름(메뉴명)이 언급되면 무조건 해당 메뉴명을 키워드로 선택하세요. 예를 들어:
     - "김치찌개가 맛있어요" → 키워드: "김치찌개"

  3. 메뉴명이 여러 개 나온다면 가장 먼저 언급된 메뉴나 가장 강조된 메뉴를 키워드로 선택하세요.

  4. 비슷한 키워드는 다음과 같이 표준화하세요(메뉴명은 그대로 유지):
     - '맛', '맛있는', '맛나' → '맛있음'
     - '가성비', '저렴', '싸다' → '가성비'
     - '친절', '친절한' → '친절함'
     - '깔끔', '청결' → '깔끔함'
     - '양 많음', '푸짐' → '양많음'
     - '혼밥', '혼밥하기좋아함' → '혼밥'
     - '신선함', '신선한' → '신선함'

  5. 각 리뷰 객체는 다음과 같은 형식으로 개별 JSON 객체로 출력하세요:
    반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
    다른 언어로 설명을 추가하지 마세요.
  {
    "content": "리뷰 내용",
    "keyword": "키워드",
    "source": "naver"
  }

  6. 각 JSON 객체는 서로 분리되어야 합니다. 대괄호([])로 묶지 마세요.

'''

# Ollama 처리를 위한 시스템 프롬프트 - 블로그 리뷰용
system_prompt_blog = '''
  항상 한국어로 대답 부탁드립니다.
  다음 리뷰 데이터를 분석하여 표준화된 JSON 형식으로 변환해주세요.

  ### 작업 내용:
  1. 각 리뷰에서 의미 있는 키워드를 하나만 추출하세요. 여러 키워드가 있더라도 가장 중요한 하나만 선택해야 합니다.

  2. 리뷰 내용에서 메뉴이름이 언급되면 무조건 해당 메뉴명을 키워드로 선택하세요. 예를 들어:
     - "김치찌개가 맛있어요" → 키워드: "김치찌개"

  3. 메뉴명이 여러 개 나온다면 가장 먼저 언급된 메뉴나 가장 강조된 메뉴를 키워드로 선택하세요.

  4. 비슷한 키워드는 다음과 같이 표준화하세요(메뉴명은 그대로 유지):
     - '맛', '맛있는', '맛나' → '맛있음'
     - '가성비', '저렴', '싸다' → '가성비'
     - '친절', '친절한' → '친절함'
     - '깔끔', '청결' → '깔끔함'
     - '양 많음', '푸짐' → '양많음'
     - '혼밥', '혼밥하기좋아함' → '혼밥'
     - '신선함', '신선한' → '신선함'


  5. 각 리뷰 객체는 다음과 같은 형식으로 개별 JSON 객체로 출력하세요:
    반드시 순수한 JSON만 반환해주시고, 마크다운이나 추가 설명을 포함하지 마세요.
    다른 언어로 설명을 추가하지 마세요.
  {
    "content": "리뷰 내용",
    "keyword": "키워드",
    "source": "blog"
  }

  6. 각 JSON 객체는 서로 분리되어야 합니다. 대괄호([])로 묶지 마세요.

'''


# 파일에서 JSON 객체 파싱하는 함수
def parse_json_objects(file_content):
  # 중괄호로 둘러싸인 JSON 객체 패턴
  pattern = r'(\{[^{}]*\})'

  # 모든 JSON 객체 찾기
  json_objects = re.findall(pattern, file_content)

  # 각 객체 파싱
  reviews = []
  for obj_str in json_objects:
    try:
      review = json.loads(obj_str)
      # 'keyword' 또는 'keywords' 필드 통일
      if 'keywords' in review and not 'keyword' in review:
        review['keyword'] = review['keywords']
      # source 필드가 없는 경우 기본값 'naver' 설정 (기존 데이터 호환성)
      if 'source' not in review:
        review['source'] = 'naver'
      reviews.append(review)
    except json.JSONDecodeError:
      print(f"잘못된 JSON 형식: {obj_str}")

  return reviews


# 블로그 리뷰 디렉토리 목록 가져오기
def get_blog_author_directories(base_dir):
  """
  블로그 리뷰 내의 author 서브디렉토리 목록을 가져옵니다.

  Args:
      base_dir (str): 기본 디렉토리 경로 (/user/hadoop/big_final_rest_ugc_review_json/restaurant_id=X)

  Returns:
      list: author 디렉토리 전체 경로 목록
  """
  try:
    # HDFS에서 디렉토리 목록 가져오기
    cmd = f"hadoop fs -ls {base_dir}"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

    directories = []
    if result.returncode == 0:
      # 출력 파싱
      lines = result.stdout.strip().split('\n')
      for line in lines:
        if 'author=' in line:
          # 디렉토리 경로 추출
          parts = line.split()
          if len(parts) >= 8:
            dir_path = parts[-1]  # 마지막 필드가 경로
            directories.append(dir_path)

    return directories

  except Exception as e:
    print(f"블로그 author 디렉토리 목록 가져오기 실패: {e}")
    return []


# 리뷰 제한 함수 - 키워드별 통합 카운트, 소스 정보 유지
def limit_reviews_by_keywords(reviews, max_keywords=5,
    max_reviews_per_keyword=3):
  """
  키워드별로 리뷰를 제한하고 전체 키워드 카운트 유지

  Args:
      reviews (list): 모든 리뷰 목록
      max_keywords (int): 저장할 최대 키워드 수
      max_reviews_per_keyword (int): 각 키워드당 저장할 최대 리뷰 수

  Returns:
      tuple: (제한된 리뷰 목록, 키워드 카운트, 선택된 키워드 목록)
  """
  # 키워드 카운트 (소스 구분 없이)
  keyword_counts = Counter()
  for review in reviews:
    keyword = review.get("keyword", "")
    if keyword:
      keyword_counts[keyword] += 1

  # 상위 N개 키워드 선택
  top_keywords = [k for k, v in keyword_counts.most_common(max_keywords)]

  # 키워드별 리뷰 제한 (소스별로 분리)
  limited_reviews = []
  keyword_review_counts = {
    'naver': {k: 0 for k in top_keywords},
    'blog': {k: 0 for k in top_keywords}
  }

  for review in reviews:
    keyword = review.get("keyword", "")
    source = review.get("source", "naver")

    # 상위 키워드에 포함되고, 해당 키워드/소스의 리뷰 수가 제한을 넘지 않았는지 확인
    if keyword in top_keywords and keyword_review_counts[source][
      keyword] < max_reviews_per_keyword:
      limited_reviews.append(review)
      keyword_review_counts[source][keyword] += 1

  return limited_reviews, keyword_counts, top_keywords


# DB 저장 함수 - 소스 정보만 추가
def save_limited_reviews_with_source(importer, limited_reviews, keyword_counts,
    top_keywords, store_id):
  """
  제한된 리뷰만 저장하되 전체 키워드 카운트 정보는 유지하며 소스 정보만 리뷰에 추가

  Args:
      importer: PostgresImporter 인스턴스
      limited_reviews (list): 제한된 리뷰 목록
      keyword_counts (Counter): 전체 키워드 카운트
      top_keywords (list): 선택된 상위 키워드 목록
      store_id (str): 레스토랑 ID

  Returns:
      dict: 처리 결과
  """
  try:
    # 1. 선택된 상위 키워드만 DB에 저장 (기존과 동일)
    keyword_id_map = {}
    for keyword in top_keywords:
      count = keyword_counts[keyword]
      keyword_id = importer._save_keyword(keyword, count, store_id)
      keyword_id_map[keyword] = keyword_id

    # 2. 제한된 리뷰-키워드 관계만 저장 (소스 정보 포함)
    for review in limited_reviews:
      content = review.get("content", "")
      keyword = review.get("keyword", "")
      source = review.get("source", "naver")  # 소스 정보

      if keyword and keyword in keyword_id_map and content:
        importer._save_review_keyword_relation_with_source(content,
                                                           keyword_id_map[
                                                             keyword], source)

    # 트랜잭션 커밋
    importer.conn.commit()

    # 소스별 통계 정보
    naver_total = sum(1 for r in limited_reviews if r.get("source") == "naver")
    blog_total = sum(1 for r in limited_reviews if r.get("source") == "blog")

    return {
      "success": True,
      "total_reviews": len(limited_reviews),
      "naver_reviews": naver_total,
      "blog_reviews": blog_total,
      "unique_keywords": len(top_keywords),
      "keyword_counts": {k: keyword_counts[k] for k in top_keywords}
    }

  except Exception as e:
    importer.conn.rollback()
    print(f"❌ 키워드 처리 중 오류 발생: {e}")
    return {
      "success": False,
      "error": str(e)
    }


# 블로그 리뷰 처리 함수
def process_blog_reviews(restaurant_id):
  """
  블로그 리뷰 처리 - author 디렉토리 구조 고려

  Args:
      restaurant_id (str): 레스토랑 ID

  Returns:
      dict: 처리 결과
  """
  # 블로그 베이스 디렉토리
  blog_base_dir = f"/user/hadoop/big_final_rest_ugc_review_json/restaurant_id={restaurant_id}"

  # author 디렉토리 목록 가져오기
  author_dirs = get_blog_author_directories(blog_base_dir)

  if not author_dirs:
    print(f"❌ 블로그 리뷰 author 디렉토리를 찾을 수 없습니다: {blog_base_dir}")
    return {"success": False, "error": "author 디렉토리 없음", "content": ""}

  # 각 author 디렉토리에서 리뷰 추출 후 합치기
  all_content = ""
  success = False

  print(f"블로그 리뷰 - 총 {len(author_dirs)}개 author 디렉토리 처리 중...")

  for author_dir in author_dirs:
    print(f"  - {author_dir} 처리 중...")

    # 해당 author 디렉토리 리뷰 처리
    result = pipeline.process_directory(
        hdfs_directory=author_dir,
        system_prompt=system_prompt_blog
    )

    if result["success"]:
      all_content += result["content"] + "\n"
      success = True
    else:
      print(f"    ❌ 처리 실패: {result.get('error', '알 수 없는 오류')}")

  return {
    "success": success,
    "content": all_content
  }


# 전체 레스토랑 처리 시작
print(f"=== 총 {len(restaurant_ids)}개 레스토랑의 리뷰 처리 시작 ===")
print(f"실행 모드: {'키워드 추출' if extract_mode else 'DB 저장'}")
total_start_time = time.time()

for idx, restaurant_id in enumerate(restaurant_ids, 1):
  restaurant_id = str(restaurant_id)  # ID를 문자열로 변환
  print(f"\n[{idx}/{len(restaurant_ids)}] 레스토랑 ID {restaurant_id} 처리 시작")
  start_time = time.time()

  # 결과 파일 경로 (소스별로 구분)
  naver_output_file = f"/keyword/restaurant_{restaurant_id}_naver_review_keywords.txt"
  blog_output_file = f"/keyword/restaurant_{restaurant_id}_blog_review_keywords.txt"
  combined_output_file = f"/keyword/restaurant_{restaurant_id}_all_review_keywords.txt"

  if extract_mode:
    # 1단계: HDFS에서 리뷰 데이터 추출하여 파일로 저장
    try:
      # 일반 리뷰 처리
      naver_review_dir = f"/user/hadoop/big_final_rest_review_json/restaurant_id={restaurant_id}"
      print(f"1-1단계: HDFS에서 일반 리뷰 데이터 가져와 키워드 추출 중...")
      naver_result = pipeline.process_directory(
          hdfs_directory=naver_review_dir,
          system_prompt=system_prompt_naver
      )

      # 블로그 리뷰 처리 - author 디렉토리 구조 고려
      print(f"1-2단계: HDFS에서 블로그 리뷰 데이터 가져와 키워드 추출 중...")
      blog_result = process_blog_reviews(restaurant_id)

      # 일반 리뷰 결과 저장
      if naver_result["success"]:
        with open(naver_output_file, "w", encoding="utf-8") as f:
          f.write(naver_result["content"])
        print(f"✅ 일반 리뷰 결과가 {naver_output_file} 파일에 저장되었습니다.")
      else:
        print(f"❌ 일반 리뷰 파이프라인 처리 실패: {naver_result.get('error', '알 수 없는 오류')}")

      # 블로그 리뷰 결과 저장
      if blog_result["success"]:
        with open(blog_output_file, "w", encoding="utf-8") as f:
          f.write(blog_result["content"])
        print(f"✅ 블로그 리뷰 결과가 {blog_output_file} 파일에 저장되었습니다.")
      else:
        print(f"❌ 블로그 리뷰 파이프라인 처리 실패: {blog_result.get('error', '알 수 없는 오류')}")

      # 두 결과 합치기
      if naver_result["success"] or blog_result["success"]:
        combined_content = ""
        if naver_result["success"]:
          combined_content += naver_result["content"] + "\n"
        if blog_result["success"]:
          combined_content += blog_result["content"]

        with open(combined_output_file, "w", encoding="utf-8") as f:
          f.write(combined_content)
        print(f"✅ 통합 결과가 {combined_output_file} 파일에 저장되었습니다.")

    except Exception as e:
      print(f"❌ 레스토랑 ID {restaurant_id} 처리 중 오류 발생: {str(e)}")

    # 2단계: 저장된 파일에서 데이터를 읽어 DB에 저장
  try:
    # 통합 파일 존재 여부 확인
    if not os.path.exists(combined_output_file):
      print(f"❌ 파일을 찾을 수 없습니다: {combined_output_file}")
      continue

    # 파일 내용 읽기
    with open(combined_output_file, "r", encoding="utf-8") as f:
      file_content = f.read()

    # JSON 객체 파싱
    all_reviews = parse_json_objects(file_content)

    if not all_reviews:
      print(f"❌ 파싱된 리뷰가 없습니다")
      continue

    # 소스별 리뷰 카운트
    naver_reviews = sum(1 for r in all_reviews if r.get("source") == "naver")
    blog_reviews = sum(1 for r in all_reviews if r.get("source") == "blog")

    print(
        f"총 {len(all_reviews)}개 리뷰 (일반: {naver_reviews}개, 블로그: {blog_reviews}개)")

    # 리뷰 제한 (각 키워드당 최대 3개, 상위 5개 키워드만)
    limited_reviews, keyword_counts, top_keywords = limit_reviews_by_keywords(
        all_reviews, MAX_KEYWORDS, MAX_REVIEWS)

    print(
        f"2단계: 키워드 데이터 DB에 저장 중... (전체 {len(all_reviews)}개 중 {len(limited_reviews)}개 리뷰 선택)")

    # DB 저장
    db = PostgresImporter()

    try:
      # 커스텀 함수로 제한된 리뷰와 전체 카운트 저장
      db_result = save_limited_reviews_with_source(
          db, limited_reviews, keyword_counts, top_keywords, restaurant_id)

      if db_result["success"]:
        print(
            f"✅ DB 저장 완료: {db_result['total_reviews']} 리뷰 (일반: {db_result['naver_reviews']}개, 블로그: {db_result['blog_reviews']}개), {db_result['unique_keywords']} 고유 키워드")

        # 상위 키워드 출력 (소스별 카운트)
        print("\n🔑 주요 키워드:")
        for keyword in top_keywords:
          count = keyword_counts[keyword]
          print(f"  - {keyword}: {count}회")
      else:
        print(f"❌ DB 저장 실패: {db_result.get('error', '알 수 없는 오류')}")
    finally:
      db.close()

  except Exception as e:
    print(f"❌ 파일 처리 중 오류 발생: {str(e)}")

  # 처리 시간 출력
  end_time = time.time()
  elapsed_time = end_time - start_time
  print(f"레스토랑 ID {restaurant_id} 처리 완료 (소요 시간: {elapsed_time:.2f}초)")

# 전체 처리 완료
total_elapsed_time = time.time() - total_start_time
print(f"\n=== 전체 처리 완료 (총 소요 시간: {total_elapsed_time:.2f}초) ===")
