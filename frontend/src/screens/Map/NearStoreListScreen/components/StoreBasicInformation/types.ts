export interface BusinessHoursType {
  [day: string]: string;
}

export interface StoreBasicInformationType {
  name: string;
  category: string;
  imageUrls: string[];
  ages: number[];
  isOKZone: boolean;
  rating: number;
  numberOfReviews: number;
  businessHours: BusinessHoursType;
}
