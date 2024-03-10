"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditLayoutMutation = exports.useCreateLayoutQuery = exports.useGetHeroDataQuery = exports.layoutApi = void 0;
const apiSlice_1 = require("../api/apiSlice");
exports.layoutApi = apiSlice_1.apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLayout: builder.query({
            query: (type) => ({
                url: `create-layout/${type}`,
                method: "POST",
                credentials: "include",
            }),
        }),
        // endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type) => ({
                url: `get-layout/${type}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        editLayout: builder.mutation({
            query: ({ type, image, title, subTitle, faq, categories }) => ({
                url: `edit-layout`,
                body: {
                    type,
                    image,
                    title,
                    subTitle,
                    faq,
                    categories,
                },
                method: "PUT",
                credentials: "include",
            }),
        }),
    }),
});
exports.useGetHeroDataQuery = exports.layoutApi.useGetHeroDataQuery, exports.useCreateLayoutQuery = exports.layoutApi.useCreateLayoutQuery, exports.useEditLayoutMutation = exports.layoutApi.useEditLayoutMutation;
