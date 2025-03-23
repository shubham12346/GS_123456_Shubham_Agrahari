import { createSlice } from "@reduxjs/toolkit";
import { StoreRedux } from "../types";

const initialState = {
  Calculations: [] as any,
  Calendar: [] as any,
  Chart: [] as any,
  Planning: [] as any,
  SKUs: [] as any,
  Stores: [] as StoreRedux[],
  PlanningTable: [] as any,
};

const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      state.Calculations = action.payload.Calculations;
      state.Calendar = action.payload.Calendar;
      state.Chart = action.payload.Chart;
      state.Planning = action.payload.Planning;
      state.SKUs = action.payload.SKUs;
      state.Stores = action.payload.Stores;
    },
    setPlanningTable: (state, action) => {
      state.PlanningTable = action.payload;
    },
  },
});

export const { setExcelData } = excelSlice.actions;
export default excelSlice.reducer;
