import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosInstance  from "../../../config/axiosInstance"
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllTeachers = createAsyncThunk(
    "getAllTeachers",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/teachers");
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createTeacher = createAsyncThunk(  
    "createTeacher",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/teachers", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getTeacherById = createAsyncThunk(
    "getTeacherById",
    async (teacher_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/teachers/${teacher_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateTeacher = createAsyncThunk(
    "updateTeacher",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/teachers/${data.id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);  
        }
    }
);

export const deleteTeacher = createAsyncThunk(
    "deleteTeacher",
    async (teacher_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/teachers/${teacher_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);
