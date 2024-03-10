"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateOrderMutation = exports.useCreatePaymentIntentMutation = exports.useGetStripePublishablekeyQuery = exports.useGetAllOrdersQuery = exports.ordersApi = void 0;
const apiSlice_1 = require("../api/apiSlice");
exports.ordersApi = apiSlice_1.apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (type) => ({
                url: `get-orders`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getStripePublishablekey: builder.query({
            query: () => ({
                url: `payment/stripepublishablekey`,
                method: "GET",
                credentials: "include",
            }),
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: "payment",
                method: "POST",
                body: {
                    amount,
                },
                credentials: "include",
            }),
        }),
        createOrder: builder.mutation({
            query: ({ courseId, payment_info }) => ({
                url: "create-order",
                body: {
                    courseId,
                    payment_info,
                },
                method: "POST",
                credentials: "include",
            }),
        }),
    }),
});
exports.useGetAllOrdersQuery = exports.ordersApi.useGetAllOrdersQuery, exports.useGetStripePublishablekeyQuery = exports.ordersApi.useGetStripePublishablekeyQuery, exports.useCreatePaymentIntentMutation = exports.ordersApi.useCreatePaymentIntentMutation, exports.useCreateOrderMutation = exports.ordersApi.useCreateOrderMutation;
