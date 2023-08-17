import { createSlice } from "@reduxjs/toolkit";
import { getAllAccounts, createAccount, updateAccount, deleteAccount } from "./AccountApi";

export const AccountSlice = createSlice({
    name: "Account",
    initialState: {
        accounts: [],
        loading: false,
        error: false,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAccounts.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(getAllAccounts.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.accounts = action.payload.data;
        }
        );

        builder.addCase(getAllAccounts.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(createAccount.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.accounts.push(action.payload.data);
        }
        );

        builder.addCase(createAccount.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(updateAccount.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(updateAccount.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.accounts = state.accounts.map((account: any) => {
                if (account.id === action.payload.data.id) {
                    return action.payload.data;
                }
                return account;
            });
        }
        );

        builder.addCase(updateAccount.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        builder.addCase(deleteAccount.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        }
        );

        builder.addCase(deleteAccount.fulfilled, (state: any, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.accounts = state.accounts.filter((account: any) => account.id !== action.payload.data.id);
        }
        );

        builder.addCase(deleteAccount.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        }
        );

        
    }

});

export default AccountSlice.reducer;
