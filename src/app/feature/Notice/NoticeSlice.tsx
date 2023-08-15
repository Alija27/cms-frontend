
import { createSlice } from "@reduxjs/toolkit";
import { getAllNotice, createNotice, updateNotice, getNoticeById, deleteNotice } from "./NoticeApi";

const noticeSlice = createSlice({
    name: "notice",
    initialState: {
        notices: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllNotice.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        });

        builder.addCase(getAllNotice.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.notices = action.payload;
        });

        builder.addCase(getAllNotice.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        });

        builder.addCase(createNotice.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        });

        builder.addCase(createNotice.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.notices.push(action.payload);
        });

        builder.addCase(createNotice.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        });

        builder.addCase(updateNotice.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        });

        builder.addCase(updateNotice.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.notices = state.notices.map((notice: any) => notice._id === action.payload._id ? action.payload : notice);
        });

        builder.addCase(updateNotice.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        });

        builder.addCase(getNoticeById.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        });

        builder.addCase(getNoticeById.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.notices = state.notices.map((notice: any) => notice._id === action.payload._id ? action.payload : notice);
        });

        builder.addCase(getNoticeById.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        });

        builder.addCase(deleteNotice.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        });

        builder.addCase(deleteNotice.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.notices = state.notices.filter((notice:any) => notice._id !== action.payload._id);
        });

        builder.addCase(deleteNotice.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        });

    }
});

export default noticeSlice.reducer;



