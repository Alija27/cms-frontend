import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllDepartments = createAsyncThunk(
    "getAllDepartments",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/departments");
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }

);

export const createDepartment = createAsyncThunk(
    "createDepartment",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/departments", data);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
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
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "deleteDepartment",
    async (department_id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`http://localhost:8000/api/departments/${department_id}`);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);



