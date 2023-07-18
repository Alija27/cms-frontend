import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";


export const getAllSubjects = createAsyncThunk(
    "getAllSubject",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/subjects");
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
            return res.data;
        }
        catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateSubject = createAsyncThunk(
    "updateSubject",
    async ({data, id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/subjects/${id}`, data);
            return res.data;
        }
        catch (err:any) {
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
            return res.data;
        }
        catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }

);
