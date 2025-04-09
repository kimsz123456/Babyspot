const getImageBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error('이미지 불러오기 실패');
  }

  return await response.blob();
};

export default getImageBlob;
