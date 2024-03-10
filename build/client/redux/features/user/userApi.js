"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteUserMutation = exports.useUpdateUserRoleMutation = exports.useGetAllUsersQuery = exports.useUpdatePasswordMutation = exports.useEditProfileMutation = exports.useUpdateAvatarMutation = exports.userApi = void 0;
const apiSlice_1 = require("../api/apiSlice");
exports.userApi = apiSlice_1.apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include",
            }),
        }),
        editProfile: builder.mutation({
            query: ({ name }) => ({
                url: "update-user-info",
                method: "PUT",
                body: {
                    name,
                },
                credentials: "include",
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword,
                },
                credentials: "include",
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "get-users",
                method: "GET",
                credentials: "include",
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({ email, role }) => ({
                url: "update-user",
                method: "PUT",
                body: { email, role },
                credentials: "include",
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete-user/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
});
exports.useUpdateAvatarMutation = exports.userApi.useUpdateAvatarMutation, exports.useEditProfileMutation = exports.userApi.useEditProfileMutation, exports.useUpdatePasswordMutation = exports.userApi.useUpdatePasswordMutation, exports.useGetAllUsersQuery = exports.userApi.useGetAllUsersQuery, exports.useUpdateUserRoleMutation = exports.userApi.useUpdateUserRoleMutation, exports.useDeleteUserMutation = exports.userApi.useDeleteUserMutation;
