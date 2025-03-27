import {MyReviewInformationType} from './types';

const MOCK: MyReviewInformationType[] = [
  {
    name: '감귤 하우스',
    category: '한식',
    imageUrls: [
      'https://picsum.photos/600/400?random=1',
      'https://picsum.photos/600/400?random=2',
      'https://picsum.photos/600/400?random=3',
      'https://picsum.photos/600/400?random=4',
    ],
    ages: [2, 3],
    isOKZone: true,
    rating: 4.0,
    review:
      ' 나의 고향... 제주도의 맛이 나는 감귤 집입니다... 감귤은 촉촉했고, 귤밥은 쫀득하니 아주 맛있었습니다. 앞으로 자주 찾을 것 같아요. 응애',
    likes: 12,
    date: '25.03.19',
  },
  {
    name: '청년다방',
    category: '분식',
    imageUrls: [
      'https://picsum.photos/600/400?random=5',
      'https://picsum.photos/600/400?random=6',
      'https://picsum.photos/600/400?random=7',
      'https://picsum.photos/600/400?random=8',
      'https://picsum.photos/600/400?random=9',
      'https://picsum.photos/600/400?random=10',
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12',
      'https://picsum.photos/600/400?random=13',
      'https://picsum.photos/600/400?random=14',
    ],
    ages: [3],
    isOKZone: false,
    rating: 4.0,
    review:
      ' 나의 고향... 제주도의 맛이 나는 감귤 집입니다... 감귤은 촉촉했고, 귤밥은 쫀득하니 아주 맛있었습니다. 앞으로 자주 찾을 것 같아요.',
    likes: 12,
    date: '25.03.19',
  },
  {
    name: '미소야',
    category: '일식',
    imageUrls: [
      'https://picsum.photos/600/400?random=9',
      'https://picsum.photos/600/400?random=10',
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12',
    ],
    ages: [3, 5, 6],
    isOKZone: true,
    rating: 4.0,
    review:
      ' 나의 고향... 제주도의 맛이 나는 감귤 집입니다... 감귤은 촉촉했고, 귤밥은 쫀득하니 아주 맛있었습니다. 앞으로 자주 찾을 것 같아요.',
    likes: 12,
    date: '25.03.19',
  },
];

export default MOCK;
