import React from 'react';
import * as S from './styles';
import {AGE_MARKERS} from '../../../../../../constants/constants';
import {IC_HEART} from '../../../../../../constants/icons';
import scale from '../../../../../../utils/scale';
import StarRating from '../../../../../../components/atoms/StarRating';
import {ReviewType} from '../../../../../../services/reviewService';
import {useGlobalStore} from '../../../../../../stores/globalStore';
import {useMapNavigation} from '../../../../../../hooks/useNavigationHooks';

export interface ReviewCardProps extends ReviewType {}

const ReviewCard = (props: ReviewCardProps) => {
  const {memberProfile} = useGlobalStore();
  const navigation = useMapNavigation();

  return (
    <S.ReviewCardContainer
      onPress={() => {
        if (props.memberId == memberProfile?.id) {
          navigation.navigate('WriteReviewScreen', {review: props});
        }
      }}>
      <S.ProfileContainer>
        <S.ProfileImage source={{uri: props.profile}} resizeMode="cover" />
        <S.InformationAndAgeContainer>
          <S.NameAndReviewContainer>
            <S.ProfileNameText numberOfLines={1} ellipsizeMode="tail">
              {props.memberNickname}
            </S.ProfileNameText>
            <S.ProfileReviewText>{`리뷰 ${props.reviewCount}`}</S.ProfileReviewText>
          </S.NameAndReviewContainer>
          <S.AgeMarkerContainer>
            {props.babyAges.map((age, idx) => (
              <S.AgeMarker
                key={idx}
                source={AGE_MARKERS[age]}
                $ageIndex={idx}
              />
            ))}
          </S.AgeMarkerContainer>
        </S.InformationAndAgeContainer>
      </S.ProfileContainer>

      <S.RatingContainer>
        <StarRating rating={props.rating} starSize={scale(16)} isDisplay />
        <S.RatingText>{props.rating.toFixed(1)}</S.RatingText>
      </S.RatingContainer>

      <S.ReviewText>{props.content}</S.ReviewText>

      <S.ImageContainer>
        {props.imgUrls.length > 4 ? (
          <>
            {props.imgUrls?.slice(0, 3).map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            <S.OverlayWrapper key="overlay">
              <S.Images source={{uri: props.imgUrls?.[3]}} />
              <S.OverlayText>+{props.imgUrls.length - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          <>
            {props.imgUrls?.map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            {props.imgUrls?.length != 0 &&
              Array.from({length: 4 - (props.imgUrls?.length || 0)}).map(
                (_, index) => <S.EmptyBox key={index} />,
              )}
          </>
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{props.likeCount}</S.Likes>
        </S.LikesContainer>
        <S.Date>{props.createdAt}</S.Date>
      </S.LastRowContainer>
    </S.ReviewCardContainer>
  );
};

export default ReviewCard;
