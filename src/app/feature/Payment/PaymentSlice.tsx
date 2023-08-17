import { createSlice } from "@reduxjs/toolkit";
import { getAllPayments, createPayment, updatePayment, deletePayment } from "./PaymentApi";

export const PaymentSlice = createSlice({
    name: "Payment",
    initialState: {
        payments: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPayments.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllPayments.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.payments = action.payload.data;
        }
        );

        builder.addCase(getAllPayments.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createPayment.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createPayment.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.payments.push(action.payload.data);
        }
        );

        builder.addCase(createPayment.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updatePayment.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updatePayment.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.payments = state.payments.map((payment: any) => payment.id === action.payload.data.id ? action.payload.data : payment);
        }
        );

        builder.addCase(updatePayment.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deletePayment.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deletePayment.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.payments = state.payments.filter((payment: any) => payment.id !== action.payload.data.id);
        }
        );

        builder.addCase(deletePayment.rejected, (state) => {
            state.loading = false; 
            state.error = true;
            state.success = false;
        }
        );
    }
});

export default PaymentSlice.reducer;