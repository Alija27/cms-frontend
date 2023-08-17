import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";
import { success_toast } from "../../../toast";
import { error_toast } from "../../../toast";

export const getAllSalaries = createAsyncThunk(
    "getAllSalaries",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/salaries");
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const createSalary = createAsyncThunk(
    "createSalary",
    async (salary: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/salaries", salary);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateSalary = createAsyncThunk(
    "updateSalary",
    async (salary: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put("http://localhost:8000/api/salaries", salary);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteSalary = createAsyncThunk(
    "deleteSalary",
    async (salary: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete("http://localhost:8000/api/salaries/" + salary.id);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getSalaryById = createAsyncThunk(
    "getSalaryById",
    async (id: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("http://localhost:8000/api/salaries/" + id);
            success_toast(res.data);
            return res.data;
        }
        catch (err: any) {
            error_toast(err);
            return rejectWithValue(err.response.data);
        }
    }
);