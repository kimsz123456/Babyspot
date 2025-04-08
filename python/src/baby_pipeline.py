import json
import time
from langchain_ollama import OllamaLLM
from hadoop.hdfs_client import HDFSClient
from db.database import PostgresImporter

# HDFS 클라이언트 초기화
hdfs_client = HDFSClient()

# Ollama 모델 초기화
ollama = OllamaLLM(model="qwen2.5:14b")

def analyze_child_reviews(restaurant_id, reviews):
    """
    아이 관련 리뷰를 분석하고 요약하는 함수

    :param restaurant_id: 레스토랑 ID
    :param reviews: 리뷰 목록
    :return: 분석된 리뷰 JSON
    """
    # 리뷰 분류 및 분석 프롬프트
    analysis_prompt = f"""
다음 아이 관련 레스토랑 리뷰들을 긍정적, 부정적 측면으로 분류하고 요약해주세요.

리뷰들:
{reviews}

분석 가이드라인:
1. 리뷰들을 긍정적/부정적 관점에서 분류해주세요.
2. 각 분류에 대한 대표적인 요약을 제공해주세요.
3. 다음 JSON 형식으로 응답해주세요:

{{
  "positive": {{
    "summary": "긍정적 리뷰들의 전반적인 요약 문장",
    "reviews": [
      {{
        "content": "긍정적 리뷰 내용"
      }}
    ]
  }},
  "negative": {{
    "summary": "부정적 리뷰들의 전반적인 요약 문장",
    "reviews": [
      {{
        "content": "부정적 리뷰 내용"
      }}
    ]
  }}
}}

긍정 Summary 작성 기준:
- 감성적이고 생생한 문장 구성
- 구체적인 긍정 요소(키즈메뉴, 서비스 등)를 감성적 언어로 표현
- 장소의 분위기와 감정적 가치를 드러내는 문장 만들기
- 예시 스타일: "아이들과 함께하는 식사가 행복한 추억이 되는 곳! 맛있는 키즈메뉴와 아이들을 배려하는 따뜻한 분위기가 인상적이다."

부정 Summary 작성 기준:
- 객관적이고 사실적인 문제점 정리
- 리뷰들에서 반복적으로 지적되는 문제 요약
- 개선이 필요한 주요 영역 강조

분석 시 고려할 주요 관점:
- 키즈메뉴의 품질
- 아이와 함께하는 식사 경험
- 레스토랑의 아이 친화적 환경
- 음식 맛과 서비스
- 개선이 필요한 부분

반드시 유효한 JSON 형식으로 응답해주세요.
"""

    # 모델 호출
    try:
        analysis_result = ollama.invoke(analysis_prompt)

        # JSON 시작과 끝 부분 찾기
        json_start = analysis_result.find('{')
        json_end = analysis_result.rfind('}') + 1

        if json_start != -1 and json_end != -1:
            json_str = analysis_result[json_start:json_end]
            parsed_result = json.loads(json_str)

            # 최종 결과 구조 확인
            if "positive" in parsed_result and "negative" in parsed_result:
                return parsed_result
            else:
                raise ValueError("필수 필드(positive, negative) 누락")

        else:
            raise ValueError("유효한 JSON 형식이 아닙니다")

    except Exception as e:
        print(f"❌ 레스토랑 ID {restaurant_id} 리뷰 분석 중 오류 발생: {e}")
        # 오류 시 기본 구조 반환
        return {
            "positive": {
                "summary": "긍정 리뷰 분석에 실패했습니다.",
                "reviews": []
            },
            "negative": {
                "summary": "부정 리뷰 분석에 실패했습니다.",
                "reviews": []
            }
        }


def process_restaurant_reviews(restaurant_id, db_importer):
    """
    특정 레스토랑의 아이 관련 리뷰를 처리하는 함수

    :param restaurant_id: 레스토랑 ID
    :param db_importer: PostgreSQL 데이터베이스 임포터
    :return: 분석된 리뷰 결과
    """
    try:
        print(f"\n===== 레스토랑 ID: {restaurant_id} 처리 시작 =====")
        start_total = time.time()

        # 1. 데이터 로드
        print("1. HDFS에서 데이터 로드 시작")
        start = time.time()

        # 입력 디렉토리 경로 설정
        child_review_dir = f"/user/hadoop/big_final_child_related_review_json3/restaurant_id={restaurant_id}"

        # JSON 파일 목록 가져오기
        try:
            json_files = hdfs_client.get_all_json_files(child_review_dir)
            if not json_files:
                print(f"⚠️ 레스토랑 ID {restaurant_id}의 JSON 파일이 없습니다.")
                return None
        except FileNotFoundError:
            print(f"⚠️ 레스토랑 ID {restaurant_id}의 디렉토리가 없습니다.")
            return None

        # 첫 번째 JSON 파일 읽기
        raw_data = hdfs_client.read_file(json_files[0])
        reviews_data = json.loads(raw_data)
        reviews = reviews_data.get("child_related_review", [])

        if not reviews:
            print(f"⚠️ 레스토랑 ID {restaurant_id}의 리뷰가 없습니다.")
            return None

        print(f"총 리뷰 수: {len(reviews)}")
        print(f"데이터 로드 완료: {time.time() - start:.2f}초")

        # 2. 리뷰 분석
        print("2. 리뷰 분석 시작")
        start = time.time()

        # 리뷰 분석
        analyzed_reviews = analyze_child_reviews(restaurant_id, reviews)

        print(f"리뷰 분석 완료: {time.time() - start:.2f}초")

        # 3. 데이터베이스 저장
        print("3. 감정 분석 결과 데이터베이스 저장")

        # positive와 negative JSON을 문자열로 변환
        positive_json = json.dumps(analyzed_reviews['positive'], ensure_ascii=False)
        negative_json = json.dumps(analyzed_reviews['negative'], ensure_ascii=False)

        # 데이터베이스에 저장
        db_result = db_importer.import_sentiment_analysis(
            positive_json,
            negative_json,
            restaurant_id
        )

        if not db_result['success']:
            print(f"❌ 레스토랑 ID {restaurant_id} 데이터베이스 저장 실패")
        else:
            print(f"✅ 레스토랑 ID {restaurant_id} 데이터베이스 저장 성공")

        # 총 소요 시간
        print(f"\n===== 레스토랑 ID: {restaurant_id} 처리 완료: {time.time() - start_total:.2f}초 =====")

        return {
            "restaurant_id": restaurant_id,
            **analyzed_reviews
        }

    except Exception as e:
        print(f"❌ 레스토랑 ID {restaurant_id} 처리 중 오류 발생: {e}")
        return None


# 메인 실행 부분
def main():
    # PostgreSQL 임포터 초기화
    db_importer = PostgresImporter()

    try:
        # 처리할 레스토랑 ID 범위
        start_id = 1
        end_id = 521

        # 레스토랑 ID 목록
        restaurant_ids = range(start_id, end_id + 1)

        # 결과 저장할 리스트
        results = []

        # 레스토랑 ID별로 처리
        for restaurant_id in restaurant_ids:
            result = process_restaurant_reviews(restaurant_id, db_importer)
            if result:
                results.append(result)

    except Exception as e:
        print(f"❌ 메인 처리 중 오류 발생: {e}")

    finally:
        # 데이터베이스 연결 종료
        db_importer.close()


if __name__ == "__main__":
    main()