import { createSlice } from "@reduxjs/toolkit";
import { getAllSalaries, createSalary, updateSalary, deleteSalary } from "./SalaryApi";

export const SalarySlice = createSlice({
    name: "Salary",
    initialState: {
        salaries: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSalaries.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllSalaries.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.salaries = action.payload.data;
        }
        );

        builder.addCase(getAllSalaries.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createSalary.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createSalary.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.salaries.push(action.payload.data);
        }
        );

        builder.addCase(createSalary.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateSalary.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateSalary.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.salaries = state.salaries.map((salary: any) => salary.id === action.payload.data.id ? action.payload.data : salary);
        }
        );

        builder.addCase(updateSalary.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteSalary.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteSalary.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.salaries=state.salaries.filter((salary:any)=>salary.id!==action.payload.data.id);
        }
        );

        builder.addCase(deleteSalary.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

    }
});

export default SalarySlice.reducer;