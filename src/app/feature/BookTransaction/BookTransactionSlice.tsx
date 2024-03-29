import {createSlice } from "@reduxjs/toolkit";
import { getAllBookTransactions, createBookTransaction, updateBookTransaction, deleteBookTransaction, updateStatus } from "./BookTransactionApi";
export const BookTransactionSlice = createSlice({
    name: "BookTransaction",
    initialState: {
        bookTransactions:[],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBookTransactions.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllBookTransactions.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.bookTransactions = action.payload.data;
        }
        );

        builder.addCase(getAllBookTransactions.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createBookTransaction.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        
        builder.addCase(createBookTransaction.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.bookTransactions.push(action.payload.data);
            
        }
        );

        builder.addCase(createBookTransaction.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateBookTransaction.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        
        builder.addCase(updateBookTransaction.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.bookTransactions.push(action.payload.data);
            
        }
        );

        builder.addCase(updateBookTransaction.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteBookTransaction.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        
        builder.addCase(deleteBookTransaction.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.bookTransactions=state.bookTransactions.filter((bookTransaction:any)=>bookTransaction.id!==action.payload.data.id);
            
        }
        );

        builder.addCase(deleteBookTransaction.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateStatus.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateStatus.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.bookTransactions=state.bookTransactions.map((bookTransaction:any)=>bookTransaction.id===action.payload.data.id?action.payload.data:bookTransaction);
            
            
        }
        );
        builder.addCase(updateStatus.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }
}
);
export default BookTransactionSlice.reducer;