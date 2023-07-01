import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllDepartments = createAsyncThunk(
    "getAllDepartments",
    async (undefined, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:8000/api/departments");
            return res.json();
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
            const res = await fetch("http://localhost:8000/api/departments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return res.json();
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
            const res = await fetch(`http://localhost:8000/api/departments/${department_id}`);
            return res.json();
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateDepartment = createAsyncThunk(
    "updateDepartment",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:8000/api/departments/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return res.json();
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
            const res = await fetch(`http://localhost:8000/api/departments/${department_id}`, {
                method: "DELETE",
            });
            return res.json();
        }
        catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

