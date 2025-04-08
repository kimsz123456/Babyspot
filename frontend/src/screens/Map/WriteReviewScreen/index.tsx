import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';

import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';
import {useGlobalStore} from '../../../stores/globalStore';

import StarRating from '../../../components/atoms/StarRating';
import MultilineTextInput from '../../../components/atoms/MultilineTextInput';
import MainButton from '../../../components/atoms/Button/MainButton';
import SubButton from '../../../components/atoms/Button/SubButton';
import CenteredModal from '../../../components/atoms/CenterModal';

import {
  deleteReviews,
  patchReviews,
  PatchReviewsRequest,
  postReviews,
  PostReviewsRequest,
} from '../../../services/mapService';
import uploadImageToS3 from '../../../utils/uploadImageToS3';
import scale from '../../../utils/scale';
import {IC_DELETE_IMAGE, IC_SECONDARY_PLUS} from '../../../constants/icons';
import {GrayColors, SystemColors} from '../../../constants/colors';

import * as S from './styles';

const MAX_IMAGE_COUNT = 10;

const CLOUDFRONT_PREFIX = Config.CLOUDFRONT_PREFIX;

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'WriteReviewScreen'>;
interface ImageProps {
  fileName: string;
  uri: string;
  type: string;
}

const WriteReviewScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();
  const navigation = useMapNavigation();
  const {review} = route.params;
  const isWriteScreen = review.reviewId === -1;
  const {setShouldRefreshReviews} = useGlobalStore();

  const [starRating, setStarRating] = useState(review.rating);
  const [imagePaths, setImagePaths] = useState<ImageProps[]>(
    review.imgUrls.map(url => ({
      fileName: url,
      type: 'image/jpeg',
      uri: url,
    })),
  );
  const [content, setContent] = useState(review.content);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleAddImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: MAX_IMAGE_COUNT - imagePaths.length,
      });

      if (result.assets) {
        const existingFileNames = imagePaths.map(img => img.fileName);

        const newImages = result.assets
          .filter(
            image =>
              image.fileName && !existingFileNames.includes(image.fileName),
          )
          .map(image => ({
            fileName: image.fileName || '',
            uri: image.uri || '',
            type: image.type || 'image/jpeg',
          }));

        setImagePaths(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error('이미지 선택 실패:', error);
    }
  };

  const handleCreateReview = async () => {
    try {
      const params: PostReviewsRequest = {
        memberId: review.memberId,
        storeId: review.storeId,
        rating: starRating,
        content: content.trim(),
        babyAges: review.babyAges,
        imgNames: imagePaths.map(image => image.fileName),
        contentTypes: imagePaths.map(image => image.type),
      };

      const reviewResponse = await postReviews(params);
      const {images} = reviewResponse;

      images.map((image, idx) => {
        uploadImageToS3({
          imageType: image.contentType,
          imagePath: imagePaths[idx].uri,
          preSignedUrl: image.preSignedUrl,
        });
      });

      setShouldRefreshReviews(true);

      navigation.navigate('CompleteScreen', {
        completeType: 'create',
      });
    } catch (error) {
      ToastAndroid.show('작성 중 문제가 발생했습니다.', 500);
      throw error;
    }
  };

  const handleUpdateReview = async () => {
    const existingImages = imagePaths.filter(image =>
      image.uri.startsWith('http'),
    );

    const newImages = imagePaths.filter(image => !image.uri.startsWith('http'));

    const existingImageKeys = existingImages.map(image => {
      if (!image.fileName.startsWith(`${CLOUDFRONT_PREFIX}`)) {
        return image.fileName;
      }

      return image.fileName.replace(`${CLOUDFRONT_PREFIX}`, '');
    });

    try {
      const params: PatchReviewsRequest = {
        rating: starRating,
        content: content.trim(),
        existingImageKeys: existingImageKeys.map(image => image.split('?')[0]),
        newImages: newImages.map((image, index) => ({
          imageName: image.fileName,
          contentType: image.type,
          orderIndex: index + existingImageKeys.length,
        })),
      };

      const reviewResponse = await patchReviews({
        reviewId: review.reviewId,
        params: params,
      });

      const {preSignedUrls} = reviewResponse;

      preSignedUrls.map((url, index) => {
        uploadImageToS3({
          imageType: newImages[index].type,
          imagePath: newImages[index].uri,
          preSignedUrl: url.reviewImagePresignedUrl,
        });
      });

      setShouldRefreshReviews(true);

      navigation.navigate('CompleteScreen', {
        completeType: 'update',
      });
    } catch (error) {
      console.error(error);
      ToastAndroid.show('수정 중 문제가 발생했습니다.', 500);
      throw error;
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReviews(review.reviewId);
      setShouldRefreshReviews(true);

      navigation.navigate('CompleteScreen', {
        completeType: 'delete',
      });
    } catch (error) {
      ToastAndroid.show('삭제 중 문제가 발생했습니다.', 500);
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <TouchableNativeFeedback
        onPress={Keyboard.dismiss}
        background={TouchableNativeFeedback.Ripple('#ffffff', false)}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <S.WriteReviewScreenContainer>
            <S.ReviewContainer $isWriteScreen={isWriteScreen}>
              <StarRating
                rating={starRating}
                starSize={51}
                ratingPressed={rating => {
                  setStarRating(rating);
                }}
              />

              {imagePaths.length == 0 ? (
                <S.AddImageButtonContainer
                  onPress={() => {
                    handleAddImage();
                  }}>
                  <S.AddImageText>{'사진을 추가해 주세요'}</S.AddImageText>
                  <S.AddImageSecondaryPlusIcon source={IC_SECONDARY_PLUS} />
                </S.AddImageButtonContainer>
              ) : (
                <S.ImageListContainer
                  horizontal
                  contentContainerStyle={{
                    minWidth: '100%',
                    columnGap: scale(8),
                    paddingHorizontal: scale(24),
                  }}
                  showsHorizontalScrollIndicator={false}>
                  <S.AddImageSmallButtonContainer
                    onPress={() => {
                      handleAddImage();
                    }}>
                    <S.AddImageSmallSecondaryPlusIcon
                      source={IC_SECONDARY_PLUS}
                    />
                    <S.AddImageSmallText>{`${imagePaths.length} / ${MAX_IMAGE_COUNT}`}</S.AddImageSmallText>
                  </S.AddImageSmallButtonContainer>
                  {imagePaths.map((images, index) => {
                    return (
                      <S.ImageContainer
                        key={index}
                        source={{uri: images.uri}}
                        imageStyle={{
                          borderWidth: 1,
                          borderColor: GrayColors[200],
                          borderRadius: scale(10),
                        }}>
                        <S.DeleteIconContainer
                          onPress={() => {
                            setImagePaths(prev =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}>
                          <S.DeleteImageIcon source={IC_DELETE_IMAGE} />
                        </S.DeleteIconContainer>
                      </S.ImageContainer>
                    );
                  })}
                </S.ImageListContainer>
              )}

              <MultilineTextInput
                text={content}
                setText={text => {
                  setContent(text);
                }}
                placeholder={
                  '아이와 함께하기에 어떠셨는지 알려주세요!\n작성 내용은 마이페이지와 해당 매장의 리뷰에 노출 됩니다.'
                }
              />
            </S.ReviewContainer>

            {isWriteScreen ? (
              <MainButton
                disabled={content.length == 0}
                text={'작성 완료'}
                onPress={() => {
                  Keyboard.dismiss();
                  handleCreateReview();
                }}
              />
            ) : (
              <S.ButtonContainer>
                <MainButton
                  disabled={content.length == 0}
                  text={'수정하기'}
                  onPress={() => {
                    Keyboard.dismiss();
                    handleUpdateReview();
                  }}
                />
                <SubButton
                  text={'삭제하기'}
                  color={SystemColors.danger}
                  onPress={() => {
                    Keyboard.dismiss();
                    setDeleteModalVisible(true);
                  }}
                />
              </S.ButtonContainer>
            )}
          </S.WriteReviewScreenContainer>
        </ScrollView>
      </TouchableNativeFeedback>
      <CenteredModal
        visible={deleteModalVisible}
        cancelText={'취소하기'}
        confirmText={'삭제하기'}
        title="정말 리뷰를 삭제할까요?"
        children={<Text>{'리뷰가 사라지며, 복구할 수 없습니다.'}</Text>}
        onCancel={() => {
          setDeleteModalVisible(false);
        }}
        onConfirm={() => {
          setDeleteModalVisible(false);

          handleDeleteReview();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default WriteReviewScreen;
