import os
from dotenv import load_dotenv
from hdfs import InsecureClient

# .env 파일 로드
load_dotenv()

class HDFSClient:
    def __init__(self):
        """HDFS 클라이언트 초기화 (환경 변수 사용)"""
        namenode_url = os.getenv("NAMENODE_URL")
        hdfs_user = os.getenv("HDFS_USER")

        if not namenode_url or not hdfs_user:
            raise ValueError("환경 변수(NAMENODE_URL, HDFS_USER)가 설정되지 않았습니다.")

        self.client = InsecureClient(namenode_url, user=hdfs_user)

    def write_file(self, hdfs_path: str, content: str, overwrite: bool = True):
        """HDFS에 파일 쓰기"""
        self.client.write(hdfs_path, data=content.encode('utf-8'), overwrite=overwrite)
        print(f"✅ 파일 생성 완료: {hdfs_path}")

    def read_file(self, hdfs_path: str) -> str:
        """HDFS에서 파일 읽기"""
        with self.client.read(hdfs_path) as reader:
            content = reader.read().decode('utf-8')
        print(f"📂 파일 내용:\n{content}")
        return content

    def upload_file(self, local_path: str, hdfs_path: str, overwrite: bool = True):
        """로컬 파일을 HDFS에 업로드"""
        if not os.path.exists(local_path):
            raise FileNotFoundError(f"❌ 로컬 파일이 존재하지 않습니다: {local_path}")

        self.client.upload(hdfs_path, local_path, overwrite=overwrite)
        print(f"✅ 파일 업로드 완료: {local_path} → {hdfs_path}")
