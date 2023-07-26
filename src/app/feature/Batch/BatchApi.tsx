import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { error_toast } from "../../../toast";
import { success_toast } from "../../../toast";
export const getAllBatches = createAsyncThunk(
    "getBatches",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/batches");
            success_toast(res.data);
            return res.data;
            
        }
        catch (err: any) {error_toast(err);
            return rejectWithValue(err.response.data);
            
        }
    }
);

export const createBatch = createAsyncThunk(
    "createBatch",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/batches", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {

            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateBatch = createAsyncThunk(
    "updateBatch",
    async ({ data, id }: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/batches/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteBatch = createAsyncThunk(
    "deleteBatch",
    async (batch_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/batches/${batch_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

