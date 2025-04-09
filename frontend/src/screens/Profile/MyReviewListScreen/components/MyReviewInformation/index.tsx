import React, {useState} from 'react';
import {
  IC_GRAY_STAR,
  IC_HEART,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';

import * as S from './styles';
import {ReviewType} from '../../../../../services/reviewService';
import {useProfileNavigation} from '../../../../../hooks/useNavigationHooks';
import GalleryViewer from '../../../../../components/atoms/GalleryViewer';
import {TouchableOpacity} from 'react-native';

interface MyReviewInformationProps {
  review: ReviewType;
}

const MyReviewInformation = ({review}: MyReviewInformationProps) => {
  const totalImages = review.imgUrls.length;
  const navigation = useProfileNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryVisible(true);
  };

  const galleryImages = review.imgUrls.map(imgUrl => ({uri: imgUrl}));

  return (
    <S.MyReviewInformationContainer>
      <S.DetailContainer>
        <S.TitleContainer>
          <S.FirstRowContainer>
            <S.StoreName>{review.storeName}</S.StoreName>
            <S.StoreCategory>{review.category}</S.StoreCategory>
            {review.okZone && (
              <S.OKZoneMarker>
                <S.OKZoneText>OK Zone</S.OKZoneText>
              </S.OKZoneMarker>
            )}
          </S.FirstRowContainer>
          <S.EditTextContainer
            onPress={() => {
              navigation.navigate('WriteReviewScreen', {review: review});
            }}>
            <S.EditText>수정</S.EditText>
          </S.EditTextContainer>
        </S.TitleContainer>
        <S.SecondRowContainer>
          <S.RatingContainer>
            <S.RatingText>내 별점</S.RatingText>
            <S.Rating>{review.rating.toFixed(1)}</S.Rating>
            {[...Array(5)].map((_, i) => (
              <S.SmallIcon
                key={i}
                source={i < review.rating ? IC_YELLOW_STAR : IC_GRAY_STAR}
              />
            ))}
          </S.RatingContainer>
        </S.SecondRowContainer>
        <S.ReviewTextContainer onPress={() => setIsExpanded(!isExpanded)}>
          <S.ReviewText numberOfLines={isExpanded ? undefined : 2}>
            {review.content}
          </S.ReviewText>
        </S.ReviewTextContainer>
      </S.DetailContainer>

      <S.ImageContainer>
        {totalImages > 4 ? (
          <>
            {review.imgUrls.slice(0, 3).map((imageUrl, idx) => (
              <TouchableOpacity
                key={`image-${review.reviewId}-${idx}`}
                onPress={() => openGallery(idx)}>
                <S.Images source={{uri: imageUrl}} />
              </TouchableOpacity>
            ))}
            <S.OverlayWrapper key={`overlay-${review.reviewId}`}>
              <S.Images source={{uri: review.imgUrls[3]}} />
              <S.OverlayText>+{totalImages - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          review.imgUrls.map((imageUrl, idx) => (
            <TouchableOpacity
              key={`image-${review.reviewId}-${idx}`}
              onPress={() => openGallery(idx)}>
              <S.Images source={{uri: imageUrl}} />
            </TouchableOpacity>
          ))
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{review.likeCount}</S.Likes>
        </S.LikesContainer>
        <S.Date>{review.createdAt.slice(0, 10)}</S.Date>
      </S.LastRowContainer>

      <GalleryViewer
        visible={isGalleryVisible}
        images={galleryImages}
        initialIndex={galleryIndex}
        currentIndex={galleryIndex}
        onClose={() => setIsGalleryVisible(false)}
        onIndexChange={setGalleryIndex}
      />
    </S.MyReviewInformationContainer>
  );
};

export default MyReviewInformation;
