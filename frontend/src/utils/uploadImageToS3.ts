import getImageBlob from './getImageBlob';

interface uploadImageToS3Props {
  imageType: string | null;
  imagePath: string | null;
  preSignedUrl: string;
}

const uploadImageToS3 = async ({
  imagePath,
  imageType,
  preSignedUrl,
}: uploadImageToS3Props) => {
  try {
    const blob = await getImageBlob(imagePath || '');

    await fetch(preSignedUrl, {
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
