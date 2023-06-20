import { createSlice } from "@reduxjs/toolkit";
import { login } from "./AuthApi"

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        current_user: null as { roles: string[] } | null,
        login: {
            loading: false,
            error: false,
            success: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.login.loading = true;
                state.login.error = false;
                state.login.success = false;
         
        });
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("token",action.payload.data.token);
            state.login.loading=false;
            state.login.error=false;
            state.login.success=true;
            state.current_user=action.payload.data.user;
        });

        builder.addCase(login.rejected,(state)=>{
            state.login.loading=false;
            state.login.error=true;
            state.login.success=false;
            state.current_user=null;
        });

    },
});
export default AuthSlice.reducer;