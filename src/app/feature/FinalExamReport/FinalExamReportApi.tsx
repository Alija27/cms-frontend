import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllFinalExamReports = createAsyncThunk(
    "getAllFinalExamReports",
    async ({selectedCourse, selectedBatch, selectedSemester}:any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/final-exam-reports?course_id=${selectedCourse}&batch_id=${selectedBatch}&semester_id=${selectedSemester}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createFinalExamReport = createAsyncThunk(
    "createFinalExamReport",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/final-exam-reports", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);  

export const updateFinalExamReport = createAsyncThunk(
    "updateFinalExamReport",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/final-exam-reports/${id}`, data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteFinalExamReport = createAsyncThunk(
    "deleteFinalExamReport",
    async (final_exam_report_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/final-exam-reports/${final_exam_report_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);