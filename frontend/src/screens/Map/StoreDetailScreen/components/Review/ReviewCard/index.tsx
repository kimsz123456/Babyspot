import React from 'react';
import * as S from './styles';
import {
  StarRatingDisplay,
  StarIconProps,
} from 'react-native-star-rating-widget';
import CustomStarIcon from '../../../../../../components/atoms/CustomStarIcon';
import {PrimaryColors, GrayColors} from '../../../../../../constants/colors';
import {AGE_MARKERS} from '../../../../../../constants/constants';
import {IC_HEART} from '../../../../../../constants/icons';
import scale from '../../../../../../utils/scale';

export interface ReviewCardProps {
  isMine?: boolean;
  name: string;
  profileImagePath: string;
  reviewCount: number;
  imageUrls: string[];
  ages: number[];
  rating: number;
  review: string;
  likes: number;
  date: string;
}

const ReviewCard = (props: ReviewCardProps) => {
  const totalImages = props.imageUrls.length;

  return (
    <S.ReviewCardContainer>
      <S.ProfileContainer>
        <S.ProfileImage
          source={{uri: props.profileImagePath}}
          resizeMode="cover"
        />
        <S.InformationAndAgeContainer>
          <S.NameAndReviewContainer>
            <S.ProfileNameText numberOfLines={1} ellipsizeMode="tail">
              {props.name}
            </S.ProfileNameText>
            <S.ProfileReviewText>{`리뷰 ${props.reviewCount}`}</S.ProfileReviewText>
          </S.NameAndReviewContainer>
          <S.AgeMarkerContainer>
            {props.ages.map((age, idx) => (
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
        <StarRatingDisplay
          rating={props.rating}
          starSize={scale(16)}
          color={PrimaryColors[500]}
          emptyColor={GrayColors[300]}
          starStyle={{
            marginHorizontal: 0,
          }}
          StarIconComponent={(props: StarIconProps) => (
            <CustomStarIcon {...props} />
          )}
        />
        <S.RatingText>{props.rating.toFixed(1)}</S.RatingText>
      </S.RatingContainer>

      <S.ReviewText>{props.review}</S.ReviewText>

      <S.ImageContainer>
        {totalImages > 4 ? (
          <>
            {props.imageUrls.slice(0, 3).map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            <S.OverlayWrapper key="overlay">
              <S.Images source={{uri: props.imageUrls[3]}} />
              <S.OverlayText>+{totalImages - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          <>
            {props.imageUrls.map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            {props.imageUrls.length != 0 &&
              Array.from({length: 4 - props.imageUrls.length}).map(
                (_, index) => <S.EmptyBox key={index} />,
              )}
          </>
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{props.likes}</S.Likes>
        </S.LikesContainer>
        <S.Date>{props.date}</S.Date>
      </S.LastRowContainer>
    </S.ReviewCardContainer>
  );
};

export default ReviewCard;
