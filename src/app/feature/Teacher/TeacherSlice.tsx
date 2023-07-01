import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachers, createTeacher, getTeacherById, updateTeacher, deleteTeacher } from "./TeacherApi";
export const TeacherSlice = createSlice({
    name: "Teacher",
    initialState: {
        getAllTeachers: {
            loading: false,
            error: false,
            success: false,
            teachers: [],
        },
        createTeacher: {
            loading: false,
            error: false,
            success: false,
        },
        getTeacherById: {
            loading: false,
            error: false,
            success: false,
            teacher: {},
        },
        updateTeacher: {
            loading: false,
            error: false,
            success: false,
        },
        deleteTeacher: {
            loading: false,
            error: false,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTeachers.pending, (state) => {
            state.getAllTeachers.loading = true;
            state.getAllTeachers.error = false;
            state.getAllTeachers.success = false;
        }
        );

        builder.addCase(getAllTeachers.fulfilled, (state, action) => {
            state.getAllTeachers.loading = false;
            state.getAllTeachers.error = false;
            state.getAllTeachers.success = true;
            state.getAllTeachers.teachers = action.payload.data;
        }
        );


        builder.addCase(getAllTeachers.rejected, (state) => {
            state.getAllTeachers.loading = false;
            state.getAllTeachers.error = true;
            state.getAllTeachers.success = false;
        }
        );

        builder.addCase(createTeacher.pending, (state) => {
            state.createTeacher.loading = true;
            state.createTeacher.error = false;
            state.createTeacher.success = false;
        }
        );

        builder.addCase(createTeacher.fulfilled, (state) => {
            state.createTeacher.loading = false;
            state.createTeacher.error = false;
            state.createTeacher.success = true;
        }
        );

        builder.addCase(createTeacher.rejected, (state) => {
            state.createTeacher.loading = false;
            state.createTeacher.error = true;
            state.createTeacher.success = false;
        }
        );

        builder.addCase(getTeacherById.pending, (state) => {
            state.getTeacherById.loading = true;
            state.getTeacherById.error = false;
            state.getTeacherById.success = false;
        }
        );

        builder.addCase(getTeacherById.fulfilled, (state, action) => {
            state.getTeacherById.loading = false;
            state.getTeacherById.error = false;
            state.getTeacherById.success = true;
            state.getTeacherById.teacher = action.payload.data;
        }
        );

        builder.addCase(getTeacherById.rejected, (state) => {
            state.getTeacherById.loading = false;
            state.getTeacherById.error = true;
            state.getTeacherById.success = false;
        }
        );

        builder.addCase(updateTeacher.pending, (state) => {
            state.updateTeacher.loading = true;
            state.updateTeacher.error = false;
            state.updateTeacher.success = false;
        }
        );

        builder.addCase(updateTeacher.fulfilled, (state) => {
            state.updateTeacher.loading = false;
            state.updateTeacher.error = false;
            state.updateTeacher.success = true;
        }
        );

        builder.addCase(updateTeacher.rejected, (state) => {
            state.updateTeacher.loading = false;
            state.updateTeacher.error = true;
            state.updateTeacher.success = false;
        }
        );

        builder.addCase(deleteTeacher.pending, (state) => {
            state.deleteTeacher.loading = true;
            state.deleteTeacher.error = false;
            state.deleteTeacher.success = false;
        }
        );

        builder.addCase(deleteTeacher.fulfilled, (state) => {
            state.deleteTeacher.loading = false;
            state.deleteTeacher.error = false;
            state.deleteTeacher.success = true;
        }
        );
    },


});

export default TeacherSlice.reducer;