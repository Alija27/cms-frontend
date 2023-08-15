import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllNotice = createAsyncThunk(
    "getAllNotice",
    async(undefined,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get("http://localhost:8000/api/notices");
            return response.data;
        } catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createNotice = createAsyncThunk(
    "createNotice",
    async(data:any,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.post("http://localhost:8000/api/notices",data);
            success_toast("Notice Created Successfully");
            return response.data;
        } catch (err:any) {
            error_toast(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateNotice = createAsyncThunk(
    "updateNotice",
    async(data:any,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.put(`http://localhost:8000/api/notices/${data.id}`,data);
            success_toast("Notice Updated Successfully");
            return response.data;
        } catch (err:any) {
            error_toast(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteNotice = createAsyncThunk(
    "deleteNotice",
    async(id:any,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.delete(`http://localhost:8000/api/notices/${id}`);
            success_toast("Notice Deleted Successfully");
            return response.data;
        } catch (err:any) {
            error_toast(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getNoticeById = createAsyncThunk(
    "getNoticeById",
    async(id:any,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get(`http://localhost:8000/api/notices/${id}`);
            return response.data;
        } catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }
);



