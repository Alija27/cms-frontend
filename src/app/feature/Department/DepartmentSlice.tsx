import { createSlice } from "@reduxjs/toolkit";
import { getAllDepartments,createDepartment,getDepartmentById,updateDepartment, deleteDepartment } from "./DepartmentApi";

export const DepartmentSlice = createSlice({
    name: "Department",
    initialState: {
        getAllDepartments: {
            loading: false,
            error: false,
            success: false,
            departments: [],
        },
        createDepartment: {
            loading: false,
            error: false,
            success: false,
        },
        getDepartmentById: {
            loading: false,
            error: false,
            success: false,
            department: {},
        },
        updateDepartment:{
            loading:false,
            error:false,
            success:false,
        },
        deleteDepartment:{
            loading:false,
            error:false,
            success:false,
        }
        

    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDepartments.pending, (state) => {
            state.getAllDepartments.loading = true;
            state.getAllDepartments.error = false;
            state.getAllDepartments.success = false;
        }
        );

        builder.addCase(getAllDepartments.fulfilled, (state, action) => {
            state.getAllDepartments.loading = false;
            state.getAllDepartments.error = false;
            state.getAllDepartments.success = true;
            state.getAllDepartments.departments = action.payload.data;
        }
        ); 
        builder.addCase(getAllDepartments.rejected, (state) => {
            state.getAllDepartments.loading = false;
            state.getAllDepartments.error = true;
            state.getAllDepartments.success = false;
        }
        );
        builder.addCase(createDepartment.pending, (state) => {
            state.createDepartment.loading = true;
            state.createDepartment.error = false;
            state.createDepartment.success = false;
        }
        );  
        builder.addCase(createDepartment.fulfilled, (state) => {
            state.createDepartment.loading = false;
            state.createDepartment.error = false;
            state.createDepartment.success = true;
        }
        );
        builder.addCase(createDepartment.rejected, (state) => {
            state.createDepartment.loading = false;
            state.createDepartment.error = true;
            state.createDepartment.success = false;
        }
        );

        builder.addCase(getDepartmentById.pending,(state)=>{
            state.getDepartmentById.loading=true;
            state.getDepartmentById.error=false;
            state.getDepartmentById.success=false;
        }

        );

        builder.addCase(getDepartmentById.fulfilled,(state,action)=>{
           state.getDepartmentById.loading=false;
           state.getDepartmentById.error=false,
           state.getDepartmentById.success=true,
           state.getDepartmentById.department=action.payload.data;
        });

        builder.addCase(getDepartmentById.rejected,(state)=>{
            state.getDepartmentById.loading=false;
            state.getDepartmentById.error=true;
            state.getDepartmentById.success=false;
        }); 
        
        builder.addCase(updateDepartment.pending,(state)=>{
            state.updateDepartment.loading=true;
            state.updateDepartment.error=false;
            state.updateDepartment.success=false;
        }
        );

        builder.addCase(updateDepartment.fulfilled,(state)=>{
            state.updateDepartment.loading=false;
            state.updateDepartment.error=false;
            state.updateDepartment.success=true;
        }
        );

        builder.addCase(updateDepartment.rejected,(state)=>{
            state.updateDepartment.loading=false;
            state.updateDepartment.error=true;
            state.updateDepartment.success=false;
        }
        );

        builder.addCase(deleteDepartment.pending,(state)=>{
            state.deleteDepartment.loading=true;
            state.deleteDepartment.error=false;
            state.deleteDepartment.success=false;
        }
        );

        builder.addCase(deleteDepartment.fulfilled,(state)=>{
            state.deleteDepartment.loading=false;
            state.deleteDepartment.error=false;
            state.deleteDepartment.success=true;
        }
        );

        builder.addCase(deleteDepartment.rejected,(state)=>{
            state.deleteDepartment.loading=false;
            state.deleteDepartment.error=true;
            state.deleteDepartment.success=false;
        }
        );
    },

});

export default DepartmentSlice.reducer;