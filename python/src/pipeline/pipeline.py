import os
import time
import json
from datetime import datetime
from typing import Dict, Any, Optional

from src.hadoop.hdfs_client import HDFSClient
from src.llm.ollama import OllamaClient


class Pipeline:
  """
  HDFS에서 데이터를 읽어 Ollama를 통해 처리하는 간소화된 파이프라인
  """

  def __init__(self, ollama_url: str = "http://localhost:11434"):
    """
    파이프라인 초기화

    Args:
        ollama_url (str): Ollama API 서버 URL
    """
    self.hdfs_client = HDFSClient()
    self.ollama_client = OllamaClient(base_url=ollama_url)
    print(f"파이프라인 초기화 완료")

  def process_file(self,
      hdfs_input_path: str,
      system_prompt: str) -> Dict[str, Any]:
    """
    HDFS에서 파일을 읽어 Ollama로 처리한 후 결과를 반환합니다.

    Args:
        hdfs_input_path (str): 입력 파일 HDFS 경로
        system_prompt (str): 데이터 처리 방법을 지시하는 프롬프트

    Returns:
        dict: 처리 결과와 메타데이터
    """
    pipeline_start = time.time()
    start_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    try:
      # 1. HDFS에서 파일 읽기
      print(f"파일 읽기 시작: {hdfs_input_path}")
      input_data = self.hdfs_client.read_file(hdfs_input_path)

      # 2. Ollama로 데이터 처리
      print("데이터 처리 시작")
      result = self.ollama_client.chat(
          user_message=input_data,
          system_prompt=system_prompt
      )
      processed_data = result["content"]

      # 3. 처리 결과 출력
      print("\n===== 처리 결과 =====")
      print(processed_data)
      print("====================\n")

      # 4. 메타데이터 출력
      pipeline_end = time.time()
      elapsed_time = pipeline_end - pipeline_start

      print("\n===== 메타데이터 =====")
      print(f"입력 파일: {hdfs_input_path}")
      print(f"파이프라인 시작 시간: {start_timestamp}")
      print(f"파이프라인 총 소요시간: {elapsed_time:.3f}초")
      print(f"Ollama 소요시간: {result['metadata']['elapsed_time']}")
      print("====================\n")

      return {
        "success": True,
        "content": processed_data,
        "metadata": {
          "elapsed_time": f"{elapsed_time:.3f}초",
          "ollama_metadata": result["metadata"]
        }
      }

    except Exception as e:
      print(f"❌ 파이프라인 오류: {str(e)}")
      return {
        "success": False,
        "error": str(e),
        "content": None,
        "metadata": {
          "input_path": hdfs_input_path,
          "pipeline_start": start_timestamp
        }
      }

  def process_directory(self, hdfs_directory: str, system_prompt: str) -> Dict[
    str, Any]:
    """
    HDFS 디렉토리에서 첫 번째 JSON 파일을 읽어 처리합니다.

    Args:
        hdfs_directory (str): 입력 디렉토리 HDFS 경로
        system_prompt (str): 데이터 처리 방법을 지시하는 프롬프트

    Returns:
        dict: 처리 결과와 메타데이터
    """
    pipeline_start = time.time()
    start_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    try:
      # 1. HDFS 디렉토리에서 첫 번째 JSON 파일 읽기
      print(f"디렉토리 읽기 시작: {hdfs_directory}")
      input_data = self.hdfs_client.read_first_json_file(hdfs_directory)

      # 2. Ollama로 데이터 처리
      print(f"데이터 처리 시작")
      result = self.ollama_client.chat(
          user_message=input_data,
          system_prompt=system_prompt
      )
      processed_data = result["content"]

      # 3. 처리 결과 출력
      print("\n===== 처리 결과 =====")
      print(processed_data)
      print("====================\n")

      # 4. 메타데이터 출력
      pipeline_end = time.time()
      elapsed_time = pipeline_end - pipeline_start

      print("\n===== 메타데이터 =====")
      print(f"입력 디렉토리: {hdfs_directory}")
      print(f"파이프라인 시작 시간: {start_timestamp}")
      print(f"파이프라인 총 소요시간: {elapsed_time:.3f}초")
      print(f"Ollama 소요시간: {result['metadata']['elapsed_time']}")
      print("====================\n")

      return {
        "success": True,
        "content": processed_data,
        "metadata": {
          "elapsed_time": f"{elapsed_time:.3f}초",
          "ollama_metadata": result["metadata"]
        }
      }

    except Exception as e:
      print(f"❌ 디렉토리 처리 오류: {str(e)}")
      return {
        "success": False,
        "error": str(e),
        "content": None,
        "metadata": {
          "directory_path": hdfs_directory,
          "pipeline_start": start_timestamp
        }
      }
