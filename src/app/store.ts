//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import tableKpisReducer from "../features/tableKpisSlice";

export const store = configureStore({
    reducer: {
        tableKpis: tableKpisReducer,
        // Add other reducers as needed
    },
});