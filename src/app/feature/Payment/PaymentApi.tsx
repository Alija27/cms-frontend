import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllPayments = createAsyncThunk(
    "getAllPayments",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/payments");
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createPayment = createAsyncThunk(
    "createPayment",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/payments", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updatePayment = createAsyncThunk(
    "updatePayment",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/payments/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deletePayment = createAsyncThunk(
    "deletePayment",
    async (payment_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/payments/${payment_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

