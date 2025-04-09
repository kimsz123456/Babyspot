export interface BusinessHoursType {
  [day: string]: string;
}

export interface ConvenienceType {
  convenienceDetails: {
    babyChair: boolean;
    babyTableware: boolean;
    diaperChangingStation: boolean;
    nursingRoom: boolean;
    groupTable: boolean;
    playZone: boolean;
  };
}

export interface ImageType {
  storeImg: string;
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
  images: ImageType[];
  babyAges: number[];
  okZone: boolean;

  convenience: ConvenienceType[];
  kidsMenu: string;

  latitude: number;
  longitude: number;
}
