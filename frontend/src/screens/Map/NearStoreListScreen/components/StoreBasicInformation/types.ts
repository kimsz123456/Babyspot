export interface BusinessHoursType {
  [day: string]: string;
}

export interface StoreBasicInformationType {
  storeId: number;
  title: string;
  address: string;
  contactNumber: string;
  businessHour: BusinessHoursType;

  transportationConvenience: string;
  parking: boolean;

  rating: number;
  reviewCount: number;

  category: string;
  imageUrls: string[];
  ages: number[];
  isOKZone: boolean;

  babyChair: boolean;
  babyTableware: boolean;
  strollerAccess: boolean;
  diaperChangingStation: boolean;
  nursingRoom: boolean;
  groupTable: boolean;
  playZone: boolean;
  kidsMenu: string;

  latitude: number;
  longitude: number;
}
