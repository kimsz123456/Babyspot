export interface BusinessHoursType {
  [day: string]: string;
}

export interface AmenitiesType {
  babyChair: boolean;
  babyTableware: boolean;
  diaperChangingStation: boolean;
  nursingRoom: boolean;
  groupTable: boolean;
  playZone: boolean;
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
  babyAges: number[];
  okZone: boolean;

  amenities: AmenitiesType;
  kidsMenu: string;

  latitude: number;
  longitude: number;
}
