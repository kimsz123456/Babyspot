import axios from 'axios';

import {postImgPresignedUrl} from '../services/onboardingService';
import {useOnboardingStore} from '../stores/onboardingStore';

const getImageBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error('이미지 불러오기 실패');
  }

  return await response.blob();
};

const useUploadImageToS3 = () => {
  const {profileImageName, profileImageType, profileImagePath} =
    useOnboardingStore();

  const uploadImage = async () => {
    try {
      const response = await postImgPresignedUrl({
        profileName: profileImageName || '',
        contentType: profileImageType || '',
      });

      const {profileImgPreSignedUrl} = response;

      const blob = getImageBlob(profileImagePath || '');

      await axios.put(profileImgPreSignedUrl, blob, {
        headers: {
          'Content-Type': profileImageType,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    uploadImage,
  };
};

export default useUploadImageToS3;
