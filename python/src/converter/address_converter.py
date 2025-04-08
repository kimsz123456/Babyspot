import os
import json
import requests
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

def naver_geocode(address):
    """
    네이버 지도 API를 사용하여 주소를 지오코딩(좌표 변환)합니다.
    """
    url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"
    headers = {
        "X-NCP-APIGW-API-KEY-ID": os.getenv("CLIENT_ID"),
        "X-NCP-APIGW-API-KEY": os.getenv("CLIENT_SECRET_KEY")
    }
    params = {
        "query": address
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        if data.get('addresses') and len(data['addresses']) > 0:
            first_result = data['addresses'][0]
            lng = float(first_result['x'])  # 경도
            lat = float(first_result['y'])  # 위도
            return f"POINT({lng} {lat})"
        else:
            print(f"주소를 찾을 수 없습니다: {address}")
            return None

    except Exception as e:
        print(f"API 요청 오류: {e}")
        return None