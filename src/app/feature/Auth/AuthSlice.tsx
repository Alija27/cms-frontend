import { createSlice } from "@reduxjs/toolkit";
import { login,getuser,logout } from "./AuthApi"

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        current_user: null as { roles: string[] } | null,
        login: {
            loading: false,
            error: false,
            success: false,  
        },
        getuser:{
            loading:false,
            error:false,
            success:false,
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
            localStorage.setItem("token", action.payload.token);
            state.login.loading=false;
            state.login.error=false;
            state.login.success=true;
            state.current_user=action.payload.user;
        });

        builder.addCase(login.rejected,(state)=>{
            state.login.loading=false;
            state.login.error=true;
            state.login.success=false;
            state.current_user=null;
        });

        builder.addCase(getuser.pending,(state)=>{
            state.getuser.loading=true;
            state.getuser.error=false;
            state.getuser.success=false;
        });

        builder.addCase(getuser.fulfilled,(state,action)=>{
            state.getuser.loading=false;
            state.getuser.error=false;
            state.getuser.success=true;
            state.current_user=action.payload.data;
        }
        );

        builder.addCase(getuser.rejected,(state)=>{
            state.getuser.loading=false;
            state.getuser.error=true;
            state.getuser.success=false;
            state.current_user=null;
        }
        );

        builder.addCase(logout.pending,(state)=>{
            state.login.loading=true;
            state.login.error=false;
            state.login.success=false;
        }
        );

        builder.addCase(logout.fulfilled,(state)=>{
            state.login.loading=false;
            state.login.error=false;
            state.login.success=true;
            state.current_user=null;
        }
        );

        builder.addCase(logout.rejected,(state)=>{
            state.login.loading=false;
            state.login.error=true;
            state.login.success=false;
        }
        );
        

       



        

    },
});
export default AuthSlice.reducer;