import React, {useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import StarRating from '../../../components/atoms/StarRating';
import {IC_DELETE_IMAGE, IC_SECONDARY_PLUS} from '../../../constants/icons';
import MultilineTextInput from '../../../components/atoms/MultilineTextInput';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native';
import MainButton from '../../../components/atoms/Button/MainButton';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';
import {launchImageLibrary} from 'react-native-image-picker';
import scale from '../../../utils/scale';
import {GrayColors, SystemColors} from '../../../constants/colors';
import SubButton from '../../../components/atoms/Button/SubButton';
import CenteredModal from '../../../components/atoms/CenterModal';
import {
  deleteReviews,
  patchReviews,
  PatchReviewsRequest,
  postReviews,
  PostReviewsRequest,
} from '../../../services/mapService';

const MAX_IMAGE_COUNT = 10;

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
  const isWriteScreen = review.reviewId == -1;

  const [starRating, setStarRating] = useState(review.rating);
  const [imagePaths, setImagePaths] = useState<ImageProps[]>([]);
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
      // TODO: 이미지 추가 필요
      const params: PostReviewsRequest = {
        memberId: review.memberId,
        storeId: review.storeId,
        rating: starRating,
        content: content,
        babyAges: review.babyAges,
        imgNames: [],
        contentTypes: [],
      };

      console.log(imagePaths);

      // await postReviews(params);

      navigation.navigate('CompleteScreen', {
        completeType: 'create',
      });
    } catch (error) {
      ToastAndroid.show('작성 중 문제가 발생했습니다.', 500);

      throw error;
    }
  };

  const handleUpdateReview = async () => {
    try {
      // TODO: 이미지 추가 필요
      const params: PatchReviewsRequest = {
        rating: starRating,
        content: content,
        images: [],
      };

      await patchReviews({
        reviewId: review.reviewId,
        params: params,
      });

      navigation.navigate('CompleteScreen', {
        completeType: 'update',
      });
    } catch (error) {
      ToastAndroid.show('수정 중 문제가 발생했습니다.', 500);
      throw error;
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReviews(review.reviewId);

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
                  <S.AddImageText>{`사진을 추가해 주세요`}</S.AddImageText>
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
                initialText={content}
                textEdited={text => {
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
                  color={SystemColors['danger']}
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
        children={<Text>{`리뷰가 사라지며, 복구할 수 없습니다.`}</Text>}
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
