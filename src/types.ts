export type ExcelData = any;

export interface Store {
  index: number;
  id: string;
  store: string;
  city: string;
  state: string;
}

export type StoreInterface = {
  ID: string;
  Label: string;
  "Seq No.": number;
  City: string;
  State: string;
  SeqNo?: number;
};
export type dataTable = {
  ID: string;
  Label: string;
  "Seq No.": number;
  City: string;
  State: string;
  SeqNo: number;
};

export type SkuTable = {
  id: string;
  label: string;
  price: number | string;
  cost: number | string;
};

export interface PlaningInterface {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
}
export interface SkuInterface {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

export interface CalendarInterface {
  "Seq No.": number;
  week: string;
  "Week Label": string;
  month: string;
  "Month Label": string;
}
