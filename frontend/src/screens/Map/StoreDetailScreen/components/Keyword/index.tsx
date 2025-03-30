import React, {useState} from 'react';
import * as S from './styles';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';

export interface KeywordSectionProps {
  keywords: keywordProps[];
  totalCount: number;
}

interface keywordProps {
  keyword: string;
  count: number;
  keywordReviews: keywordReviewProps[];
}

interface keywordReviewProps {
  reviewFrom: reviewFromTypes;
  content: string;
}

type reviewFromTypes = 'blog' | 'place' | 'cafe';

const KeywordSection = ({keywords, totalCount}: KeywordSectionProps) => {
  const [isKeywordOpened, setIsKeywordOpened] = useState(false);

  const visibleKeywords = isKeywordOpened
    ? keywords.sort((a, b) => b.count - a.count)
    : keywords.slice(0, 3).sort((a, b) => b.count - a.count);

  const handleMoreButtonPress = () => {
    setIsKeywordOpened(prev => !prev);
  };

  return (
    <S.KeywordSectionContainer>
      <S.TitleContainer>
        <S.Title>{`키워드`}</S.Title>
        <S.TotalCountText>{totalCount}</S.TotalCountText>
      </S.TitleContainer>
      <S.KeywordListContainer>
        {visibleKeywords.map((keyword, index) => (
          <S.KeywordBar key={index}>
            <S.ColoredBar $percent={(keyword.count / totalCount) * 100} />
            <S.TextContainer>
              <S.KeywordText>{keyword.keyword}</S.KeywordText>
              <S.KeywordCountText>{keyword.count}</S.KeywordCountText>
            </S.TextContainer>
          </S.KeywordBar>
        ))}
      </S.KeywordListContainer>
      <MoreButtonWithDivider
        onPressed={handleMoreButtonPress}
        isOpened={isKeywordOpened}
        openedText={'키워드 접기'}
        closedText={'키워드 더 보기'}
      />
    </S.KeywordSectionContainer>
  );
};

export default KeywordSection;
