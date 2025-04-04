import {api} from './api';

export interface ReviewResponseType {
  totalElements: number;
  totalPages: number;
  pageable: {
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
  };
  numberOfElements: number;
  size: number;
  content: ReviewType[];
  number: number;
  sort: SortInfo;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ReviewType {
  reviewId: number;
  memberId: number;
  memberNickname: string;
  babyAges: number[];
  storeId: number;
  storeName: string;
  profile: string;
  reviewCount: number;
  rating: number;
  content: string;
  createdAt: string;
  imgUrls: string[];
  likeCount: number;
  okZone: boolean;
  category: string;
}

export interface ReviewRequestParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export const getStoreReviews = async (storeId: number) => {
  try {
    const response = await api.get(`/reviews/${storeId}/list`);

    return response.data as ReviewResponseType;
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error);
    throw error;
  }
};

export const getMyReviews = async (
  params: ReviewRequestParams = {},
): Promise<ReviewResponseType> => {
  try {
    const defaultParams = {
      page: 0,
      size: 10,
      ...params,
    };
    const result = await api.get('/reviews/myreview', {params: defaultParams});
    return result.data;
  } catch (error) {
    throw error;
  }
};
