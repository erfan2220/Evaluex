//@ts-nocheck
// tableKpisSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Kpi {
    kpi_id: number;
    kpi_name: string;
    site_count: number;
    vendor: string;
    rf_system: string;
    max_score: number;
}

interface TableKpisState {
    kpis: Kpi[];
    attachOpen: boolean;
    descOpen: boolean;
}

const initialState: TableKpisState = {
    kpis: [],
    attachOpen: false,
    descOpen: false,
};

const tableKpisSlice = createSlice({
    name: 'tableKpis',
    initialState,
    reducers: {
        setKpis(state, action: PayloadAction<Kpi[]>) {
            state.kpis = action.payload;
        },
        setAttachOpen(state, action: PayloadAction<boolean>) {
            state.attachOpen = action.payload;
        },
        setDescOpen(state, action: PayloadAction<boolean>) {
            state.descOpen = action.payload;
        },
        updateKpiDescription(state, action: PayloadAction<{ index: number; description: string }>) {
            state.kpis[action.payload.index].description = action.payload.description;
        },
    },
});

export const { setKpis, setAttachOpen, setDescOpen, updateKpiDescription } = tableKpisSlice.actions;

export default tableKpisSlice.reducer;
