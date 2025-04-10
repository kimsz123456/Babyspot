import {api} from './api';
import axios from 'axios';
import Config from 'react-native-config';
import {StoreBasicInformationType} from '../screens/Map/NearStoreListScreen/components/StoreBasicInformation/types';
import {KeywordSectionProps} from '../screens/Map/StoreDetailScreen/components/Keyword';
import {ReviewType} from './reviewService';

// PO3: 공공기관, SW8: 지하철역, SC4: 학교, BK9: 은행행
const IMPORTANT_CATEGORIES = ['PO3', 'SC4', 'SW8', 'BK9'];

interface RangeInfoParameterType {
  topLeftLat: number;
  topLeftLong: number;
  bottomRightLat: number;
  bottomRightLong: number;
}

export interface GetGeocodingByKeywordResponse {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface StoreDetailResponse {
  storeId: number;
  storeName: string;
  images: Image[];
  menus: MenuType[];
  keywordSection: KeywordSectionProps;
  sentiment: Sentiment;
  kidsMenu: KidsMenu[];
  latestReviews: ReviewType[];
  babyAges: number[];
  conveniencePlace: ConveniencePlace[];
  defaultInfo: StoreBasicInformationType;
}

export interface Image {
  storeImg: string;
}

export interface MenuType {
  name: string;
  price: number;
  image: string;
}

export interface KidsMenu {
  babyMenuName: string;
  babyMenuPrice: number | null;
}

export interface Sentiment {
  positiveSummary: string;
  positive: string[];
  negativeSummary: string;
  negative: string[];
}

export interface ConveniencePlace {
  title: string;
  category: ConvenienceCategoryTypes;
  distance: number;
  link: string | null;
}

export enum ConvenienceCategoryTypes {
  Performance = '영화/연극/공연',
  Museum = '전시/기념관',
  Tourist = '관광지',
  ScenicSpot = '명승지',
}

export interface PostReviewsRequest {
  memberId: number;
  storeId: number;
  rating: number;
  content: string;
  babyAges: number[];
  imgNames: string[];
  contentTypes: string[];
}

export interface PostReviewsResponse {
  images: PostReviewsResponseImages[];
}

export interface PostReviewsResponseImages {
  preSignedUrl: string;
  reviewImgKey: string;
  contentType: string;
  imageName: string;
  orderIndex: number;
}

export interface PatchReviewsRequest {
  rating: number;
  content: string;
  existingImageKeys: string[];
  newImages: PatchReviewsRequestImages[];
}
export interface PatchReviewsRequestImages {
  contentType: string;
  imageName: string;
  orderIndex: number;
}

interface PreSignedUrlsType {
  reviewImagePresignedUrl: string;
  reviewImgKey: string;
}

export interface PatchReviewsResponse {
  reviewId: number;
  preSignedUrls: PreSignedUrlsType[];
}

export interface GetRecentSearchPlacesResponse {
  id: number;
  searchTerm: string;
  createAt: string;
}

export const getRangeInfo = async (
  data: RangeInfoParameterType,
): Promise<StoreBasicInformationType[]> => {
  try {
    const result = await api.get(
      `/store/rangeinfo?topLeftLat=${data.topLeftLat}&topLeftLong=${data.topLeftLong}&bottomRightLat=${data.bottomRightLat}&bottomRightLong=${data.bottomRightLong}`,
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getGeocodingByKeyword = async (
  keyword: string,
  x: number,
  y: number,
): Promise<GetGeocodingByKeywordResponse[]> => {
  try {
    const response = await axios.get<{
      documents: GetGeocodingByKeywordResponse[];
    }>(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword,
      )}&x=${x}&y=${y}&sort=distance`,
      {
        headers: {
          Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
        },
      },
    );

    const categoryResponse = IMPORTANT_CATEGORIES.map(code =>
      axios.get<{documents: GetGeocodingByKeywordResponse[]}>(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          keyword,
        )}&category_group_code=${code}`,
        {
          headers: {
            Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
          },
        },
      ),
    );

    const categoryResults = await Promise.all(categoryResponse);

    const mergedMap = new Map<string, GetGeocodingByKeywordResponse>();

    categoryResults.forEach(response =>
      response.data.documents.forEach(document =>
        mergedMap.set(document.id, document),
      ),
    );

    response.data.documents.forEach(document =>
      mergedMap.set(document.id, document),
    );

    return Array.from(mergedMap.values());
  } catch (error) {
    throw error;
  }
};

export const getStoreDetail = async (
  storeId: number,
): Promise<StoreDetailResponse> => {
  try {
    const response = await api.get(`/store/detail?storeId=${storeId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postReviews = async (
  params: PostReviewsRequest,
): Promise<PostReviewsResponse> => {
  try {
    const response = await api.post<PostReviewsResponse>('/reviews', params);

    if (response.status == 201) {
      return response.data;
    } else {
      throw new Error('작성 중 문제가 생겼습니다.');
    }
  } catch (error) {
    throw error;
  }
};

export const patchReviews = async ({
  reviewId,
  params,
}: {
  reviewId: number;
  params: PatchReviewsRequest;
}) => {
  try {
    const response = await api.patch<PatchReviewsResponse>(
      `/reviews/${reviewId}/update`,
      params,
    );

    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error('수정 중 문제가 생겼습니다.');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteReviews = async (reviewId: number) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    if (response.status == 204) {
      return response.data;
    } else {
      throw new Error('삭제 중 문제가 생겼습니다.');
    }
  } catch (error) {
    throw error;
  }
};

export const postRecentSearchPlace = async ({term}: {term: string}) => {
  try {
    const response = await api.post(`/search/record?term=${term}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentSearchPlaces = async () => {
  try {
    const limit = 20;

    const response = await api.get<GetRecentSearchPlacesResponse[]>(
      `/search/recent?limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRecentSearchPlace = async ({
  searchId,
}: {
  searchId: number;
}) => {
  try {
    const response = await api.delete(`/search/recent/${searchId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
