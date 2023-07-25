import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
export const getAllBookTransactions = createAsyncThunk(
    "getAllBookTransactions",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/booktransactions");
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createBookTransaction = createAsyncThunk(
    "createBookTransaction",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/booktransactions", data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateBookTransaction = createAsyncThunk(
    "updateBookTransaction",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/booktransactions/${id}`, data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteBookTransaction = createAsyncThunk(
    "deleteBookTransaction",
    async (bookTransaction_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/booktransactions/${bookTransaction_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);