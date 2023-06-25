import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

export const login = createAsyncThunk(
    "login",
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(
                "http://localhost:8000/api/login", data
            );
            console.log(res.data);
            return res.data;
        } catch (err: any) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getuser= createAsyncThunk(
    "getuser",
    async(undefined,{rejectWithValue})=>{
        try{
            const res=await axiosInstance.get("http://localhost:8000/api/getuser");
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data);
        }
    }
)

