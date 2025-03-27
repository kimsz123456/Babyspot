export interface storeImageType {
  storeImg: string;
}

export interface menuType {
  name: string;
  price: number;
  image: string;
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
  menus: menuType[];
  keywordsAndReviews: keywordsAndReviewsType[];
  sentiment: sentimentType;
}
