import {StoreDetailInformationType} from './types';

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
