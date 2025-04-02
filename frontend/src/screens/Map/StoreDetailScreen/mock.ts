import {FamilyReviewProps} from './components/FamilyReview';
import {KeywordSectionProps, ReviewFromTypes} from './components/Keyword';
import {StoreDetailInformationType} from './types';

export const keywordSectionMock: KeywordSectionProps = {
  totalCount: 30,
  keywords: [
    {
      keyword: '청결',
      count: 12,
      keywordReviews: [
        {
          reviewFrom: ReviewFromTypes.Blog,
          content: '아이와 함께 방문했는데 화장실도 깨끗하고 위생적이었어요.',
        },
        {
          reviewFrom: ReviewFromTypes.Place,
          content: '테이블 정리가 잘 되어 있어 쾌적했어요.',
        },
      ],
    },
    {
      keyword: '친절',
      count: 8,
      keywordReviews: [
        {
          reviewFrom: ReviewFromTypes.Blog,
          content: '사장님이 너무 친절해서 기분 좋게 식사했어요.',
        },
        {
          reviewFrom: ReviewFromTypes.Place,
          content: '직원분들이 아이에게도 친절하게 대해주셔서 좋았어요.',
        },
      ],
    },
    {
      keyword: '편의',
      count: 10,
      keywordReviews: [
        {
          reviewFrom: ReviewFromTypes.Blog,
          content: '놀이 공간도 있어서 아이가 심심해하지 않았어요.',
        },
        {
          reviewFrom: ReviewFromTypes.Blog,
          content: '유아식 의자가 준비돼 있어 편했어요.',
        },
      ],
    },
  ],
};

export const familyReviewMocks: FamilyReviewProps = {
  positiveSummary: '“가게가 친절하고 사장님이 맛있어요.”',
  positiveReviews: [
    '가게가 친절하고 사장님이 맛있어요!',
    '귤이 친절하고 구이가 맛있어요!',
    '구이가 친절하고 귤이 맛있어요!',
  ],
  negativeSummary: '“가게가 불친절하고 사장님이 맛없어요.”',
  negativeReviews: [
    '가게가 불친절하고 사장님이 맛없어요...',
    '귤이 불친절하고 구이가 맛없어요...',
    '구이가 불친절하고 귤이 맛없어요...',
  ],
};

const MOCK: StoreDetailInformationType = {
  storeId: 1,
  storeName: '감귤 하우스',
  images: [
    {
      storeImg: 'https://example.com/images/store1.jpg',
    },
    {
      storeImg: 'https://example.com/images/store2.jpg',
    },
  ],
  menus: [
    {
      name: '냉면',
      price: 15000,
      image: 'https://example.com/images/menu1.jpg',
    },
    {
      name: '감귤 밥',
      price: 15000,
      image: 'https://example.com/images/menu2.jpg',
    },
    {
      name: '감귤 냉면',
      price: 15000,
      image: 'https://example.com/images/menu3.jpg',
    },
    {
      name: '구운 제주 감귤 500g',
      price: 15000,
      image: 'https://example.com/images/menu4.jpg',
    },
    {
      name: '감귤 도넛',
      price: 15000,
      image: 'https://example.com/images/menu1.jpg',
    },
    {
      name: '감귤 찌개',
      price: 15000,
      image: 'https://example.com/images/menu2.jpg',
    },
    {
      name: '감귤 온면',
      price: 15000,
      image: 'https://example.com/images/menu3.jpg',
    },
    {
      name: '찐 제주 감귤 500g',
      price: 15000,
      image: 'https://example.com/images/menu4.jpg',
    },
  ],
  keywordsAndReviews: [
    {
      keyword: '자유',
      reviews: [
        '가게가 친절하고 사장님이 맛있어요!',
        '굴이 친절하고 구이가 맛있어요!',
        '구이가 친절하고 굴이 맛있어요!',
      ],
    },
    {
      keyword: '평화',
      reviews: [
        '조용하고 여유로운 분위기입니다.',
        '편안하고 휴식하기 좋은 장소예요.',
      ],
    },
    {
      keyword: '사랑',
      reviews: [
        '가족과 함께하기에 딱 좋은 곳!',
        '연인과 데이트하기에 완벽해요.',
      ],
    },
  ],
  sentiment: {
    positive: [
      '가게가 친절하고 사장님이 맛있어요!',
      '굴이 친절하고 구이가 맛있어요!',
      '구이가 친절하고 굴이 맛있어요!',
    ],
    negative: [],
  },
};

export default MOCK;
