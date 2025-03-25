from src.config.hdfs_client import HDFSClient
import os

def main():
    # HDFS 클라이언트 인스턴스 생성
    hdfs_client = HDFSClient()

    # 현재 스크립트 파일의 절대 경로 가져오기
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # 로컬 파일 경로 설정 (src/crawling/crawling_raw_data.json)
    local_json_path = os.path.join(current_dir, "crawling", "crawling_raw_data.json")
    hdfs_json_path = "/user/hadoop/crawling_raw_data.json"

    # JSON 파일 업로드
    hdfs_client.upload_file(local_json_path, hdfs_json_path)

    # 파일 읽기
    content = hdfs_client.read_file(hdfs_json_path)

    # 결과 출력
    print(f"\n✅ 최종 읽은 JSON 파일 내용:\n{content}")

if __name__ == "__main__":
    main()
