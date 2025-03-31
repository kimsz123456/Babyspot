import React from 'react';
import * as S from './styles';
import {
  StarIconProps,
  StarRatingDisplay,
} from 'react-native-star-rating-widget';
import scale from '../../../../../utils/scale';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';
import CustomStarIcon from '../../../../../components/atoms/CustomStarIcon';

const ReviewStar = () => {
  const rating = 3.5;

  return (
    <S.ReviewStarContainer onPress={() => {}}>
      <S.ReviewTextContainer>
        <S.ReviewText>{`방문 후기를 남겨주세요`}</S.ReviewText>
        <S.ReviewStarText>{`${rating} / 5.0`}</S.ReviewStarText>
      </S.ReviewTextContainer>
      <S.StarContainer>
        <StarRatingDisplay
          rating={rating}
          starSize={scale(51)}
          color={PrimaryColors[500]}
          emptyColor={GrayColors[300]}
          StarIconComponent={(props: StarIconProps) => (
            <CustomStarIcon {...props} />
          )}
        />
      </S.StarContainer>
    </S.ReviewStarContainer>
  );
};

export default ReviewStar;
