import ReviewType from '../components/MyReview/types';

const mockReviews: ReviewType[] = [
  {
    id: 1,
    storeName: '맛있는 치킨',
    score: 4.5,
    content:
      '치킨이 정말 맛있었어요! 특히 양념이 일품입니다. 자주 와서 먹을 것 같아요.',
    date: '2024-03-25',
  },
  {
    id: 2,
    storeName: '행복한 피자',
    score: 5.0,
    content: '도우가 쫄깃하고 토핑이 풍부해요.',
    date: '2024-03-24',
  },
  {
    id: 3,
    storeName: '든든한 김밥',
    score: 4.0,
    content: '가성비 좋고 양도 많아요!',
    date: '2024-03-23',
  },
];

export default mockReviews;
