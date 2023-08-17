import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllResults = createAsyncThunk(
    "getAllResults",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/results");
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createResult = createAsyncThunk(
    "createResult",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/results", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateResult = createAsyncThunk(
    "updateResult",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/results/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteResult = createAsyncThunk(
    "deleteResult",
    async (result_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/results/${result_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);


    
