import { createSlice } from "@reduxjs/toolkit";
import { getAllCourses, createCourse,  updateCourse, deleteCourse } from "./CourseApi";
    
export const CourseSlice = createSlice({
    name: "Course",
    initialState: {
        courses: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase (getAllCourses.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.courses = action.payload.data;
        }
        );
        builder.addCase(getAllCourses.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(createCourse.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(createCourse.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.courses.push(action.payload.data);
        }
        );
        builder.addCase(createCourse.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(updateCourse.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(updateCourse.fulfilled, (state:any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.courses = state.courses.map((course:any)=>course.id===action.payload.data.id?action.payload.data:course);
        }
        );
        builder.addCase(updateCourse.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
        builder.addCase(deleteCourse.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.courses=state.courses.filter((course:any)=>course.id !== action.payload.data.id);
        }
        );
        builder.addCase(deleteCourse.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }
});
export default CourseSlice.reducer;

