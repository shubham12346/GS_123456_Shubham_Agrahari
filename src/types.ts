export type ExcelData = any;

export interface Store {
  index: number;
  id: string;
  store: string;
  city: string;
  state: string;
}

export type StoreRedux = {
  ID: string;
  Label: string;
  "Seq No.": number; // Key has a space, so it must be in quotes
  City: string;
  State: string;
};

export type SkuTable = {
  id: string;
  label: string;
  price: number | string;
  cost: number | string;
};

export type SalesData = {
  store: string;
  sku: string;
  salesUnitsWeek1: number;
  salesDollarsWeek1: number;
  gmDollarsWeek1: number;
  gmPercentWeek1: string;
  salesUnitsWeek2: number;
  salesDollarsWeek2: number;
  gmDollarsWeek2: number;
  gmPercentWeek2: string;
};
