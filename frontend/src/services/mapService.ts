import {api} from './api';
import axios from 'axios';
import Config from 'react-native-config';

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
  menus: any[];
  keywordsAndReviews: any[];
  sentiment: Sentiment;
  kidsMenu: KidsMenu[];
  latestReviews: any[];
  babyAges: null;
}

export interface Image {
  storeImg: string;
}

export interface KidsMenu {
  babyMenuName: string;
  babyMenuPrice: null;
}

export interface Sentiment {
  positive: any[];
  negative: any[];
}

export const getRangeInfo = async (data: RangeInfoParameterType) => {
  try {
    const result = await api.get(
      `/store/rangeinfo?topLeftLat=${data.topLeftLat}&topLeftLong=${data.topLeftLong}&bottomRightLat=${data.bottomRightLat}&bottomRightLong=${data.bottomRightLong}`,
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const geocoding = async (
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
