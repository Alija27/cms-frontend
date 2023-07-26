import { createSlice } from "@reduxjs/toolkit";
import { getAllBatches, createBatch, updateBatch, deleteBatch } from "./BatchApi";


export const BatchSlice = createSlice({
    name: "Batch",
    initialState: {
        batches: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBatches.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllBatches.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.batches = action.payload.data;
        }
        );

        builder.addCase(getAllBatches.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createBatch.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        
        builder.addCase(createBatch.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.batches.push(action.payload.data);
            
        }
        );

        builder.addCase(createBatch.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateBatch.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateBatch.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.batches = state.batches.map((batch:any) => {
                if (batch.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return batch;
            });
        }
        );

        builder.addCase(updateBatch.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteBatch.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteBatch.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.batches = state.batches.filter((batch:any) => batch.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteBatch.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

    }
});

export default BatchSlice.reducer;
        
        