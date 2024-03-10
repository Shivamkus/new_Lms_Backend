"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCrateTestDataQuery = exports.testApi = void 0;
// redux/features/tests/testsApi.ts
const apiSlice_1 = require("../api/apiSlice");
exports.testApi = apiSlice_1.apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        crateTestData: builder.query({
            query: ({ courseId, videoId, question, options, correctAnswer }) => ({
                url: `create-test`,
                method: "POST",
                body: { courseId,
                    videoId,
                    question,
                    options,
                    correctAnswer
                },
                credentials: 'include'
            })
        }),
    })
});
exports.useCrateTestDataQuery = exports.testApi.useCrateTestDataQuery;
