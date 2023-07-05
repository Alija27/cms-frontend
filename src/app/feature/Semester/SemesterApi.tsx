import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";


export const getAllSemesters= createAsyncThunk(
    "getAllSemesters",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/semesters");
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }

);

export const createSemester = createAsyncThunk(
    "createSemester",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/semesters", data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const updateSemester = createAsyncThunk(
    "updateSemester",
    async ({data,id}: any,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/semesters/${id}`, data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getSemesterById = createAsyncThunk(
    "getSemesterById",
    async (semester_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/semesters/${semester_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteSemester = createAsyncThunk(
    "deleteSemester",
    async (semester_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/semesters/${semester_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

