import { createSlice } from "@reduxjs/toolkit"
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from "./UserApi"

export const UserSlice = createSlice({
    name: "User",
    initialState: {
        getAllUsers: {
            loading: false,
            error: false,
            success: false,
            users: [],
        },
        createUser: {
            loading: false,
            error: false,
            success: false,
        },
        getUserById: {
            loading: false,
            error: false,
            success: false,
            user: {},
        },
        updateUser: {
            loading: false,
            error: false,
            success: false,
        },
        deleteUser: {
            loading: false,
            error: false,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.getAllUsers.loading = true;
            state.getAllUsers.error = false;
            state.getAllUsers.success = false;
        }
        );
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.getAllUsers.loading = false;
            state.getAllUsers.error = false;
            state.getAllUsers.success = true;
            state.getAllUsers.users = action.payload.data;
        }
        );
        builder.addCase(getAllUsers.rejected, (state) => {
            state.getAllUsers.loading = false;
            state.getAllUsers.error = true;
            state.getAllUsers.success = false;
        }
        );

        builder.addCase(createUser.pending, (state) => {
            state.createUser.loading = true;
            state.createUser.error = false;
            state.createUser.success = false;
        });
        builder.addCase(createUser.fulfilled, (state) => {
            state.createUser.loading = false;
            state.createUser.error = false;
            state.createUser.success = true;
        });
        builder.addCase(createUser.rejected, (state) => {
            state.createUser.loading = false;
            state.createUser.error = true;
            state.createUser.success = false;
        });

        builder.addCase(getUserById.pending, (state) => {
            state.getUserById.loading = true;
            state.getUserById.error = false;
            state.getUserById.success = false;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.getUserById.loading = false;
            state.getUserById.error = false;
            state.getUserById.success = true;
            state.getUserById.user = action.payload.data;
        });
        builder.addCase(getUserById.rejected, (state) => {
            state.getUserById.loading = false;
            state.getUserById.error = true;
            state.getUserById.success = false;
        });

        builder.addCase(updateUser.pending, (state) => {
            state.updateUser.loading = true;
            state.updateUser.error = false;
            state.updateUser.success = false;
        });
        builder.addCase(updateUser.fulfilled, (state) => {
            state.updateUser.loading = false;
            state.updateUser.error = false;
            state.updateUser.success = true;

        });
        builder.addCase(updateUser.rejected, (state) => {
            state.updateUser.loading = false;
            state.updateUser.error = true;
            state.updateUser.success = false;
        });

        builder.addCase(deleteUser.pending, (state) => {
            state.deleteUser.loading = true;
            state.deleteUser.error = false;
            state.deleteUser.success = false;
        });

        builder.addCase(deleteUser.fulfilled, (state) => {
            state.deleteUser.loading = false;
            state.deleteUser.error = false;
            state.deleteUser.success = true;

        });
        builder.addCase(deleteUser.rejected, (state) => {
            state.deleteUser.loading = false;
            state.deleteUser.error = true;
            state.deleteUser.success = false;
        });

    }

})

export default UserSlice.reducer;

