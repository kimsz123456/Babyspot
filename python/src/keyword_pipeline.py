import json
import os
from src.hadoop.hdfs_client import HDFSClient
from src.keyword.analysis import KeywordAnalyzer
from dotenv import load_dotenv
from db.database import \
  PostgresImporter  # database.py에서 PostgresImporter 클래스 임포트

# .env 파일 로드
load_dotenv()


def main(restaurant_ids=None):
  """
  HDFS에서 JSON 파일을 읽어 키워드 분석을 실행하고 결과를 데이터베이스에 저장하는 메인 함수

  Args:
      restaurant_ids (list, range, optional): 처리할 레스토랑 ID 목록. 기본값은 None (이 경우 ID 1만 처리)
  """
  # HDFS 클라이언트 초기화
  try:
    hdfs_client = HDFSClient()
    print("✅ HDFS 클라이언트 초기화 성공")
  except ValueError as e:
    print(f"❌ HDFS 클라이언트 초기화 실패: {e}")
    return

  # 키워드 분석기 초기화
  analyzer = KeywordAnalyzer()
  print("✅ 키워드 분석기 초기화 성공")

  # 데이터베이스 연결 초기화
  try:
    db_importer = PostgresImporter()
    print("✅ 데이터베이스 클라이언트 초기화 성공")
  except Exception as e:
    print(f"❌ 데이터베이스 연결 실패: {e}")
    return

  # restaurant_ids가 숫자 하나인 경우(정수) 리스트로 변환
  if isinstance(restaurant_ids, int):
    restaurant_ids = [restaurant_ids]

  # 각 레스토랑 ID에 대해 처리 실행
  for restaurant_id in restaurant_ids:
    # ID를 문자열로 변환
    restaurant_id_str = str(restaurant_id)
    print(f"\n{'=' * 50}")
    print(f"🍽️ 레스토랑 ID: {restaurant_id_str} 처리 시작")
    print(f"{'=' * 50}")

    # HDFS 디렉토리 경로 설정 (레스토랑 리뷰와 블로그 리뷰)
    hdfs_directories = [
      f"/user/hadoop/big_final_rest_review_json2/restaurant_id={restaurant_id_str}",
      f"/user/hadoop/big_final_rest_ugc_review_json2/restaurant_id={restaurant_id_str}"
    ]

    all_processed_reviews = []

    # 디렉토리별 처리
    for hdfs_directory in hdfs_directories:
      # 리뷰 소스 타입 식별 (블로그 리뷰 또는 일반 리뷰)
      is_blog_review = "ugc_review" in hdfs_directory
      review_source = "블로그" if is_blog_review else "플레이스"
      print(f"📂 {review_source} 리뷰 디렉토리 처리 시작: {hdfs_directory}")

      # 디렉토리별 처리된 리뷰 카운트 변수 초기화
      directory_processed_reviews = []

      try:
        # 모든 JSON 파일 재귀적으로 가져오기
        json_files = hdfs_client.get_all_json_files(hdfs_directory)

        if not json_files:
          print(f"❌ 디렉토리 '{hdfs_directory}'에 JSON 파일이 없습니다.")
          continue

        # 각 JSON 파일 처리
        for file_path in json_files:
          print(f"🔍 파일 처리 중: {file_path}")

          try:
            # HDFS에서 JSON 파일 읽기
            json_content = hdfs_client.read_file(file_path)

            # JSON 파싱 (라인 단위 또는 전체 JSON 객체)
            try:
              # 전체 JSON 객체 형식 처리 시도
              data = json.loads(json_content)

              # processed_review 필드에서 리뷰 텍스트 추출
              if "processed_review" in data:
                reviews = analyzer.extract_reviews(data["processed_review"])
                print(f"📊 총 {len(reviews)}개의 리뷰를 추출했습니다.")
              else:
                # review_total_text 필드가 없는 경우 일반 JSON 처리
                reviews = []
                if isinstance(data, list):
                  reviews = data
                elif isinstance(data, dict) and 'reviews' in data:
                  reviews = data['reviews']
                else:
                  reviews = [data]  # 단일 리뷰인 경우

            except json.JSONDecodeError:
              # JSON 파싱 실패시 라인 단위 처리 시도
              print("⚠️ JSON 파싱 실패, 라인 단위로 처리를 시도합니다.")
              reviews = []
              for line in json_content.strip().split('\n'):
                if line.strip():
                  try:
                    review = json.loads(line)
                    reviews.append(review)
                  except json.JSONDecodeError:
                    continue

            print(f"📊 총 {len(reviews)}개의 리뷰를 파싱했습니다.")

            # 리뷰에 'content' 필드가 없는 경우 처리
            valid_reviews = []
            for review in reviews:
              if isinstance(review, dict):
                # 'content' 필드가 없으면 'text' 또는 'review_text' 필드 찾기
                if 'content' not in review:
                  for field in ['text', 'review_text', 'review', 'comment']:
                    if field in review:
                      review['content'] = review[field]
                      break

                # 여전히 'content' 필드가 없으면 건너뛰기
                if 'content' in review:
                  # 리뷰 소스 정보 추가
                  review['source'] = review_source
                  valid_reviews.append(review)

            # 키워드 분석 실행
            processed_reviews = analyzer.process_reviews(valid_reviews)
            directory_processed_reviews.extend(processed_reviews)
            all_processed_reviews.extend(processed_reviews)

          except Exception as e:
            print(f"❌ 파일 처리 중 오류 발생: {e}")
            continue

        # 디렉토리별 처리된 리뷰 수 출력
        review_count = len(directory_processed_reviews)
        print(
            f"📊 디렉토리 '{hdfs_directory}'에서 처리된 {review_source} 리뷰 수: {review_count}")

        if is_blog_review:
          blog_review_count = review_count
          print(f"📝 블로그 리뷰 처리 수: {blog_review_count}")
        else:
          normal_review_count = review_count
          print(f"📝 네이버 리뷰 처리 수: {normal_review_count}")

      except Exception as e:
        print(f"❌ 디렉토리 처리 중 오류 발생: {e}")

    if all_processed_reviews:
      # 모든 처리된 리뷰에 대한 분석 실행
      print(f"📊 총 {len(all_processed_reviews)}개의 리뷰를 분석합니다...")

      # 소스별 리뷰 수 출력
      blog_reviews = [r for r in all_processed_reviews if
                      r.get('source') == '블로그']
      normal_reviews = [r for r in all_processed_reviews if
                        r.get('source') == '플레이스']
      print(f"📊 네이버 리뷰 수: {len(normal_reviews)}")
      print(f"📊 블로그 리뷰 수: {len(blog_reviews)}")

      # 상위 5개 키워드만 분석하도록 설정
      top_n = 5
      reviews_per_keyword = 20  # 각 키워드당 최대 20개 리뷰

      analysis_results = analyzer.analyze_reviews(
          all_processed_reviews,
          top_n=top_n,
          reviews_per_keyword=reviews_per_keyword
      )

      # 보고서 생성
      report = analyzer.generate_report(analysis_results)

      # 결과 출력
      print("\n===== 분석 결과 =====")
      print(f"총 리뷰 수: {report['summary']['total_reviews']}")

      print("\n===== 상위 키워드 =====")
      for keyword, count in report['summary']['top_keywords']:
        print(f"'{keyword}': {count}회")

      print("\n===== 키워드별 샘플 리뷰 =====")
      for keyword, data in report['keyword_analysis'].items():
        print(f"\n## '{keyword}' ({data['count']}회) ##")
        for i, review in enumerate(data['sample_reviews']):
          print(f"{i + 1}. {review[:100]}..." if len(
              review) > 100 else f"{i + 1}. {review}")

      # 결과를 로컬 텍스트 파일로 저장
      output_directory = "results"

      # 결과 디렉토리가 없으면 생성
      if not os.path.exists(output_directory):
        os.makedirs(output_directory)

      # 레스토랑 ID로 파일명 생성
      result_filename = f"{output_directory}/restaurant_{restaurant_id_str}_keywords.txt"

      try:
        # 결과를 로컬 텍스트 파일로 저장
        with open(result_filename, 'w', encoding='utf-8') as f:
          f.write(f"===== 분석 결과 =====\n")
          f.write(f"레스토랑 ID: {restaurant_id_str}\n")
          f.write(f"총 리뷰 수: {analysis_results['total_reviews']}\n\n")

          f.write(f"===== 상위 {top_n}개 키워드 =====\n")
          for keyword, count in analysis_results['top_keywords']:
            f.write(f"'{keyword}': {count}회\n")

          f.write("\n===== 키워드별 리뷰 (최대 20개) =====\n")
          for keyword, data in analysis_results['keyword_reviews'].items():
            f.write(f"\n## '{keyword}' ({data['count']}회) ##\n")
            for i, review in enumerate(data['reviews'], 1):
              if i > 20:  # 최대 20개 리뷰만 표시
                break
              content = review['content']
              source = review.get('source', '플레이스')  # 기본값은 '플레이스'로 설정
              shortened_content = content[:100] + "..." if len(
                  content) > 100 else content
              f.write(f"{i}. [{source}] {shortened_content}\n")

        print(f"✅ 분석 결과가 텍스트 파일로 저장되었습니다: {result_filename}")

        # JSON 형식으로 키워드 분석 결과 저장
        # 키워드 배열 형태로 저장
        keywords_array = []
        for keyword, count in analysis_results['top_keywords']:
          keyword_obj = {
            'keyword': keyword,
            'count': count,
            'reviews': []
          }

          # 각 키워드별 리뷰 추가 (최대 20개)
          for review in analysis_results['keyword_reviews'].get(keyword,
                                                                {}).get(
              'reviews', [])[:20]:
            content = review.get('content', '')
            source = review.get('source', '플레이스')

            review_obj = {
              'content': content,
              'source': source
            }
            keyword_obj['reviews'].append(review_obj)

          keywords_array.append(keyword_obj)

        json_filename = f"{output_directory}/restaurant_{restaurant_id_str}_keywords.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
          json.dump(keywords_array, f, ensure_ascii=False, indent=2)
        print(f"✅ JSON 형식의 키워드 분석 결과가 저장되었습니다: {json_filename}")

        # 데이터베이스에 결과 저장
        save_keyword_results_to_db(db_importer, restaurant_id_str,
                                   analysis_results)

      except Exception as e:
        print(f"❌ 결과 저장 중 오류 발생: {e}")
    else:
      print(f"❌ 레스토랑 ID {restaurant_id_str}에 대한 분석할 유효한 리뷰가 없습니다.")

  # 데이터베이스 연결 종료
  db_importer.close()


def save_keyword_results_to_db(db_importer, restaurant_id, analysis_results):
  """
  키워드 분석 결과를 데이터베이스에 저장합니다.

  Args:
      db_importer (PostgresImporter): 데이터베이스 연결 객체
      restaurant_id (str): 레스토랑 ID
      analysis_results (dict): 키워드 분석 결과
  """
  try:
    print(f"\n===== 데이터베이스에 키워드 및 리뷰 저장 =====")

    # 1. store_keyword 테이블에 키워드 저장
    keyword_id_map = {}  # 키워드와 DB에 저장된 ID 매핑을 저장할 사전

    # 상위 키워드 처리
    for idx, (keyword, count) in enumerate(analysis_results['top_keywords'], 1):
      # 키워드 저장 및 생성된 ID 가져오기
      keyword_id = db_importer._save_keyword(keyword, count, restaurant_id)
      keyword_id_map[keyword] = keyword_id
      print(
          f"✅ 키워드 '{keyword}' (빈도: {count})가 store_keyword 테이블에 저장되었습니다. ID: {keyword_id}")

    # 2. 각 키워드별 리뷰를 keyword_review 테이블에 저장
    review_count = 0
    for keyword, data in analysis_results['keyword_reviews'].items():
      # 키워드에 해당하는 ID 가져오기
      keyword_id = keyword_id_map.get(keyword)
      if not keyword_id:
        print(f"⚠️ 키워드 '{keyword}'의 ID를 찾을 수 없습니다.")
        continue

      # 각 리뷰를 저장 (최대 20개)
      for review in data['reviews'][:20]:
        content = review.get('content', '')
        # 소스 정보 확인
        source = review.get('source', '플레이스')

        # 리뷰 저장
        relation_id = db_importer._save_review_keyword_relation_with_source(
            content, keyword_id, source)
        if relation_id > 0:
          review_count += 1

    print(f"✅ 총 {review_count}개의 리뷰가 keyword_review 테이블에 저장되었습니다.")
    return True

  except Exception as e:
    print(f"❌ 데이터베이스 저장 중 오류 발생: {e}")
    return False


if __name__ == "__main__":
  # 처리할 레스토랑 ID 범위 설정
  start_id = 1
  end_id = 1

  # 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
  restaurant_ids = range(start_id, end_id + 1)  # start_id부터 end_id까지 처리
  # restaurant_ids = [2, 5, 10, 15, 20]  # 특정 ID만 처리하려면 이렇게 리스트로 지정

  # 설정된 레스토랑 ID로 처리 실행
  main(restaurant_ids)