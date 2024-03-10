"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAdminAllCourses = exports.addReplyToReview = exports.addReview = exports.addAnwser = exports.addQuestion = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = exports.editTestQuestion = exports.deleteTestQuestion = exports.getTestQuestions = exports.addTestQuestion = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_Model_1 = __importDefault(require("../models/notification.Model"));
const axios_1 = __importDefault(require("axios"));
const test_Model_1 = __importDefault(require("../models/test.Model"));
// create the test questions
const addTestQuestion = async (req, res, next) => {
    try {
        const { courseId, videoId, questionType, question, options, correctAnswer } = req.body;
        // Check if the course exists
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        // Here, you can use courseId and videoId as needed in your application
        console.log(`Course ID: ${courseId}, Video ID: ${videoId}`);
        let newTestQuestion;
        if (questionType === 'mcq') {
            // Create a new multiple-choice question
            newTestQuestion = new test_Model_1.default({
                courseId,
                videoId,
                question,
                options,
                correctAnswer,
            });
        }
        else if (questionType === 'open-ended') {
            // Create a new open-ended question
            newTestQuestion = new test_Model_1.default({
                courseId,
                videoId,
                question,
                questionType: 'open-ended',
            });
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid question type" });
        }
        const savedTestQuestion = await test_Model_1.default.create(newTestQuestion);
        res.status(201).json({ success: true, testQuestion: savedTestQuestion });
    }
    catch (error) {
        next(error);
    }
};
exports.addTestQuestion = addTestQuestion;
// get all the test data
const getTestQuestions = async (req, res, next) => {
    try {
        const { courseId, videoId } = req.query;
        // You can customize this query based on your application needs
        const query = {};
        if (courseId) {
            query.courseId = courseId;
        }
        if (videoId) {
            query.videoId = videoId;
        }
        const testQuestions = await test_Model_1.default.find(query);
        res.status(200).json({ success: true, testQuestions });
    }
    catch (error) {
        next(error);
    }
};
exports.getTestQuestions = getTestQuestions;
// delete the test
const deleteTestQuestion = async (req, res, next) => {
    try {
        const { testQuestionId } = req.params;
        // Check if the test question exists
        const testQuestion = await test_Model_1.default.findById(testQuestionId);
        if (!testQuestion) {
            return res.status(404).json({ success: false, message: "Test question not found" });
        }
        await test_Model_1.default.findByIdAndDelete(testQuestionId);
        res.status(200).json({ success: true, message: "Test question deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTestQuestion = deleteTestQuestion;
// Edit the test
const editTestQuestion = async (req, res, next) => {
    try {
        const { testQuestionId } = req.params;
        const { question, options, correctAnswer } = req.body;
        // Check if the test question exists
        const testQuestion = await test_Model_1.default.findById(testQuestionId);
        if (!testQuestion) {
            return res.status(404).json({ success: false, message: "Test question not found" });
        }
        // Update the test question fields
        testQuestion.question = question;
        testQuestion.options = options;
        testQuestion.correctAnswer = correctAnswer;
        const updatedTestQuestion = await testQuestion.save();
        res.status(200).json({ success: true, testQuestion: updatedTestQuestion });
    }
    catch (error) {
        next(error);
    }
};
exports.editTestQuestion = editTestQuestion;
// upload course
exports.uploadCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        const notes = data.notes;
        if (notes) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(notes, {
                folder: "courses/notes",
            });
            data.notes = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, course_service_1.createCourse)(data, res, next);
    }
    catch (error) {
        // return next(new ErrorHandler(error.message , 500));
        return next(new ErrorHandler_1.default("error creating here so pls check it", 500));
    }
});
// edit course
exports.editCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        const courseData = await course_model_1.default.findById(courseId);
        if (thumbnail && !thumbnail.startsWith("https")) {
            await cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        if (thumbnail.startsWith("https")) {
            data.thumbnail = {
                public_id: courseData?.thumbnail.public_id,
                url: courseData?.thumbnail.url,
            };
        }
        const course = await course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, { new: true });
        res.status(201).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get single course --- without purchasing
exports.getSingleCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const isCacheExist = await redis_1.redis.get(courseId);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const course = await course_model_1.default.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get all courses --- without purchasing
exports.getAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await course_model_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get course content -- only for valid user
exports.getCourseByUser = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList?.find((course) => course._id.toString() === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addQuestion = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { question, courseId, contentId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const couseContent = course?.courseData?.find((item) => item._id.equals(contentId));
        if (!couseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        // create a new question object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: [],
        };
        // add this question to our course content
        couseContent.questions.push(newQuestion);
        await notification_Model_1.default.create({
            user: req.user?._id,
            title: "New Question Received",
            message: `You have a new question in ${couseContent.title}`,
        });
        // save the updated course
        await course?.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addAnwser = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const couseContent = course?.courseData?.find((item) => item._id.equals(contentId));
        if (!couseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const question = couseContent?.questions?.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid question id", 400));
        }
        // create a new answer object
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        // add this answer to our course content
        question.questionReplies.push(newAnswer);
        await course?.save();
        if (req.user?._id === question.user._id) {
            // create a notification
            await notification_Model_1.default.create({
                user: req.user?._id,
                title: "New Question Reply Received",
                message: `You have a new question reply in ${couseContent.title}`,
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: couseContent.title,
            };
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data,
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addReview = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        // check if courseId already exists in userCourseList based on _id
        const courseExists = userCourseList?.some((course) => course._id.toString() === courseId.toString());
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            rating,
            comment: review,
        };
        course?.reviews.push(reviewData);
        let avg = 0;
        course?.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        if (course) {
            course.ratings = avg / course.reviews.length; // one example we have 2 reviews one is 5 another one is 4 so math working like this = 9 / 2  = 4.5 ratings
        }
        await course?.save();
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
        // create notification
        await notification_Model_1.default.create({
            user: req.user?._id,
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`,
        });
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addReplyToReview = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = course?.reviews?.find((rev) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
            user: req.user,
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        review.commentReplies?.push(replyData);
        await course?.save();
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get all courses --- only for admin
exports.getAdminAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        (0, course_service_1.getAllCoursesService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// Delete Course --- only for admin
exports.deleteCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await course_model_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("course not found", 404));
        }
        await course.deleteOne({ id });
        await redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "course deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// generate video url
exports.generateVideoUrl = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.body;
        const response = await axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//___________________________________________________________________________________________________________________________________________________________________________
//___________________________________________________________________________________________________________________________________________________________________________
// import { NextFunction, Request, Response } from "express";
// import { CatchAsyncError } from "../middleware/catchAsyncErrors";
// import ErrorHandler from "../utils/ErrorHandler";
// import { createCourse, getAllCoursesService } from "../services/course.service";
// import CourseModel, { ICourse, ICourseData, IComment, IReview, ILink, ITestQuestion } from "../models/course.model";
// import { redis } from "../utils/redis";
// import mongoose from "mongoose";
// import cloudinary from "cloudinary";
// import path from "path";
// import ejs from "ejs";
// import sendMail from "../utils/sendMail";
// import NotificationModel from "../models/notification.Model";
// import axios from "axios";
// // Create the test questions
// export const addTestQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { courseId, videoId, questionType, question, options, correctAnswer } = req.body;
//     // Check if the course exists
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ success: false, message: "Course not found" });
//     }
//     // Use courseId and videoId as needed in your application
//     console.log(`Course ID: ${courseId}, Video ID: ${videoId}`);
//     let newTestQuestion: ITestQuestion;
//     if (questionType === 'mcq') {
//       // Create a new multiple-choice question
//       newTestQuestion = {
//         question,
//         options,
//         correctAnswer,
//         courseId,
//         videoId,
//       } as ITestQuestion;
//     } else if (questionType === 'open-ended') {
//       // Create a new open-ended question
//       newTestQuestion = {
//         question,
//         questionType: 'open-ended',
//         courseId,
//         videoId,
//       } as unknown as ITestQuestion;
//     } else {
//       return res.status(400).json({ success: false, message: "Invalid question type" });
//     }
//     // Assuming you want to add the newTestQuestion to the first courseData element
//     course.courseData[0].tests.push(newTestQuestion);
//     await course.save();
//     res.status(201).json({ success: true, testQuestion: newTestQuestion });
//   } catch (error) {
//     next(error);
//   }
// });
// // Get all the test data
// export const getTestQuestions = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { courseId, videoId } = req.query;
//     // Check if the course exists
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ success: false, message: "Course not found" });
//     }
//     // Customize this query based on your application needs
//     const query: any = {};
//     if (videoId) {
//       query.videoId = videoId;
//     }
//     // Assuming you want to get test questions from the first courseData element
//     const testQuestions = course.courseData[0].tests;
//     res.status(200).json({ success: true, testQuestions });
//   } catch (error) {
//     next(error);
//   }
// });
// // Delete the test
// export const deleteTestQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { testQuestionId } = req.params;
//     // Check if the test question exists
//     const course = await CourseModel.findOne({ "courseData.tests._id": testQuestionId });
//     if (!course) {
//       return res.status(404).json({ success: false, message: "Test question not found" });
//     }
//     // Find the correct courseData element
//     const courseDataElement = course.courseData.find((data: any) =>
//       data.tests.some((test: any) => test._id.toString() === testQuestionId)
//     );
//     if (!courseDataElement) {
//       return res.status(404).json({ success: false, message: "Test question not found" });
//     }
//     // Filter the tests array within the specific courseData element
//     courseDataElement.tests = courseDataElement.tests.filter((test: any) => test._id.toString() !== testQuestionId);
//     // Save the updated course
//     await course.save();
//     res.status(200).json({ success: true, message: "Test question deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// });
// // Edit the test
// export const editTestQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { testQuestionId } = req.params;
//     const { question, options, correctAnswer } = req.body;
//     const course = await CourseModel.findOneAndUpdate(
//       { 'courseData.tests._id': testQuestionId },
//       {
//         $set: {
//           'courseData.tests.$.question': question,
//           'courseData.tests.$.options': options,
//           'courseData.tests.$.correctAnswer': correctAnswer,
//         },
//       },
//       { new: true }
//     );
//     if (!course) {
//       return res.status(404).json({ success: false, message: "Test question not found" });
//     }
// const updatedTestQuestion = course.courseData[0]?.tests.find((test: any) => test._id.toString() === testQuestionId);
//     res.status(200).json({ success: true, testQuestion: updatedTestQuestion });
//   } catch (error) {
//     next(error);
//   }
// });
// // Other controller functions...
// // Upload course
// export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = req.body;
//     const thumbnail = data.thumbnail;
//     if (thumbnail) {
//       const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
//         folder: "courses",
//       });
//       data.thumbnail = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };
//     }
//     createCourse(data, res, next);
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Edit course
// export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = req.body;
//     const thumbnail = data.thumbnail;
//     const courseId = req.params.id;
//     const courseData = await CourseModel.findById(courseId) as any;
//     if (thumbnail && !thumbnail.startsWith("https")) {
//       await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
//       const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
//         folder: "courses",
//       });
//       data.thumbnail = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };
//     }
//     if (thumbnail.startsWith("https")) {
//       data.thumbnail = {
//         public_id: courseData?.thumbnail.public_id,
//         url: courseData?.thumbnail.url,
//       };
//     }
//     const course = await CourseModel.findByIdAndUpdate(
//       courseId,
//       {
//         $set: data,
//       },
//       { new: true }
//     );
//     res.status(201).json({
//       success: true,
//       course,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Get single course --- without purchasing
// export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const courseId = req.params.id;
//     const isCacheExist = await redis.get(courseId);
//     if (isCacheExist) {
//       const course = JSON.parse(isCacheExist);
//       res.status(200).json({
//         success: true,
//         course,
//       });
//     } else {
//       const course = await CourseModel.findById(req.params.id).select(
//         "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
//       );
//       await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
//       res.status(200).json({
//         success: true,
//         course,
//       });
//     }
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Get all courses --- without purchasing
// export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const courses = await CourseModel.find().select(
//       "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
//     );
//     res.status(200).json({
//       success: true,
//       courses,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Get course content -- only for a valid user
// export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userCourseList = req.user?.courses;
//     const courseId = req.params.id;
//     const courseExists = userCourseList?.find(
//       (course: any) => course._id.toString() === courseId
//     );
//     if (!courseExists) {
//       return next(
//         new ErrorHandler("You are not eligible to access this course", 404)
//       );
//     }
//     const course = await CourseModel.findById(courseId);
//     const content = course?.courseData;
//     res.status(200).json({
//       success: true,
//       content,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Add question in course
// interface IAddQuestionData {
//   question: string;
//   courseId: string;
//   contentId: string;
// }
// export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { question, courseId, contentId }: IAddQuestionData = req.body;
//     const course = await CourseModel.findById(courseId);
//     if (!mongoose.Types.ObjectId.isValid(contentId)) {
//       return next(new ErrorHandler("Invalid content id", 400));
//     }
//     const courseContent = course?.courseData?.find((item: any) =>
//       item._id.equals(contentId)
//     );
//     if (!courseContent) {
//       return next(new ErrorHandler("Invalid content id", 400));
//     }
//     // create a new question object
//       const newQuestion: any = {
//         user: req.user,
//         question,
//         questionReplies: [],
//       };
//     // Add this question to our course content
//     courseContent.questions.push(newQuestion);
//     await NotificationModel.create({
//       user: req.user?._id,
//       title: "New Question Received",
//       message: `You have a new question in ${courseContent.title}`,
//     });
//     // Save the updated course
//     await course?.save();
//     res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Add answer in course question
// interface IAddAnswerData {
//   answer: string;
//   courseId: string;
//   contentId: string;
//   questionId: string;
// }
// export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { answer, courseId, contentId, questionId }: IAddAnswerData =
//       req.body;
//     const course = await CourseModel.findById(courseId);
//     if (!mongoose.Types.ObjectId.isValid(contentId)) {
//       return next(new ErrorHandler("Invalid content id", 400));
//     }
//     const courseContent = course?.courseData?.find((item: any) =>
//       item._id.equals(contentId)
//     );
//     if (!courseContent) {
//       return next(new ErrorHandler("Invalid content id", 400));
//     }
//     const question = courseContent?.questions?.find((item: any) =>
//       item._id.equals(questionId)
//     );
//     if (!question) {
//               return next(new ErrorHandler("Invalid question id", 400));
//             }
//             // create a new answer object
//             const newAnswer: any = {
//               user: req.user,
//               answer,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             };
//             // add this answer to our course content
//             question.questionReplies.push(newAnswer);
//             await course?.save();
//     if (req.user?._id === question.user._id) {
//       // Create a notification
//       await NotificationModel.create({
//         user: req.user?._id,
//         title: "New Question Reply Received",
//         message: `You have a new question reply in ${courseContent.title}`,
//       });
//     } else {
//       const data = {
//         name: question.user.name,
//         title: courseContent.title,
//       };
//       const html = await ejs.renderFile(
//         path.join(__dirname, "../mails/question-reply.ejs"),
//         data
//       );
//       try {
//         await sendMail({
//           email: question.user.email,
//           subject: "Question Reply",
//           template: "question-reply.ejs",
//           data,
//         });
//       } catch (error: any) {
//         return next(new ErrorHandler(error.message, 500));
//       }
//     }
//     res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Add review in course
// interface IAddReviewData {
//   review: string;
//   rating: number;
//   userId: string;
// }
// export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userCourseList = req.user?.courses;
//     const courseId = req.params.id;
//     // Check if courseId already exists in userCourseList based on _id
//     const courseExists = userCourseList?.some(
//               (course: any) => course._id.toString() === courseId.toString()
//             );
//             if (!courseExists) {
//               return next(
//                 new ErrorHandler("You are not eligible to access this course", 404)
//               );
//             }
//             const course = await CourseModel.findById(courseId);
//             const { review, rating } = req.body as IAddReviewData;
//             const reviewData: any = {
//               user: req.user,
//               rating,
//               comment: review,
//             };
//             course?.reviews.push(reviewData);
//             let avg = 0;
//             course?.reviews.forEach((rev: any) => {
//               avg += rev.rating;
//             });
//             if (course) {
//               course.ratings = avg / course.reviews.length; // one example we have 2 reviews one is 5 another one is 4 so math working like this = 9 / 2  = 4.5 ratings
//             }
//             await course?.save();
//             await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
//     // Create notification
//     await NotificationModel.create({
//       user: req.user?._id,
//       title: "New Review Received",
//       message: `${req.user?.name} has given a review in ${course?.name}`,
//     });
//     res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Add reply to review
// interface IAddReplyData {
//   comment: string;
//   courseId: string;
//   reviewId: string;
// }
// export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { comment, courseId, reviewId } = req.body as IAddReplyData;
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return next(new ErrorHandler("Course not found", 404));
//     }
//     const review = course?.reviews?.find(
//       (rev: any) => rev._id.toString() === reviewId
//     );
//     if (!review) {
//       return next(new ErrorHandler("Review not found", 404));
//     }
//     const replyData: any = {
//       user: req.user,
//       question: comment,
//       questionReplies: [],
//     };
//     if (!review.commentReplies) {
//       review.commentReplies = [];
//     }
//     review.commentReplies?.push(replyData);
//     await course?.save();
//     await redis.set(courseId, JSON.stringify(course), "EX", 604800);
//     res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
// // Get all courses --- only for admin
// export const getAdminAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     getAllTestsService(res);
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });
// // Delete Course --- only for admin
// export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;
//     const course = await CourseModel.findById(id);
//     if (!course) {
//       return next(new ErrorHandler("Course not found", 404));
//     }
//     await course.deleteOne({ id });
//     await redis.del(id);
//     res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });
// // Generate video url
// export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { videoId } = req.body;
//     const response = await axios.post(
//       `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
//       { ttl: 300 },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });
// function getAllTestsService(res: Response<any, Record<string, any>>) {
//   throw new Error("Function not implemented.");
// }
