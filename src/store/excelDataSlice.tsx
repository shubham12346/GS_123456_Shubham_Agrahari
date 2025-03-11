import { createSlice } from "@reduxjs/toolkit";
import { Store, StoreRedux } from "../types";

const initialState = {
  Calculations: [],
  Calendar: [],
  Chart: [],
  Planning: [],
  SKUs: [],
  Stores: [] as StoreRedux[],
};

const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      console.log("action", action.payload);
      state.Calculations = action.payload.Calculations;
      state.Calendar = action.payload.Calendar;
      state.Chart = action.payload.Chart;
      state.Planning = action.payload.Planning;
      state.SKUs = action.payload.SKUs;
      state.Stores = action.payload.Stores;
    },
  },
});

export const { setExcelData } = excelSlice.actions;
export default excelSlice.reducer;
