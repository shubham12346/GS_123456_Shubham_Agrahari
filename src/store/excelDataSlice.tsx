import { createSlice } from "@reduxjs/toolkit";
import {
  PlaningInterface,
  SkuInterface,
  StoreInterface,
  CalendarInterface,
} from "../types";
import { Actions } from "../constant";

const initialState = {
  Calculations: [] as any,
  Calendar: [] as CalendarInterface[],
  Chart: [] as any,
  Planning: [] as PlaningInterface[],
  SKUs: [] as SkuInterface[],
  Stores: [] as StoreInterface[],
  PlanningTable: [] as any,
};

const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    clearStore: () => {
      return initialState;
    },
    setExcelData: (state, action) => {
      state.Calculations = action.payload.Calculations;
      state.Calendar = action.payload.Calendar;
      state.Chart = action.payload.Chart;
      state.Planning = action.payload.Planning;
      state.SKUs = action.payload.SKUs;
      state.Stores = action.payload.Stores?.map((store: any) => {
        return {
          ...store,
          SeqNo: store["Seq No."],
        };
      });
    },
    updateStores: (state, action) => {
      console.log("action.payload.type", action.payload);
      switch (action.payload.type) {
        case Actions.Update:
          console.log("action.payload.data", action.payload.data);
          state.Stores = state.Stores.map((store) => {
            if (store.ID === action.payload.data.ID) {
              return {
                ...store,
                [action.payload.data.field]: action.payload.data.value,
              };
            }
            return store;
          });
          break;
        case Actions.Add:
          state.Stores.push(action.payload.data);
          break;
        case Actions.Delete:
          console.log(action.payload.data);
          state.Stores = state.Stores.filter(
            (store) => store.ID !== action.payload.data.ID
          );
      }
    },
    updateSKUs: (state, action) => {
      console.log("action.payload.type", action.payload);
      switch (action.payload.type) {
        case Actions.Update:
          state.SKUs = state.SKUs.map((sku) => {
            if (sku.ID === action.payload.data.ID) {
              return {
                ...sku,
                [action.payload.data.field]: action.payload.data.value,
              };
            }
            return sku;
          });
          break;
        case Actions.Add:
          state.SKUs.push(action.payload.data);
          break;
        case Actions.Delete:
          state.SKUs = state.SKUs.filter(
            (sku) => sku.ID !== action.payload.data
          );
      }
    },
    setPlanningTable: (state, action) => {
      state.PlanningTable = action.payload;
    },
  },
});

export const {
  setExcelData,
  clearStore,
  setPlanningTable,
  updateSKUs,
  updateStores,
} = excelSlice.actions;

export default excelSlice.reducer;
