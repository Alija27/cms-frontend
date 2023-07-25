import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
export const getAllStudents = createAsyncThunk(
    "getAllStudents",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/students");
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createStudent = createAsyncThunk(
    "createStudent",    
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/students", data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getStudentById = createAsyncThunk(
    "getStudentById",
    async (student_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/students/${student_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateStudent = createAsyncThunk(
    "updateStudent",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/students/${id}`, data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "deleteStudent",
    async (student_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/students/${student_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }

);