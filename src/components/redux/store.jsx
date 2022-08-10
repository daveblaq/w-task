import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataReducer";

export const store = configureStore({
  reducer: {
    apidata: dataReducer,
  },
});
