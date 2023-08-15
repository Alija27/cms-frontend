import { createSlice } from "@reduxjs/toolkit";
import { getAllExams, createExam, updateExam, deleteExam } from "./ExamApi";

export const ExamSlice = createSlice({
    name: "Exam",
    initialState: {
        exams: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllExams.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllExams.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.exams = action.payload.data;
        }
        );

        builder.addCase(getAllExams.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createExam.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createExam.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.exams.push(action.payload.data);
        }
        );

        builder.addCase(createExam.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateExam.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateExam.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.exams= state.exams.map((exam: any) => exam.id === action.payload.data.id ? action.payload.data : exam);
        }
        );

        builder.addCase(updateExam.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteExam.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteExam.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.exams = state.exams.filter((exam: any) => exam.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteExam.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

    }

});

export default ExamSlice.reducer;