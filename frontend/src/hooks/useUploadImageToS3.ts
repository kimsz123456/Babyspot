import axios from 'axios';

import {postImgPresignedUrl} from '../services/onboardingService';

import getImageBlob from '../utils/getImageBlob';

interface useUploadImageToS3Props {
  imageName: string | null;
  imageType: string | null;
  imagePath: string | null;
}

const useUploadImageToS3 = ({
  imageName,
  imagePath,
  imageType,
}: useUploadImageToS3Props) => {
  const uploadImage = async () => {
    try {
      const response = await postImgPresignedUrl({
        profileName: imageName || '',
        contentType: imageType || '',
      });

      const {profileImgPreSignedUrl} = response;

      const blob = getImageBlob(imagePath || '');

      await axios.put(profileImgPreSignedUrl, blob, {
        headers: {
          'Content-Type': imageType,
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
