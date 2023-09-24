import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllExams = createAsyncThunk(
    "getAllExams",
    async ({course_id,semester_id}:any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/exams",{params:{course_id,semester_id}});
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createExam = createAsyncThunk(
    "createExam",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/exams", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateExam = createAsyncThunk(
    "updateExam",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/exams/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteExam = createAsyncThunk(
    "deleteExam",
    async (exam_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/exams/${exam_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);



