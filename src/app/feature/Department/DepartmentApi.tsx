import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

export const getAllDepartments = createAsyncThunk(
    "getAllDepartments",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/departments");
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }

);

export const createDepartment = createAsyncThunk(
    "createDepartment",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/departments", data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getDepartmentById = createAsyncThunk(
    "getDepartmentById",
    async (department_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/departments/${department_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }   
);

export const updateDepartment = createAsyncThunk(
    "updateDepartment",
    async ({data,id}: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`http://localhost:8000/api/departments/${id}`, data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "deleteDepartment",
    async (department_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/departments/${department_id}`);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);



