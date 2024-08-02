import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Kpi {
    kpi_id: number;
    kpi_name: string;
    site_count: number;
    vendor: string;
    rf_system: string;
    max_score: number;
    score?: number;
    description?: string;
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
            const { index, description } = action.payload;
            if (index >= 0 && index < state.kpis.length) {
                state.kpis[index].description = description;
            } else {
                console.warn(`Invalid index ${index} for updating KPI description.`);
            }
        },
        updateKpiScore(state, action: PayloadAction<{ index: number; score: number }>) {
            const { index, score } = action.payload;
            if (index >= 0 && index < state.kpis.length) {
                const kpi = state.kpis[index];
                const maxScore = kpi.max_score;

                if (score > maxScore) {
                    alert(`Score cannot exceed Max Score (${maxScore})`);
                    return;
                }

                state.kpis = state.kpis.map((kpi, idx) => {
                    if (idx === index) {
                        return { ...kpi, score };
                    }
                    return kpi;
                });
            } else {
                console.warn(`Invalid index ${index} for updating KPI score.`);
            }
        },
    },
});

export const { setKpis, setAttachOpen, setDescOpen, updateKpiDescription, updateKpiScore } = tableKpisSlice.actions;

export default tableKpisSlice.reducer;
