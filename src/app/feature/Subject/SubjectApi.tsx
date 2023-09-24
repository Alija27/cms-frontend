import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { error_toast, success_toast } from "../../../toast";


export const getAllSubjects = createAsyncThunk(
    "getAllSubject",
    async (course_id:any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/subjects",{params:{course_id}});
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createSubject = createAsyncThunk(
    "createSubject",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/subjects", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateSubject = createAsyncThunk(
    "updateSubject",
    async ({data, id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/subjects/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteSubject = createAsyncThunk(
    "deleteSubject",
    async (subject_id: any, { rejectWithValue }) => {
        console.log("from subject api")
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/subjects/${subject_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err:any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }

);
