import {MenuType} from '../../../services/mapService';

export interface storeImageType {
  storeImg: string;
}

export interface keywordsAndReviewsType {
  keyword: string;
  reviews: string[];
}

export interface sentimentType {
  positive: string[];
  negative: string[];
}

export interface StoreDetailInformationType {
  storeId: number;
  storeName: string;
  images: storeImageType[];
  menus: MenuType[];
  keywordsAndReviews: keywordsAndReviewsType[];
  sentiment: sentimentType;
}
