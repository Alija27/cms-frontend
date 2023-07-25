import { createSlice } from "@reduxjs/toolkit";
import { getAllStudents, createStudent, getStudentById, updateStudent, deleteStudent } from "./StudentApi";
export const StudentSlice = createSlice({
    name: "Student",
    initialState: {
        students: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder)    => {
        builder.addCase(getAllStudents.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(getAllStudents.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.students = action.payload.data;
        }
        );
        builder.addCase(getAllStudents.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(createStudent.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(createStudent.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.students.push(action.payload.data);
        }
        );
        builder.addCase(createStudent.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(getStudentById.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(getStudentById.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.students = action.payload.data;
        }
        );
        builder.addCase(getStudentById.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(updateStudent.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(updateStudent.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.students=state.students.filter((student:any)=>student.id!==action.payload.data.id);
        }
        );
        builder.addCase(updateStudent.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(deleteStudent.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(deleteStudent.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.students.push(action.payload.data);
        }
        );
        builder.addCase(deleteStudent.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }   
}
);
export default StudentSlice.reducer;
