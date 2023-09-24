import { createSlice } from "@reduxjs/toolkit";
import { getAllResults, createResult, updateResult, deleteResult } from "./ResultApi";

export const ResultSlice = createSlice({
    name: "Result",
    initialState: {
        results: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllResults.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllResults.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.results = action.payload.data;
        }
        );

        builder.addCase(getAllResults.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createResult.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createResult.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.results.push(action.payload.data);
        }
        );

        builder.addCase(createResult.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateResult.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateResult.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.results = state.results.map((result: any) => result.id === action.payload.data.id ? action.payload.data : result);
        }
        );

        builder.addCase(updateResult.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(deleteResult.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteResult.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.results = state.results.filter((result: any) => result.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteResult.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }
});

export default ResultSlice.reducer;
