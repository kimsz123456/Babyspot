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

    def get_directory_files(self, hdfs_directory: str) -> list:
        """HDFS 디렉토리 내의 모든 파일 경로 목록 반환"""
        if not self.client.status(hdfs_directory, strict=False):
            raise FileNotFoundError(f"❌ HDFS 디렉토리가 존재하지 않습니다: {hdfs_directory}")

        files = self.client.list(hdfs_directory)
        full_paths = [f"{hdfs_directory}/{file}" for file in files]
        # JSON 파일만 필터링
        json_files = [path for path in full_paths if path.endswith('.json')]

        print(
            f"📂 디렉토리 '{hdfs_directory}'에서 {len(json_files)}개의 JSON 파일을 찾았습니다.")
        return json_files

    def read_first_json_file(self, hdfs_directory: str) -> str:
        """HDFS 디렉토리 내의 첫 번째 JSON 파일 읽기"""
        files = self.get_directory_files(hdfs_directory)

        if not files:
            raise FileNotFoundError(f"❌ 디렉토리에 JSON 파일이 없습니다: {hdfs_directory}")

        first_file = files[0]
        print(f"📄 첫 번째 파일을 읽습니다: {first_file}")
        return self.read_file(first_file)


    def list_directory(self, hdfs_directory: str) -> list:
        """HDFS 디렉토리 내의 모든 항목(파일 및 디렉토리) 목록 반환"""
        if not self.client.status(hdfs_directory, strict=False):
          raise FileNotFoundError(f"❌ HDFS 디렉토리가 존재하지 않습니다: {hdfs_directory}")

        items = self.client.list(hdfs_directory)
        print(f"📂 디렉토리 '{hdfs_directory}'에서 {len(items)}개의 항목을 찾았습니다.")
        return items

    def get_all_json_files(self, hdfs_directory: str) -> list:
        """
        HDFS 디렉토리와 모든 하위 디렉토리의 JSON 파일 재귀적으로 찾기
        """
        all_json_files = []

        try:
            # 현재 디렉토리의 항목들 가져오기
            items = self.list_directory(hdfs_directory)

            for item in items:
                full_path = f"{hdfs_directory}/{item}"

                # 디렉토리인 경우 재귀적으로 탐색
                try:
                    if self.client.status(full_path, strict=False)[
                        'type'] == 'DIRECTORY':
                        # 하위 디렉토리의 JSON 파일들도 추가
                        all_json_files.extend(
                            self.get_all_json_files(full_path))
                except Exception as e:
                    print(f"디렉토리 탐색 중 오류: {e}")

                # JSON 파일인 경우 추가
                if item.endswith('.json'):
                    all_json_files.append(full_path)

        except FileNotFoundError as e:
            print(f"디렉토리 탐색 실패: {e}")

        print(
            f"📂 디렉토리 '{hdfs_directory}'에서 총 {len(all_json_files)}개의 JSON 파일을 찾았습니다.")
        return all_json_files