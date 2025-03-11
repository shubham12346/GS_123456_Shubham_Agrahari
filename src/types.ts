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
