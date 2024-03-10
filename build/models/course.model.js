"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies: [Object],
}, { timestamps: true });
const linkSchema = new mongoose_1.Schema({
    title: String,
    url: String,
});
const testQuestionSchema = new mongoose_1.Schema({
    question: String,
    // options: [Object],
    options: [{ optionText: String, isCorrect: Boolean }],
    currectAnswer: String,
    marks: Number,
});
const noteSchema = new mongoose_1.Schema({
    public_id: String,
    url: String,
});
const notesSchema = new mongoose_1.Schema({
    courseName: String,
    title: String,
    notes: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
});
const testAnswerSchema = new mongoose_1.Schema({
    user: Object,
    question: String,
    // options: [Object],
    options: [{ optionText: String, isCorrect: Boolean }],
    currectAnswer: String,
    marks: Number,
});
const commentSchema = new mongoose_1.Schema({
    user: Object,
    question: String,
    questionReplies: [Object],
}, { timestamps: true });
const courseDataSchema = new mongoose_1.Schema({
    videoUrl: String,
    videoThumbnail: Object,
    title: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
    testsQuestions: [testQuestionSchema],
    notes: [notesSchema],
});
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
        // default: "web development",
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedPrice: {
        type: Number,
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    tags: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    demoUrl: {
        type: String,
        required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const CourseModel = mongoose_1.default.model("Course", courseSchema);
exports.default = CourseModel;
////----------------------------___-------------------------------------------------------------------------------------------------------------------------------------------------
//__________________________________________________________________________________________________________________________________________________________________________________
// import mongoose, { Document, Model, Schema } from "mongoose";
// import { IUser } from "./user.model";
// interface IComment extends Document {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// }
// interface IReview extends Document {
//   user: IUser;
//   rating?: number;
//   comment: string;
//   commentReplies?: IReview[];
// }
// interface ILink extends Document {
//   title: string;
//   url: string;
// }
// interface ITestQuestion extends Document {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   courseId: string;
//   videoId: string;
// }
// const testQuestionSchema = new Schema<ITestQuestion>({
//   question: String,
//   options: [String],
//   correctAnswer: String,
//   courseId: String,
//   videoId: String,
// });
// const TestModel: Model<ITestQuestion> = mongoose.model("Test", testQuestionSchema);
// interface ICourseData extends Document {
//   title: string;
//   description: string;
//   videoUrl: string;
//   videoThumbnail: object;
//   videoSection: string;
//   videoLength: number;
//   videoPlayer: string;
//   links: ILink[];
//   suggestion: string;
//   questions: IComment[];
//   tests: ITestQuestion[];
// }
// const linkSchema = new Schema<ILink>({
//   title: String,
//   url: String,
// });
// const commentSchema = new Schema<IComment>({
//   user: Object,
//   question: String,
//   questionReplies: [Object],
// }, { timestamps: true });
// const courseDataSchema = new Schema<ICourseData>({
//   videoUrl: String,
//   videoThumbnail: Object,
//   title: String,
//   videoSection: String,
//   description: String,
//   videoLength: Number,
//   videoPlayer: String,
//   links: [linkSchema],
//   suggestion: String,
//   questions: [commentSchema],
//   tests: [testQuestionSchema],
// }, { timestamps: true });
// interface ICourse extends Document {
//   name: string;
//   description: string;
//   categories: string;
//   price: number;
//   estimatedPrice?: number;
//   thumbnail: object;
//   tags: string;
//   level: string;
//   demoUrl: string;
//   benefits: { title: string }[];
//   prerequisites: { title: string }[];
//   reviews: IReview[];
//   courseData: ICourseData[];
//   ratings?: number;
//   purchased: number;
// }
// const reviewSchema = new Schema<IReview>({
//   user: Object,
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   comment: String,
//   commentReplies: [Object],
// }, { timestamps: true });
// const courseSchema = new Schema<ICourse>({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   categories: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   estimatedPrice: {
//     type: Number,
//   },
//   thumbnail: {
//     public_id: {
//       type: String,
//     },
//     url: {
//       type: String,
//     },
//   },
//   tags: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   demoUrl: {
//     type: String,
//     required: true,
//   },
//   benefits: [{ title: String }],
//   prerequisites: [{ title: String }],
//   reviews: [reviewSchema],
//   courseData: [courseDataSchema],
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   purchased: {
//     type: Number,
//     default: 0,
//   },
// }, { timestamps: true });
// const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
// export default CourseModel;
// export { ICourse, ICourseData, ILink, IComment, IReview, ITestQuestion };
////-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//__________________________________________________________________________________________________________________________________________________________________________________
// import mongoose, { Document, Model, Schema } from "mongoose";
// import { IUser } from "./user.model";
// interface IComment extends Document {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// }
// interface IReview extends Document {
//   user: IUser;
//   rating?: number;
//   comment: string;
//   commentReplies?: IReview[];
// }
// interface ILink extends Document {
//   title: string;
//   url: string;
// }
// interface ITestQuestion extends Document {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   courseId: string;
//   videoId: string;
// }
// const testQuestionSchema = new Schema<ITestQuestion>({
//   question: String,
//   options: [String],
//   correctAnswer: String,
//   courseId: String,
//   videoId: String,
// });
// interface ICourseData extends Document {
//   title: string;
//   description: string;
//   videoUrl: string;
//   videoThumbnail: object;
//   videoSection: string;
//   videoLength: number;
//   videoPlayer: string;
//   links: ILink[];
//   suggestion: string;
//   questions: IComment[];
//   tests: ITestQuestion[];   // Include the ITestQuestion schema here
// }
// const linkSchema = new Schema<ILink>({
//   title: String,
//   url: String,
// });
// const commentSchema = new Schema<IComment>({
//   user: Object,
//   question: String,
//   questionReplies: [Object],
// }, { timestamps: true });
// const courseDataSchema = new Schema<ICourseData>({
//   videoUrl: String,
//   videoThumbnail: Object,
//   title: String,
//   videoSection: String,
//   description: String,
//   videoLength: Number,
//   videoPlayer: String,
//   links: [linkSchema],
//   suggestion: String,
//   questions: [commentSchema],
//   tests: [testQuestionSchema],  // Include the ITestQuestion schema here
// }, { timestamps: true });
// interface ICourse extends Document {
//   name: string;
//   description: string;
//   categories: string;
//   price: number;
//   estimatedPrice?: number;
//   thumbnail: object;
//   tags: string;
//   level: string;
//   demoUrl: string;
//   benefits: { title: string }[];
//   prerequisites: { title: string }[];
//   reviews: IReview[];
//   courseData: ICourseData[];
//   ratings?: number;
//   purchased: number;
// }
// const reviewSchema = new Schema<IReview>({
//   user: Object,
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   comment: String,
//   commentReplies: [Object],
// }, { timestamps: true });
// const courseSchema = new Schema<ICourse>({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   categories: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   estimatedPrice: {
//     type: Number,
//   },
//   thumbnail: {
//     public_id: {
//       type: String,
//     },
//     url: {
//       type: String,
//     },
//   },
//   tags: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   demoUrl: {
//     type: String,
//     required: true,
//   },
//   benefits: [{ title: String }],
//   prerequisites: [{ title: String }],
//   reviews: [reviewSchema],
//   courseData: [courseDataSchema],
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   purchased: {
//     type: Number,
//     default: 0,
//   },
// }, { timestamps: true });
// const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
// export default CourseModel;
// export { ICourse, ICourseData, ILink, IComment, IReview, ITestQuestion };
