import {createSlice } from "@reduxjs/toolkit";  
import { getAllBooks, createBook, updateBook, deleteBook } from "./BookApi";
export const BookSlice = createSlice({
    name: "Book",
    initialState: {
        books: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllBooks.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.books = action.payload.data;
        }
        );

        builder.addCase(getAllBooks.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createBook.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        
        builder.addCase(createBook.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.books.push(action.payload.data);
            
            
        }
        );

        builder.addCase(createBook.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateBook.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateBook.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.books = state.books.map((book: any) => book.id === action.payload.data.id ? action.payload.data : book);
        }
        );

        builder.addCase(updateBook.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteBook.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteBook.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.books = state.books.filter((book: any) => book.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteBook.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }
}
);
export default BookSlice.reducer;