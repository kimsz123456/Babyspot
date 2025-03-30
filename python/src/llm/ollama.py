import requests
import json
import time
from datetime import datetime
from typing import List, Dict, Any


class OllamaClient:
  """Ollama API를 사용하기 위한 클라이언트 클래스"""

  def __init__(self, base_url: str = "http://localhost:11434"):
    """
    Ollama 클라이언트 초기화

    Args:
        base_url (str): Ollama API 서버 URL
    """
    self.base_url = base_url
    self.chat_endpoint = f"{base_url}/api/chat"

  @staticmethod
  def split_message(message: str, chunk_size: int = 2000) -> List[str]:
    """
    메시지를 지정된 길이로 분할합니다.

    Args:
        message (str): 분할할 메시지
        chunk_size (int): 각 청크의 최대 길이

    Returns:
        list: 분할된 메시지 청크 리스트
    """
    chunks = []
    for i in range(0, len(message), chunk_size):
      chunks.append(message[i:i + chunk_size])
    return chunks

  def process_chunk(self, chunk: str, system_prompt: str, model: str) -> Dict[
    str, Any]:
    """
    단일 청크를 LLM에 보내 처리합니다.

    Args:
        chunk (str): 처리할 청크
        system_prompt (str): 시스템 프롬프트/지시사항
        model (str): 사용할 모델 이름

    Returns:
        dict: 처리 결과
    """
    messages = [
      {"role": "system", "content": system_prompt},
      {"role": "user", "content": chunk}
    ]

    data = {
      "model": model,
      "messages": messages,
      "stream": False
    }

    try:
      response = requests.post(
          self.chat_endpoint,
          headers={"Content-Type": "application/json"},
          data=json.dumps(data)
      )

      if response.status_code == 200:
        response_data = response.json()
        return {
          "success": True,
          "content": response_data.get("message", {}).get("content", "")
        }
      else:
        return {
          "success": False,
          "error": f"API 오류: {response.status_code}, {response.text}",
          "content": ""
        }
    except Exception as e:
      return {
        "success": False,
        "error": f"예외 발생: {str(e)}",
        "content": ""
      }

  def chat(self,
      user_message: str,
      system_prompt: str = "",
      stream: bool = False,
      chunk_size: int = 2000) -> Dict[str, Any]:
    """
    메시지를 청크로 나누고 각 청크마다 LLM에 요청을 보냅니다.

    Args:
        user_message (str): 사용자 메시지
        system_prompt (str): 시스템 프롬프트/지시사항
        stream (bool): 스트리밍 응답 여부 (현재 미지원)
        chunk_size (int): 메시지 분할 크기

    Returns:
        dict: API 응답 결과와 메타데이터
    """
    start_time = time.time()
    start_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    # 메시지 청크 분할
    message_chunks = self.split_message(user_message, chunk_size)
    print(f"메시지가 {len(message_chunks)}개 청크로 분할되었습니다.")

    # 각 청크마다 LLM에 요청 보내기
    model = "qwen2.5:14b"  # 모델 고정
    results = []
    error_messages = []

    for i, chunk in enumerate(message_chunks):
      print(f"청크 {i + 1}/{len(message_chunks)} 처리 중...")
      chunk_result = self.process_chunk(chunk, system_prompt, model)

      if chunk_result["success"]:
        results.append(chunk_result["content"])
      else:
        error_message = chunk_result.get("error", "알 수 없는 오류")
        error_messages.append(f"청크 {i + 1} 오류: {error_message}")
        # 오류가 있어도 빈 문자열을 결과에 추가하여 순서 유지
        results.append("")

    # 결과 합치기
    combined_result = "\n\n".join([r for r in results if r])

    # 실행 시간 측정 종료
    end_time = time.time()
    end_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    elapsed_time = end_time - start_time

    # 결과 반환
    result = {
      "content": combined_result,
      "metadata": {
        "model": model,
        "start_time": start_timestamp,
        "end_time": end_timestamp,
        "elapsed_time": f"{elapsed_time:.3f}초",
        "total_chunks": len(message_chunks),
        "successful_chunks": len([r for r in results if r]),
        "errors": error_messages
      }
    }

    return result

  def process_text(self,
      input_text: str,
      system_prompt: str) -> str:
    """
    텍스트를 Ollama를 통해 처리합니다.

    Args:
        input_text (str): 처리할 입력 텍스트
        system_prompt (str): 처리 방법을 지시하는 프롬프트

    Returns:
        str: 처리된 텍스트 결과
    """
    result = self.chat(
        user_message=input_text,
        system_prompt=system_prompt
    )

    return result["content"]