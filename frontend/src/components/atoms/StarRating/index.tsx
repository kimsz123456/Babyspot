import React from 'react';
import * as S from './styles';
import StarIcon, {StarTypes} from '../StarIcon';
import scale from '../../../utils/scale';
import {Pressable} from 'react-native';

interface StarRatingProps {
  rating: number;
  starSize: number;
  isDisplay?: boolean;
  ratingPressed?: (rating: number) => void;
}

// 0.25 <= ~ < 0.75 까지는 반개.
const StarRating = ({
  rating,
  starSize,
  isDisplay = false,
  ratingPressed,
}: StarRatingProps) => {
  const scaledSize = scale(starSize);

  return (
    <S.StarRatingContainer>
      {Array.from({length: 5}, (_, index) => {
        let starType: StarTypes;
        const starValue = rating - index;

        if (starValue >= 0.75) {
          starType = 'full';
        } else if (starValue >= 0.25) {
          starType = 'half';
        } else {
          starType = 'empty';
        }

        return (
          <Pressable
            key={index}
            disabled={isDisplay}
            onPress={() => {
              ratingPressed?.(index + 1);
            }}>
            <StarIcon size={scaledSize} type={starType} />
          </Pressable>
        );
      })}
    </S.StarRatingContainer>
  );
};

export default StarRating;
