import {api} from './api';
import axios from 'axios';
import Config from 'react-native-config';
import {StoreBasicInformationType} from '../screens/Map/NearStoreListScreen/components/StoreBasicInformation/types';
import {KeywordSectionProps} from '../screens/Map/StoreDetailScreen/components/Keyword';
import {ReviewType} from './reviewService';

interface RangeInfoParameterType {
  topLeftLat: number;
  topLeftLong: number;
  bottomRightLat: number;
  bottomRightLong: number;
}
export interface GeocodingResponse {
  address: Address;
  address_name: string;
  address_type: string;
  road_address: RoadAddress;
  x: string;
  y: string;
}

export interface Address {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface RoadAddress {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  sub_building_no: string;
  underground_yn: string;
  x: string;
  y: string;
  zone_no: string;
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
  positive: any[];
  negative: any[];
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
}
export interface PatchReviewsRequest {
  rating: number;
  content: string;
  images: PatchReviewsRequestImages[];
}
export interface PatchReviewsRequestImages {
  contentType: string;
  imageName: string;
  orderIndex: number;
}

export interface PatchReviewsResponse {
  reviewId: number;
  preSignedUrls: string[];
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

export const getGeocoding = async (
  address: string,
): Promise<GeocodingResponse> => {
  try {
    const response = await axios.get<{documents: GeocodingResponse[]}>(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address,
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
        },
      },
    );

    const result = response.data.documents[0];

    return result;
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

export const postReviews = async (params: PostReviewsRequest) => {
  try {
    const response = await api.post<PostReviewsResponse>(`/reviews`, params);

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
