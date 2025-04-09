import styled from 'styled-components/native';
import {Image, Text, View} from 'react-native';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';

const ReviewContainer = styled(View)`
  gap: ${scale(8)}px;
`;

const ReviewTitleContainer = styled(View)`
  gap: ${scale(8)}px;
  flex-direction: row;
  align-items: center;
`;
const ReviewTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
  font-weight: bold;
  max-width: 60%;
  flex-shrink: 1;
`;
const ReviewScoreContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-top: ${scale(1)}px;
`;
const ReviewStar = styled(Image)`
  height: ${scale(16)}px;
  width: ${scale(16)}px;
`;
const ReviewScore = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${PrimaryColors[500]};
`;
const ReviewDate = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[300]};
`;
const ReviewContents = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export {
  ReviewContainer,
  ReviewTitleContainer,
  ReviewTitle,
  ReviewScoreContainer,
  ReviewStar,
  ReviewScore,
  ReviewDate,
  ReviewContents,
};
