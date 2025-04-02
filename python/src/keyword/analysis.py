import re
import json
from collections import Counter
from konlpy.tag import Okt  # 한국어 형태소 분석기
from tqdm import tqdm


class KeywordAnalyzer:
  def __init__(self):
    """형태소 분석 기반 키워드 분석기 초기화"""
    self.okt = Okt()

    # 불용어(stopwords) 정의: 분석에서 제외할 단어들
    self.stopwords = [
      '이', '그', '저', '것', '수', '등', '를', '에', '은', '는', '이다', '있다',
      '하다', '에서', '으로', '입니다', '습니다', '들', '더', '나', '내', '제', '네',
      '그리고', '그래서', '또', '너무', '정말', '진짜', '아주', '이렇게', '매우',
      '하나', '이번', '다음', '여기', '저기', '곳', '좀', '때', '년', '거', '뭐',
      '왜', '어떤', '어떻게', '무슨', '어디', '언제', '누가', '누구', '누구나',
      '많이', '많은', '많다', '적다', '적은', '작은', '크다', '큰', '좋은', '좋아',
      '좋다', '나쁜', '나쁘다', '예쁜', '예쁘다', '같은', '같다', '이런', '그런',
      '저런', '이거', '그거', '저거', '때문', '때문에', '위해', '통해', '따라',
      '의해', '말', '말이', '줄', '주', '인해', '가지', '해', '번', '째', '개',
      '명', '분', '시간', '정도', '굿', '좋아요', '맛있어요', '반응', '남기기', '점심',
      '저녁','방문','음식','예약','이용','대기','바로','입장','아침','혼자','가성비',
      '일상','가성'
    ]

    # 품사 태그 매핑
    self.pos_mapping = {
      'Noun': '명사', 'Verb': '동사', 'Adjective': '형용사', 'Adverb': '부사',
      'Determiner': '관형사', 'Exclamation': '감탄사', 'Josa': '조사',
      'PreEomi': '선어미', 'Eomi': '어미', 'Suffix': '접미사',
      'Prefix': '접두사', 'Conjunction': '접속사'
    }

  def extract_selected_keywords(self, text):
    """사용자가 선택한 키워드와 인원 수 추출"""
    keyword_pattern = r'"([^"]+)"\n이 키워드를 선택한 인원\n(\d+)'
    keywords = []

    for match in re.finditer(keyword_pattern, text):
      keyword = match.group(1)
      count = int(match.group(2))
      keywords.append((keyword, count))

    return keywords

  def extract_reviews(self, text):
    """일반 리뷰 추출 함수"""
    # 사용자명과 리뷰 내용을 추출하는 패턴
    pattern = r'([^\n]+)\n리뷰[^\n]*\n팔로우\n([\s\S]+?)(?=\n방문일|\n인증 수단|$)'
    reviews = []

    for match in re.finditer(pattern, text):
      username = match.group(1).strip()
      content = match.group(2).strip()

      # 리뷰 내용 정제 (UI 요소 제거)
      clean_content = re.sub(r'(?:더보기|펼쳐보기|개의 리뷰가 더 있습니다|반응 남기기)[^\n]*', '',
                             content)
      clean_content = re.sub(r'[\n\t]+', ' ', clean_content).strip()

      if clean_content:  # 내용이 비어있지 않은 경우만 추가
        reviews.append({
          'username': username,
          'content': clean_content
        })

    return reviews

  def extract_keywords_from_text(self, text, pos_filter=['Noun'], min_length=2,
      top_n=5):
    """
    텍스트에서 형태소 분석을 통해 키워드 추출

    Args:
        text (str): 분석할 텍스트
        pos_filter (list): 추출할 품사 목록 (기본값: 명사)
        min_length (int): 키워드의 최소 길이 (기본값: 2)
        top_n (int): 반환할 상위 키워드 수 (기본값: 5)

    Returns:
        list: 키워드 목록
    """
    # 형태소 분석
    pos_tagged = self.okt.pos(text)

    # 필터링: 지정된 품사이면서 불용어가 아니고 최소 길이 이상인 단어만 선택
    filtered_words = []
    for word, pos in pos_tagged:
      if (pos in pos_filter) and (word not in self.stopwords) and (
          len(word) >= min_length):
        filtered_words.append(word)

    # 복합명사 처리 (선택 사항): Okt의 명사 추출 기능 사용
    if 'Noun' in pos_filter:
      nouns = self.okt.nouns(text)
      for noun in nouns:
        if (noun not in self.stopwords) and (len(noun) >= min_length) and (
            noun not in filtered_words):
          filtered_words.append(noun)

    # 빈도 계산
    counter = Counter(filtered_words)

    # 상위 키워드 반환
    top_keywords = counter.most_common(top_n)
    return [keyword for keyword, _ in top_keywords]

  def process_reviews(self, reviews, output_file=None):
    """
    리뷰 목록에서 키워드 추출 및 처리

    Args:
        reviews (list): 처리할 리뷰 목록
        output_file (str, optional): 결과를 저장할 파일 경로

    Returns:
        list: 키워드가 추가된 리뷰 목록
    """
    processed_reviews = []

    print(f"총 {len(reviews)}개의 리뷰 처리 중...")

    # 프로그레스바로 진행상황 표시
    for review in tqdm(reviews):
      content = review['content']
      # 형태소 분석으로 키워드 추출
      keywords = self.extract_keywords_from_text(content, top_n=3)

      processed_review = {
        "content": content,
        "keywords": keywords
      }
      processed_reviews.append(processed_review)

      # 결과를 파일에 저장 (추가 모드)
      if output_file:
        with open(output_file, 'a', encoding='utf-8') as f:
          f.write(json.dumps(processed_review, ensure_ascii=False) + '\n')

    return processed_reviews

  def find_top_keywords(self, processed_reviews, top_n=5):
    """
    처리된 리뷰에서 상위 키워드 찾기

    Args:
        processed_reviews (list): 키워드가 추출된 리뷰 목록
        top_n (int): 찾을 상위 키워드 수

    Returns:
        list: (키워드, 출현 횟수) 형태의 튜플 목록
    """
    keyword_counter = Counter()

    for review in processed_reviews:
      keywords = review.get('keywords', [])
      for keyword in keywords:
        keyword_counter[keyword] += 1

    return keyword_counter.most_common(top_n)

  def find_reviews_for_keyword(self, processed_reviews, keyword):
    """특정 키워드가 포함된 리뷰 찾기 (중복 없이)"""
    matching_reviews = []
    seen_reviews = set()  # 중복 리뷰 방지를 위한 세트

    for review in processed_reviews:
      # 리뷰 ID 또는 내용 해시값으로 중복 체크
      review_id = hash(review.get('content', ''))

      # 이미 처리한 리뷰가 아니고, 키워드가 리뷰의 키워드 목록에 있는 경우만 추가
      if review_id not in seen_reviews and keyword in review.get('keywords',
                                                                 []):
        matching_reviews.append(review)
        seen_reviews.add(review_id)

    return matching_reviews

  def analyze_reviews(self, processed_reviews, top_n=5,reviews_per_keyword=20):
    """처리된 리뷰 분석 및 결과 생성"""
    # 상위 키워드 찾기
    top_keywords = self.find_top_keywords(processed_reviews, top_n)

    # 키워드별 관련 리뷰 찾기
    keyword_reviews = {}
    for keyword, count in top_keywords:
        matching_reviews = self.find_reviews_for_keyword(processed_reviews, keyword)
        keyword_reviews[keyword] = {
            'count': count,
            'reviews': matching_reviews
        }

    # 결과 반환
    return {
        'total_reviews': len(processed_reviews),
        'top_keywords': top_keywords,
        'keyword_reviews': keyword_reviews
    }

  def generate_report(self, analysis_results):
    """
    분석 결과를 보고서 형태로 생성

    Args:
        analysis_results (dict): 분석 결과

    Returns:
        dict: 보고서 형태의 결과
    """
    report = {
      'summary': {
        'total_reviews': analysis_results['total_reviews'],
        'top_keywords': analysis_results['top_keywords']
      },
      'keyword_analysis': {}
    }

    # 키워드별 분석 요약
    for keyword, data in analysis_results['keyword_reviews'].items():
      report['keyword_analysis'][keyword] = {
        'count': data['count'],
        'sample_reviews': [review['content'] for review in data['reviews'][:3]]
      }

    return report