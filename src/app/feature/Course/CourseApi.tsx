import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

    
export const getAllCourses = createAsyncThunk(
    "getAllCourses",
    async (department_id:any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/courses",{params:{department_id}});
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const createCourse = createAsyncThunk(
    "createCourse",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/courses", data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCourse = createAsyncThunk(
    "updateCourse",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/courses/${id}`, data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "deleteCourse",
    async (course_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/courses/${course_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);




