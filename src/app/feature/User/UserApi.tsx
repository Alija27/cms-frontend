import axiosInstance from "../../../config/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
    "getallusers",
    async(undefined,{rejectWithValue})=>{
        try{
            const res= await axiosInstance.get("http://localhost:8000/api/users");
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data);
        }
    }
)

export const createUser = createAsyncThunk(
    "createuser",
    async(data:any,{rejectWithValue})=>{
        try{
            const res=await axiosInstance.post("http://localhost:8000/api/users",data);
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data);
        }
    }
)

export const getUserById = createAsyncThunk(
    "getUserById",
    async(user_id:any, {rejectWithValue})=>{
        try{
            const res=await axiosInstance.get(`http://localhost:8000/api/users/${user_id}`);
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data);
        }
    }
)

export const updateUser = createAsyncThunk(
    "updateUser",
    async(data:any,{rejectWithValue})=>{
        try{
            const res=await axiosInstance.put(`http://localhost/api/user/${data.id}`,data);
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data);
        }
    }
)

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async(user_id:any,{rejectWithValue})=>{
        try{
            const res=await axiosInstance.delete(`http://localhost:8000/api/users/${user_id}`);
            return res.data;
        }
        catch(err:any){
            return rejectWithValue(err.response.data); 
        }
    }
)