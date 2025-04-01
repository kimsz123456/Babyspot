import axios from 'axios';

import {useOnboardingStore} from '../stores/onboardingStore';
import {postImgPresignedUrl} from '../services/onboardingService';

import getImageBlob from '../utils/getImageBlob';

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
