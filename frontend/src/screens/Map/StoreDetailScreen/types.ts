interface storeImageType {
  storeImg: string;
}

interface menuType {
  name: string;
  price: number;
  image: string;
}

interface keywordsAndReviewsType {
  keyword: string;
  reviews: string[];
}

interface sentimentType {
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
