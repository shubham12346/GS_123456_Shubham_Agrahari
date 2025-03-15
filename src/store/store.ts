import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./excelDataSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the middleware
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
