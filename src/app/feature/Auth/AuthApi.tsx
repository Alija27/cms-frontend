import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { error_toast } from "../../../toast";
import { success_toast } from "../../../toast";

export const login = createAsyncThunk(
    "login",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(
                "http://localhost:8000/api/login", data
            );
            console.log(res.data);
            success_toast(res.data);
            return res.data;
        } catch (err: any) {
            console.log(err);
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getuser = createAsyncThunk(
    "getuser",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/getuser");

            return res.data;
            
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const logout = createAsyncThunk(
    "logout",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/logout");
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
)

