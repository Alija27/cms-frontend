import { createSlice } from "@reduxjs/toolkit";
import { getAllFinalExamReports, createFinalExamReport, updateFinalExamReport, deleteFinalExamReport } from "./FinalExamReportApi";

export const FinalExamReportSlice = createSlice({
    name: "FinalExamReport",
    initialState: {
        final_exam_reports: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllFinalExamReports.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllFinalExamReports.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.final_exam_reports = action.payload.data;
        }
        );

        builder.addCase(getAllFinalExamReports.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createFinalExamReport.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createFinalExamReport.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.final_exam_reports.push(action.payload.data);
        }
        );

        builder.addCase(createFinalExamReport.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateFinalExamReport.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateFinalExamReport.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.final_exam_reports=state.final_exam_reports.map((final_exam_report: any) => {
                if (final_exam_report.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return final_exam_report;
            }
            );
        }
        );

        builder.addCase(updateFinalExamReport.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteFinalExamReport.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteFinalExamReport.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.final_exam_reports = state.final_exam_reports.filter((final_exam_report: any) => final_exam_report.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteFinalExamReport.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );
    }
}
);

export default FinalExamReportSlice.reducer;