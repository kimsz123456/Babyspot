import React, {useState} from 'react';
import * as S from './styles';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

export interface KeywordSectionProps {
  keywords: KeywordProps[];
  totalCount: number;
}

export interface KeywordProps {
  keyword: string;
  count: number;
  keywordReviews: KeywordReviewProps[];
}

export interface KeywordReviewProps {
  reviewFrom: ReviewFromTypes;
  content: string;
}

export enum ReviewFromTypes {
  Blog = '블로그',
  Place = '플레이스',
}

const KeywordSection = ({keywords, totalCount}: KeywordSectionProps) => {
  const navigation = useMapNavigation();

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
        <S.TotalCountText>{totalCount ?? 0}</S.TotalCountText>
      </S.TitleContainer>
      <S.KeywordListContainer>
        {keywords.length == 0 ? (
          <NoDataContainer text="등록된 키워드가 없습니다." />
        ) : (
          visibleKeywords.map((keyword, index) => (
            <S.KeywordBar key={index}>
              <S.ColoredBar $percent={(keyword.count / totalCount) * 100} />
              <S.TextContainer
                onPress={() => {
                  navigation.navigate('KeywordReview', {
                    keywordInformation: keyword,
                  });
                }}>
                <S.KeywordText>{keyword.keyword}</S.KeywordText>
                <S.KeywordCountText>{keyword.count}</S.KeywordCountText>
              </S.TextContainer>
            </S.KeywordBar>
          ))
        )}
      </S.KeywordListContainer>
      {keywords.length > 0 && (
        <MoreButtonWithDivider
          onPressed={handleMoreButtonPress}
          isOpened={isKeywordOpened}
          openedText={'키워드 접기'}
          closedText={'키워드 더 보기'}
        />
      )}
    </S.KeywordSectionContainer>
  );
};

export default KeywordSection;
