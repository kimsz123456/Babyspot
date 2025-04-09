import {ReviewType} from '../services/reviewService';

export const sortReview = (reviews: ReviewType[]) => {
  return reviews.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};
