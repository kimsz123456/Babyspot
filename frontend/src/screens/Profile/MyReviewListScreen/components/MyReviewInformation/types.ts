export interface BusinessHoursType {
  [day: string]: string;
}

export interface MyReviewInformationType {
  name: string;
  category: string;
  imageUrls: string[];
  ages: number[];
  isOKZone: boolean;
  rating: number;
  numberOfReviews: number;
  businessHours: BusinessHoursType;
}
