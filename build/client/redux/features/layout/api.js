"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateLayoutMutation = exports.api = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
exports.api = (0, react_1.createApi)({
    baseQuery: (0, react_1.fetchBaseQuery)({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        createLayout: builder.mutation({
            query: (payload) => ({
                url: 'create-layout',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});
exports.useCreateLayoutMutation = exports.api.useCreateLayoutMutation;
