import json
import os
from src.hadoop.hdfs_client import HDFSClient
from src.keyword.analysis import KeywordAnalyzer
from dotenv import load_dotenv
from db.database import PostgresImporter
import re

# .env 파일 로드
load_dotenv()

# 음식 관련 키워드 사전 (필요에 따라 확장 가능)
FOOD_KEYWORDS = {
  # 기본 음식 카테고리
  '음식', '요리', '맛', '식감', '풍미', '향', '식사', '메뉴', '요리법',

  # 맛 관련 표현
  '매콤', '달콤', '짭짤', '고소', '신선', '부드러운', '쫄깃', '담백', '짜다', '달다', '맵다', '신맛',
  '쓴맛',
  '감칠맛', '감칠맛나는', '맛있', '맛있는', '맛있었', '맛없', '맛이 좋', '맛이 훌륭',

  # 한식
  '밥', '김치', '된장', '고추장', '떡', '국수', '비빔밥', '불고기', '갈비', '찌개', '탕', '전', '나물',
  '보쌈', '족발', '삼겹살', '제육', '김밥', '순두부', '곱창', '육회', '닭갈비', '쌈', '국',

  # 중식
  '짜장면', '짬뽕', '볶음밥', '탕수육', '만두', '마라', '마라탕', '양장피', '깐풍기', '훠궈', '딤섬',

  # 일식
  '초밥', '스시', '사시미', '라멘', '우동', '소바', '돈부리', '덮밥', '가츠동', '오니기리', '타코야키',
  '야키니쿠', '샤브샤브', '카레', '가라아게', '규동', '텐동', '소테리아키',

  # 양식
  '파스타', '피자', '스테이크', '햄버거', '샌드위치', '리조또', '샐러드', '브루스케타', '오믈렛', '빠네',

  # 디저트/음료
  '케이크', '빵', '쿠키', '마카롱', '아이스크림', '와플', '크로플', '타르트', '무스', '푸딩', '커피',
  '라떼', '에스프레소', '아메리카노', '주스', '차', '맥주', '와인', '칵테일', '소주', '막걸리',

  # 식재료
  '소고기', '돼지고기', '닭고기', '생선', '해산물', '야채', '채소', '과일', '쌀', '밀가루', '콩', '치즈',
  '버섯', '달걀', '계란', '감자', '고구마', '토마토', '양파', '마늘', '생강', '파', '김', '파래',

  # 조리 방식
  '구이', '볶음', '찜', '조림', '튀김', '삶기', '데치기', '무침', '회', '훈제', '로스팅', '베이킹',

  # , '식사 형태
  '코스', '뷔페', '한상', '정식', '반상', '백반', '도시락', '포장',

  # 기타 음식 관련
  '양념', '소스', '드레싱', '토핑', '가니쉬', '비주얼', '플레이팅', '포션', '사이드', '반찬'
}

# 제외할 키워드 목록 (원하는 키워드를 여기에 추가)
EXCLUDED_KEYWORDS = {
  '맛집', '메뉴', '혼밥', '식사', '주차', '롯데', '리아','소주','맥주','포장'
}


def extract_sentence_with_keyword(text, keyword):
  """
  텍스트에서 키워드가 포함된 문장만 추출하는 함수

  Args:
      text (str): 전체 리뷰 텍스트
      keyword (str): 찾을 키워드

  Returns:
      list: 키워드가 포함된 문장 리스트
  """
  # 문장 구분자로 텍스트를 분리
  sentences = re.split(r'[.!?]\s*', text)

  # 키워드가 포함된 문장만 필터링
  keyword_sentences = []
  for sentence in sentences:
    if keyword in sentence:
      # 문장이 너무 짧으면 건너뛰기 (의미 없는 문장 방지)
      if len(sentence.strip()) < 5:
        continue

      # 방문 정보 및 메타데이터 제거
      # 1. 방문 시간 및 예약 정보 제거
      clean_sentence = re.sub(
          r'^(?:저녁|점심|아침|밤)에 방문(?:예약 없이 이용)?(?:대기 시간 바로 입장)?(?:일상|친목|데이트|회식|가족모임)?',
          '', sentence)

      # 2. 방문자 정보 제거
      clean_sentence = re.sub(r'(?:지인・동료|친구|연인・배우자|가족|혼자)', '',
                              clean_sentence)

      # 3. 별점 정보 제거
      clean_sentence = re.sub(r'^별점 \d+ 점', '', clean_sentence)

      # 4. 키워드 반응 제거 (예: "음식이 맛있어요+3")
      clean_sentence = re.sub(
          r'(?:음식이 맛있어요|가성비가 좋아요|친절해요|재료가 신선해요|매장이 청결해요|양이 많아요|혼밥하기 좋아요|매장이 넓어요)(?:\+\d+)?',
          '', clean_sentence)

      # 5. n번째 방문 정보 제거
      clean_sentence = re.sub(r'\d+번째 방문', '', clean_sentence)

      # 공백 정리
      clean_sentence = clean_sentence.strip()

      if clean_sentence:  # 내용이 비어있지 않은 경우만 추가
        # 문장 뒤에 구두점 추가 (원래 문장 끝에 있던 구두점이 분리되었으므로)
        clean_sentence = clean_sentence.strip() + "."
        keyword_sentences.append(clean_sentence)

  return keyword_sentences


def is_food_related(keyword):
  """
  키워드가 음식 관련인지 확인하는 함수

  Args:
      keyword (str): 확인할 키워드

  Returns:
      bool: 음식 관련 키워드면 True, 아니면 False
  """
  # 제외할 키워드 목록에 있는 경우 False 반환
  if keyword in EXCLUDED_KEYWORDS:
    return False

  # 키워드가 FOOD_KEYWORDS 집합에 포함되어 있는지 확인
  for food_keyword in FOOD_KEYWORDS:
    if food_keyword in keyword or keyword in food_keyword:
      return True
  return False


def identify_review_source(review, review_text, default_source, hdfs_directory):
  """
  리뷰 소스를 식별하는 함수

  Args:
      review (dict): 리뷰 데이터
      review_text (str): 리뷰 텍스트
      default_source (str): 기본 소스 (플레이스 또는 블로그)
      hdfs_directory (str): HDFS 디렉토리 경로

  Returns:
      str: 식별된 소스 (블로그 또는 플레이스)
  """
  # 이미 소스가 지정되어 있는 경우 그대로 사용
  if 'source' in review and review['source']:
    return review['source']

  # 구글 리뷰 디렉토리 확인
  if "google_review" in hdfs_directory:
    return "구글"

  # 경로에 ugc_review가 포함되어 있으면 무조건 블로그로 설정
  if "ugc_review" in hdfs_directory:
    return "블로그"

  # 블로그 리뷰 디렉토리에서 가져온 데이터는 블로그로 유지
  if default_source == "블로그":
    return "블로그"

  # 특정 블로그 리뷰 패턴이나 특징 확인 (예: 제목 형태, 특정 문구 등)
  if "블로그" in review_text or "포스팅" in review_text or "방문 후기" in review_text:
    return "블로그"

  # 그 외에는 기본 소스 사용
  return default_source


def remove_first_line_from_blog_review(content, source):
  """
  블로그 리뷰인 경우 첫 줄을 제외하는 함수

  Args:
      content (str): 리뷰 내용
      source (str): 리뷰 소스 (블로그 또는 플레이스)

  Returns:
      str: 첫 줄이 제외된 리뷰 내용 (블로그인 경우)
  """
  if source == '블로그' and content:
    # 줄바꿈을 기준으로 분리
    lines = content.split('\n')
    # 첫 줄을 제외한 나머지 내용 반환
    if len(lines) > 1:
      return '\n'.join(lines[1:])

  # 플레이스 리뷰이거나 한 줄짜리 내용인 경우 원본 그대로 반환
  return content


def count_keyword_in_reviews(reviews, keyword):
  """
  리뷰 텍스트에서 특정 키워드가 등장한 횟수를 정확히 계산

  Args:
      reviews (list): 리뷰 목록
      keyword (str): 검색할 키워드

  Returns:
      int: 키워드가 등장한 횟수
  """
  count = 0
  for review in reviews:
    content = review.get('original_content', review.get('content', ''))

    # 문장 단위로 분리하여 키워드 개수 세기
    sentences = re.split(r'[.!?]\s*', content)
    for sentence in sentences:
      # 키워드가 한 문장에 여러 번 나올 수 있으므로 각각 세기
      keyword_count_in_sentence = sentence.count(keyword)
      count += keyword_count_in_sentence

  return count


def main(restaurant_ids=None):
  """
  HDFS에서 JSON 파일을 읽어 키워드 분석을 실행하고 결과를 데이터베이스에 저장하는 메인 함수
  음식 관련 키워드만 필터링하고, 키워드가 포함된 문장만 저장합니다.

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

  # 제외 키워드 정보 출력
  print(f"\n{'=' * 50}")
  print(f"🚫 제외할 키워드 목록: {', '.join(EXCLUDED_KEYWORDS)}")
  print(f"{'=' * 50}")

  # 각 레스토랑 ID에 대해 처리 실행
  for restaurant_id in restaurant_ids:
    # ID를 문자열로 변환
    restaurant_id_str = str(restaurant_id)
    print(f"\n{'=' * 50}")
    print(f"🍽️ 레스토랑 ID: {restaurant_id_str} 처리 시작")
    print(f"{'=' * 50}")

    # HDFS 디렉토리 경로 설정 (레스토랑 리뷰, 블로그 리뷰, 구글 리뷰)
    hdfs_directories = [
      f"/user/hadoop/add_big_final_rest_review_json/restaurant_id={restaurant_id_str}",
      f"/user/hadoop/add_big_final_rest_ugc_review_json/restaurant_id={restaurant_id_str}",
      f"/user/hadoop/add_big_final_rest_review_google_json/restaurant_id={restaurant_id_str}",
      f"/user/hadoop/add_big_final_rest_review_dining_json/restaurant_id={restaurant_id_str}",
      f"/user/hadoop/add_big_final_rest_review_kakao_json/restaurant_id={restaurant_id_str}"
    ]

    all_processed_reviews = []

    # 디렉토리별 처리
    for hdfs_directory in hdfs_directories:
      # 리뷰 소스 타입 식별
      if "google" in hdfs_directory:
        default_source = "구글"
      elif "ugc_review" in hdfs_directory:
        default_source = "블로그"
      elif "dining" in hdfs_directory:
        default_source = "다이닝코드"
      elif "kakao" in hdfs_directory:
        default_source = "카카오"
      else:
        default_source = "플레이스"

      print(f"📂 {default_source} 리뷰 디렉토리 처리 시작: {hdfs_directory}")

      # 디버깅 정보 출력
      print(f"🔍 디버깅 - 디렉토리: {hdfs_directory}, default_source: {default_source}")

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
              # 카카오 리뷰 형식 처리
              elif "rest_review_kakao" in data:
                reviews = []
                for review_text in data["rest_review_kakao"]:
                  if review_text and review_text.strip():
                    reviews.append({"content": review_text, "source": "카카오"})
              # 구글 리뷰 형식 처리
              elif "rest_review_google" in data:
                reviews = []
                for review_text in data["rest_review_google"]:
                  if review_text and review_text.strip():
                    reviews.append({"content": review_text, "source": "구글"})
              # 다이닝코드 리뷰 형식 처리
              elif "rest_review_dining" in data:
                reviews = []
                for review_text in data["rest_review_dining"]:
                  if review_text and review_text.strip():
                    reviews.append({"content": review_text, "source": "다이닝코드"})
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
              # JSON 파싱 실패시, 라인 단위 처리 시도
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
                  # 리뷰 소스 정보 추가 (수정된 함수로 소스 식별)
                  review['source'] = identify_review_source(
                      review,
                      review['content'],
                      default_source,
                      hdfs_directory  # hdfs_directory 파라미터 추가
                  )

                  # 블로그 리뷰인 경우 첫 줄 제외하기
                  if review['source'] == '블로그':
                    original_content = review['content']
                    review['content'] = remove_first_line_from_blog_review(
                        original_content, '블로그')

                  # 원본 내용 저장 (나중에 문장 추출용)
                  review['original_content'] = review['content']

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
            f"📊 디렉토리 '{hdfs_directory}'에서 처리된 리뷰 수: {review_count}")

        # 소스별로 분류하여 리뷰 수 출력
        blog_reviews = [r for r in directory_processed_reviews if
                        r.get('source') == '블로그']
        place_reviews = [r for r in directory_processed_reviews if
                         r.get('source') == '플레이스']
        google_reviews = [r for r in directory_processed_reviews if
                          r.get('source') == '구글']
        dining_reviews = [r for r in directory_processed_reviews if
                          r.get('source') == '다이닝코드']
        kakao_reviews = [r for r in directory_processed_reviews if
                         r.get('source') == '카카오']

        print(f"📝 플레이스 리뷰 처리 수: {len(place_reviews)}")
        print(f"📝 블로그 리뷰 처리 수: {len(blog_reviews)}")
        print(f"📝 구글 리뷰 처리 수: {len(google_reviews)}")
        print(f"📝 다이닝코드 리뷰 처리 수: {len(dining_reviews)}")
        print(f"📝 카카오 리뷰 처리 수: {len(kakao_reviews)}")

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
      google_reviews = [r for r in all_processed_reviews if
                        r.get('source') == '구글']

      print(f"📊 플레이스 리뷰 수: {len(normal_reviews)}")
      print(f"📊 블로그 리뷰 수: {len(blog_reviews)}")
      print(f"📊 구글 리뷰 수: {len(google_reviews)}")

      # 상위 키워드 분석 (더 많이 추출해서 나중에 필터링할 수 있도록)
      top_n = 50  # 더 많이 추출해서 나중에 음식 관련 키워드만 필터링
      reviews_per_keyword = 20  # 각 키워드당 최대 20개 리뷰

      analysis_results = analyzer.analyze_reviews(
          all_processed_reviews,
          top_n=top_n,
          reviews_per_keyword=reviews_per_keyword
      )

      # 보고서 생성
      report = analyzer.generate_report(analysis_results)

      # 음식 관련 키워드만 필터링 및 키워드별 정확한 카운트 계산
      food_keywords = []
      for keyword, _ in analysis_results['top_keywords']:
        if is_food_related(keyword):
          # 각 키워드별 정확한 등장 횟수 다시 계산
          accurate_count = count_keyword_in_reviews(all_processed_reviews,
                                                    keyword)
          food_keywords.append((keyword, accurate_count))

      # 횟수 기준으로 내림차순 정렬
      food_keywords.sort(key=lambda x: x[1], reverse=True)

      # 음식 관련 키워드만 남기기
      analysis_results['top_keywords'] = food_keywords

      # 결과 출력
      print("\n===== 음식 관련 키워드 분석 결과 =====")
      print(f"총 리뷰 수: {report['summary']['total_reviews']}")
      print(f"제외된 키워드: {', '.join(EXCLUDED_KEYWORDS)}")

      print("\n===== 상위 음식 관련 키워드 =====")
      for keyword, count in food_keywords:
        print(f"'{keyword}': {count}회")

      # 결과를 로컬 텍스트 파일로 저장
      output_directory = "results"

      # 결과 디렉토리가 없으면 생성
      if not os.path.exists(output_directory):
        os.makedirs(output_directory)

      # 레스토랑 ID로 파일명 생성
      result_filename = f"{output_directory}/restaurant_{restaurant_id_str}_food_keywords.txt"

      try:
        # 결과를 로컬 텍스트 파일로 저장
        with open(result_filename, 'w', encoding='utf-8') as f:
          f.write(f"===== 음식 관련 키워드 분석 결과 =====\n")
          f.write(f"레스토랑 ID: {restaurant_id_str}\n")
          f.write(f"총 리뷰 수: {analysis_results['total_reviews']}\n")
          f.write(f"제외된 키워드: {', '.join(EXCLUDED_KEYWORDS)}\n\n")

          f.write(f"===== 상위 음식 관련 키워드 =====\n")
          for keyword, count in food_keywords:
            f.write(f"'{keyword}': {count}회\n")

          f.write("\n===== 키워드별 관련 문장 (최대 20개) =====\n")
          for keyword, count in food_keywords:
            f.write(f"\n## '{keyword}' ({count}회) ##\n")

            # 해당 키워드의 리뷰 데이터 가져오기
            keyword_data = analysis_results['keyword_reviews'].get(keyword, {})
            reviews = keyword_data.get('reviews', [])

            # 각 리뷰에서 키워드가 포함된 문장만 추출 (소스별로 분류하여 저장)
            place_sentences = []
            blog_sentences = []
            google_sentences = []
            dining_sentences = []
            kakao_sentences = []

            for i, review in enumerate(reviews, 1):
              content = review.get('original_content',
                                   review.get('content', ''))
              source = review.get('source', '플레이스')

              # 키워드가 포함된 문장 추출
              sentences = extract_sentence_with_keyword(content, keyword)

              # 소스별로 문장 분류
              for sentence in sentences:
                if source == '플레이스':
                  place_sentences.append((source, sentence))
                elif source == '블로그':
                  blog_sentences.append((source, sentence))
                elif source == '구글':
                  google_sentences.append((source, sentence))
                elif source == '다이닝코드':
                  dining_sentences.append((source, sentence))
                elif source == '카카오':
                  kakao_sentences.append((source, sentence))

            # 각 소스별 최대 문장 수 계산 (최대한 균등하게 분배)
            sources = [place_sentences, blog_sentences, google_sentences,
                       dining_sentences, kakao_sentences]
            active_sources = [s for s in sources if len(s) > 0]
            total_sources = len(active_sources)
            max_per_source = min(4,
                                 20 // total_sources) if total_sources > 0 else 0

            # 최종 출력할 문장 목록 준비
            final_sentences = []

            # 각 소스에서 문장 선택 (최대 max_per_source개)
            if place_sentences:
              final_sentences.extend(place_sentences[:max_per_source])
            if blog_sentences:
              final_sentences.extend(blog_sentences[:max_per_source])
            if google_sentences:
              final_sentences.extend(google_sentences[:max_per_source])
            if dining_sentences:
              final_sentences.extend(dining_sentences[:max_per_source])
            if kakao_sentences:
              final_sentences.extend(kakao_sentences[:max_per_source])

            # 만약 20개가 되지 않았다면, 남은 공간에 가장 많은 문장이 있는 소스에서 추가
            remaining_slots = 20 - len(final_sentences)
            if remaining_slots > 0:
              # 소스별 남은 문장 수 확인
              remaining_place = max(0, len(place_sentences) - max_per_source)
              remaining_blog = max(0, len(blog_sentences) - max_per_source)
              remaining_google = max(0, len(google_sentences) - max_per_source)
              remaining_dining = max(0, len(dining_sentences) - max_per_source)
              remaining_kakao = max(0, len(kakao_sentences) - max_per_source)

              # 남은 문장이 가장 많은 소스를 우선적으로 추가
              sources_with_remaining = []
              if remaining_place > 0:
                sources_with_remaining.append(
                    (remaining_place, place_sentences[max_per_source:], '플레이스'))
              if remaining_blog > 0:
                sources_with_remaining.append(
                    (remaining_blog, blog_sentences[max_per_source:], '블로그'))
              if remaining_google > 0:
                sources_with_remaining.append(
                    (remaining_google, google_sentences[max_per_source:], '구글'))
              if remaining_dining > 0:
                sources_with_remaining.append((remaining_dining,
                                               dining_sentences[
                                               max_per_source:], '다이닝코드'))
              if remaining_kakao > 0:
                sources_with_remaining.append(
                    (remaining_kakao, kakao_sentences[max_per_source:], '카카오'))
              sources_with_remaining.sort(reverse=True)  # 남은 문장이 많은 순으로 정렬

              # 남은 자리를 채움
              slots_filled = 0
              for remaining, sentences, source_type in sources_with_remaining:
                if slots_filled >= remaining_slots:
                  break

                to_add = min(remaining, remaining_slots - slots_filled)
                final_sentences.extend(sentences[:to_add])
                slots_filled += to_add

            # 최종 선택된 문장들을 출력
            for i, (source, sentence) in enumerate(final_sentences, 1):
              f.write(f"{i}. [{source}] {sentence}\n")

        print(f"✅ 음식 관련 키워드 분석 결과가 텍스트 파일로 저장되었습니다: {result_filename}")

        # JSON 형식으로 키워드 분석 결과 저장
        # 음식 관련 키워드 배열 형태로 저장
        keywords_array = []
        for keyword, count in food_keywords:
          keyword_obj = {
            'keyword': keyword,
            'count': count,
            'sentences': []
          }

          # 해당 키워드의 리뷰 데이터 가져오기
          keyword_data = analysis_results['keyword_reviews'].get(keyword, {})
          reviews = keyword_data.get('reviews', [])

          # 각 리뷰에서 키워드가 포함된 문장 추출 (소스별로 분류)
          place_sentences = []
          blog_sentences = []
          google_sentences = []
          dining_sentences = []
          kakao_sentences = []

          for review in reviews:
            content = review.get('original_content', review.get('content', ''))
            source = review.get('source', '플레이스')

            # 키워드가 포함된 문장 추출
            sentences = extract_sentence_with_keyword(content, keyword)

            # 소스별로 문장 분류
            for sentence in sentences:
              sentence_obj = {
                'content': sentence,
                'source': source
              }

              if source == '플레이스':
                place_sentences.append(sentence_obj)
              elif source == '블로그':
                blog_sentences.append(sentence_obj)
              elif source == '구글':
                google_sentences.append(sentence_obj)
              elif source == '다이닝코드':
                dining_sentences.append(sentence_obj)
              elif source == '카카오':
                kakao_sentences.append(sentence_obj)

          # 각 소스별 최대 문장 수 계산 (최대한 균등하게 분배)
          sources = [place_sentences, blog_sentences, google_sentences,
                     dining_sentences, kakao_sentences]
          active_sources = [s for s in sources if len(s) > 0]
          total_sources = len(active_sources)
          max_per_source = min(4,
                               20 // total_sources) if total_sources > 0 else 0

          # 각 소스에서 문장 선택
          selected_sentences = []
          if place_sentences:
            selected_sentences.extend(place_sentences[:max_per_source])
          if blog_sentences:
            selected_sentences.extend(blog_sentences[:max_per_source])
          if google_sentences:
            selected_sentences.extend(google_sentences[:max_per_source])
          if dining_sentences:
            selected_sentences.extend(dining_sentences[:max_per_source])
          if kakao_sentences:
            selected_sentences.extend(kakao_sentences[:max_per_source])

          # 만약 20개가 되지 않았다면, 남은 공간에 가장 많은 문장이 있는 소스에서 추가
          # 만약 20개가 되지 않았다면, 남은 공간에 가장 많은 문장이 있는 소스에서 추가
          remaining_slots = 20 - len(selected_sentences)
          if remaining_slots > 0:
            # 소스별 남은 문장 수 확인
            remaining_place = max(0, len(place_sentences) - max_per_source)
            remaining_blog = max(0, len(blog_sentences) - max_per_source)
            remaining_google = max(0, len(google_sentences) - max_per_source)
            remaining_dining = max(0, len(dining_sentences) - max_per_source)
            remaining_kakao = max(0, len(kakao_sentences) - max_per_source)

            # 남은 문장이 가장 많은 소스를 우선적으로 추가
            sources_with_remaining = []
            if remaining_place > 0:
              sources_with_remaining.append(
                  (remaining_place, place_sentences[max_per_source:]))
            if remaining_blog > 0:
              sources_with_remaining.append(
                  (remaining_blog, blog_sentences[max_per_source:]))
            if remaining_google > 0:
              sources_with_remaining.append(
                  (remaining_google, google_sentences[max_per_source:]))
            if remaining_dining > 0:
              sources_with_remaining.append(
                  (remaining_dining, dining_sentences[max_per_source:]))
            if remaining_kakao > 0:
              sources_with_remaining.append(
                  (remaining_kakao, kakao_sentences[max_per_source:]))
            sources_with_remaining.sort(key=lambda x: x[0],
                                        reverse=True)  # 남은 문장이 많은 순으로 정렬

            # 남은 자리를 채움
            slots_filled = 0
            for remaining, sentences in sources_with_remaining:
              if slots_filled >= remaining_slots:
                break

              to_add = min(remaining, remaining_slots - slots_filled)
              selected_sentences.extend(sentences[:to_add])
              slots_filled += to_add

          # 최종 선택된 문장들을 키워드 객체에 추가
          keyword_obj['sentences'] = selected_sentences[:20]  # 최대 20개로 제한

          keywords_array.append(keyword_obj)

        json_filename = f"{output_directory}/restaurant_{restaurant_id_str}_food_keywords.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
          json.dump(keywords_array, f, ensure_ascii=False, indent=2)
        print(f"✅ JSON 형식의 음식 관련 키워드 분석 결과가 저장되었습니다: {json_filename}")

        # 데이터베이스에 결과 저장
        save_keyword_results_to_db(db_importer, restaurant_id_str,
                                   analysis_results, food_keywords)

      except Exception as e:
        print(f"❌ 결과 저장 중 오류 발생: {e}")
    else:
      print(f"❌ 레스토랑 ID {restaurant_id_str}에 대한 분석할 유효한 리뷰가 없습니다.")

  # 데이터베이스 연결 종료
  db_importer.close()


# 키워드별 문장 처리 및 데이터베이스 저장 함수 수정
import json
import os
from src.hadoop.hdfs_client import HDFSClient
from src.keyword.analysis import KeywordAnalyzer
from dotenv import load_dotenv
from db.database import PostgresImporter
import re


# 기존 코드 동일 (FOOD_KEYWORDS, EXCLUDED_KEYWORDS 등)

# 기존의 함수들 그대로 유지 (extract_sentence_with_keyword, is_food_related 등)

def save_keyword_results_to_db(db_importer, restaurant_id, analysis_results,
    food_keywords):
  """
  음식 관련 키워드 분석 결과를 데이터베이스에 저장합니다.
  각 키워드별로 포함된 문장만 저장합니다.
  상위 5개 키워드만 저장합니다.
  """
  try:
    print(f"\n===== 데이터베이스에 상위 5개 음식 관련 키워드 및 문장 저장 =====")

    # 상위 5개 키워드만 선택
    top_5_keywords = food_keywords[:5]
    if len(top_5_keywords) < 5:
      print(f"⚠️ 키워드가 5개 미만입니다. 사용 가능한 {len(top_5_keywords)}개의 키워드만 처리합니다.")

    print(f"📊 저장할 상위 5개 키워드: {', '.join([kw for kw, _ in top_5_keywords])}")

    # 소스 우선순위 설정 (카카오, 구글, 다이닝코드, 플레이스, 블로그 순)
    source_priority_order = ['카카오', '구글', '다이닝코드', '플레이스', '블로그']

    def select_comprehensive_sentences(sources, max_total_sentences=20):
      # 모든 활성 소스 수집
      all_sentences = []
      source_sentence_counts = {source: 0 for source in
                                ['카카오', '구글', '다이닝코드', '플레이스', '블로그']}

      # 각 소스별 최대 문장 수 (동적으로 조정)
      source_max_sentences = {
        '카카오': max_total_sentences // 5 + 2,
        '구글': max_total_sentences // 5 + 2,
        '다이닝코드': max_total_sentences // 5 + 2,
        '플레이스': max_total_sentences // 5 + 2,
        '블로그': max_total_sentences // 5 + 2
      }

      # 소스 우선순위 (카카오, 구글, 다이닝코드, 플레이스, 블로그)
      source_priority_order = ['카카오', '구글', '다이닝코드', '플레이스', '블로그']

      # 중복 제거를 위한 집합
      seen_sentences = set()

      # 우선순위에 따라 문장 수집
      for source in source_priority_order:
        if source in sources and sources[source]:
          for sentence, src in sources[source]:
            # 중복 문장 제외
            if sentence not in seen_sentences:
              # 해당 소스의 문장 수가 최대치에 도달하지 않았다면 추가
              if source_sentence_counts[source] < source_max_sentences[source]:
                all_sentences.append((sentence, src))
                source_sentence_counts[source] += 1
                seen_sentences.add(sentence)

            # 총 문장 수가 최대치에 도달하면 종료
            if len(all_sentences) >= max_total_sentences:
              break

          # 총 문장 수가 최대치에 도달하면 종료
          if len(all_sentences) >= max_total_sentences:
            break

      # 여전히 문장 수가 부족하다면 나머지 소스에서 보충
      if len(all_sentences) < max_total_sentences:
        for source in sources:
          if source not in source_priority_order:
            for sentence, src in sources[source]:
              if sentence not in seen_sentences:
                all_sentences.append((sentence, src))
                seen_sentences.add(sentence)

              if len(all_sentences) >= max_total_sentences:
                break

            if len(all_sentences) >= max_total_sentences:
              break

      return all_sentences[:max_total_sentences]

    # 1. store_keyword 테이블에 키워드 저장
    keyword_id_map = {}  # 키워드와 DB에 저장된 ID 매핑을 저장할 사전

    # 상위 5개 음식 관련 키워드만 처리
    for keyword, count in top_5_keywords:
      # 키워드 저장 및 생성된 ID 가져오기
      keyword_id = db_importer._save_keyword(keyword, count, restaurant_id)
      keyword_id_map[keyword] = keyword_id
      print(
        f"✅ 키워드 '{keyword}' (빈도: {count})가 store_keyword 테이블에 저장되었습니다. ID: {keyword_id}")

    # 2. 각 키워드별 리뷰에서 키워드가 포함된 문장만 keyword_review 테이블에 저장
    sentence_count = 0
    for keyword, count in top_5_keywords:
      # 키워드에 해당하는 ID 가져오기
      keyword_id = keyword_id_map.get(keyword)
      if not keyword_id:
        print(f"⚠️ 키워드 '{keyword}'의 ID를 찾을 수 없습니다.")
        continue

      # 해당 키워드의 리뷰 데이터 가져오기
      keyword_data = analysis_results['keyword_reviews'].get(keyword, {})
      reviews = keyword_data.get('reviews', [])

      # 각 리뷰에서 키워드가 포함된 문장 추출 (소스별로 분류)
      sources_sentences = {
        '카카오': [],
        '구글': [],
        '다이닝코드': [],
        '플레이스': [],
        '블로그': []
      }

      for review in reviews:
        content = review.get('original_content', review.get('content', ''))
        source = review.get('source', '플레이스')

        # 키워드가 포함된 문장 추출
        sentences = extract_sentence_with_keyword(content, keyword)

        # 소스별로 문장 분류 (존재하는 소스만)
        if source in sources_sentences:
          for sentence in sentences:
            sources_sentences[source].append((sentence, source))

      # 문장 선택
      selected_sentences = select_comprehensive_sentences(
          {source: sentences for source, sentences in sources_sentences.items()
           if sentences},
          max_total_sentences=20
      )

      # 선택된 문장의 소스 분포 출력
      source_distribution = {}
      for sentence, source in selected_sentences:
        source_distribution[source] = source_distribution.get(source, 0) + 1

      print(f"\n키워드 '{keyword}'의 선택된 문장 소스 분포:")
      for source, count in sorted(source_distribution.items()):
        print(f"{source}: {count}개")

      # 최종 선택된 문장들을 DB에 저장
      sentences_saved = 0
      for sentence, source in selected_sentences:
        if sentences_saved >= 20:  # 최대 20개 문장만 저장
          break

        # 문장 저장 (리뷰 내용 대신 문장 저장)
        relation_id = db_importer._save_review_keyword_relation_with_source(
            sentence, keyword_id, source)
        if relation_id > 0:
          sentences_saved += 1
          sentence_count += 1

      print(f"✅ 키워드 '{keyword}'에 대해 {sentences_saved}개의 문장이 저장되었습니다.")

    print(f"✅ 총 {sentence_count}개의 문장이 keyword_review 테이블에 저장되었습니다.")
    return True

  except Exception as e:
    print(f"❌ 데이터베이스 저장 중 오류 발생: {e}")
    return False

if __name__ == "__main__":
  # 처리할 레스토랑 ID 범위 설정
  start_id = 42
  end_id = 521

  # 레스토랑 ID 목록 (범위 또는 특정 ID 목록 사용 가능)
  restaurant_ids = range(start_id, end_id + 1)

  main(restaurant_ids)