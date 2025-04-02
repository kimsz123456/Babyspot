import {postImgPresignedUrl} from '../services/onboardingService';
import getImageBlob from './getImageBlob';

interface uploadImageToS3Props {
  imageName: string | null;
  imageType: string | null;
  imagePath: string | null;
}

const uploadImageToS3 = async ({
  imageName,
  imagePath,
  imageType,
}: uploadImageToS3Props) => {
  try {
    const response = await postImgPresignedUrl({
      profileName: imageName || '',
      contentType: imageType || '',
    });

    const {profileImgPreSignedUrl} = response;

    const blob = await getImageBlob(imagePath || '');

    await fetch(profileImgPreSignedUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': imageType || 'application/octet-stream',
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default uploadImageToS3;
