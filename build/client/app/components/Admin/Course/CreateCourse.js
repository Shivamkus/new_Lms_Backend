"use strict";
// "use client";
// import React, { useEffect, useState } from "react";
// import CourseInformation from "./CourseInformation";
// import CourseOptions from "./CourseOptions";
// import CourseData from "./CourseData";
// import CourseContent from "./CourseContent";
// import CoursePreview from "./CoursePreview";
// import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
// import { toast } from "react-hot-toast";
// import { redirect } from "next/navigation";
// type Props = {};
// const CreateCourse = (props: Props) => {
//   const [createCourse, { isLoading, isSuccess, error }] =
//     useCreateCourseMutation();
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Course created successfully");
//       redirect("/admin/courses");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [isSuccess, error]);
//   const [active, setActive] = useState(0);
//   const [courseInfo, setCourseInfo] = useState({
//     name: "",
//     description: "",
//     price: "",
//     estimatedPrice: "",
//     tags: "",
//     level: "",
//     categories:"",
//     demoUrl: "",
//     thumbnail: "",
//   });
//   const [benefits, setBenefits] = useState([{ title: "" }]);
//   const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
//   const [courseContentData, setCourseContentData] = useState([
//     {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: "Untitled Section",
//       videoLength: "",
//       links: [
//         {
//           title: "",
//           url: "",
//         },
//       ],
//       suggestion: "",
//     },
//   ]);
//   const [courseData, setCourseData] = useState({});
//   const handleSubmit = async () => {
//     // Format benefits array
//     const formattedBenefits = benefits.map((benefit) => ({
//       title: benefit.title,
//     }));
//     // Format prerequisites array
//     const formattedPrerequisites = prerequisites.map((prerequisite) => ({
//       title: prerequisite.title,
//     }));
//     // Format course content array
//     const formattedCourseContentData = courseContentData.map(
//       (courseContent) => ({
//         videoUrl: courseContent.videoUrl,
//         title: courseContent.title,
//         description: courseContent.description,
//         videoLength: courseContent.videoLength,
//         videoSection: courseContent.videoSection,
//         links: courseContent.links.map((link) => ({
//           title: link.title,
//           url: link.url,
//         })),
//         suggestion: courseContent.suggestion,
//       })
//     );
//     //   prepare our data object
//     const data = {
//       name: courseInfo.name,
//       description: courseInfo.description,
//       categories: courseInfo.categories,
//       price: courseInfo.price,
//       estimatedPrice: courseInfo.estimatedPrice,
//       tags: courseInfo.tags,
//       thumbnail: courseInfo.thumbnail,
//       level: courseInfo.level,
//       demoUrl: courseInfo.demoUrl,
//       totalVideos: courseContentData.length,
//       benefits: formattedBenefits,
//       prerequisites: formattedPrerequisites,
//       courseData: formattedCourseContentData,
//     };
//     setCourseData(data);
//   };
//   const handleCourseCreate = async (e: any) => {
//     const data = courseData;
//     if (!isLoading) {
//       await createCourse(data);
//     }
//   };
//   return (
//     <div className="w-full flex min-h-screen">
//       <div className="w-[80%]">
//         {active === 0 && (
//           <CourseInformation
//             courseInfo={courseInfo}
//             setCourseInfo={setCourseInfo}
//             active={active}
//             setActive={setActive}
//           />
//         )}
//         {active === 1 && (
//           <CourseData
//             benefits={benefits}
//             setBenefits={setBenefits}
//             prerequisites={prerequisites}
//             setPrerequisites={setPrerequisites}
//             active={active}
//             setActive={setActive}
//           />
//         )}
//         {active === 2 && (
//           <CourseContent
//             active={active}
//             setActive={setActive}
//             courseContentData={courseContentData}
//             setCourseContentData={setCourseContentData}
//             handleSubmit={handleSubmit}
//           />
//         )}
//         {active === 3 && (
//           <CoursePreview
//             active={active}
//             setActive={setActive}
//             courseData={courseData}
//             handleCourseCreate={handleCourseCreate}
//           />
//         )}
//       </div>
//       <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
//         <CourseOptions active={active} setActive={setActive} />
//       </div>
//     </div>
//   );
// };
// export default CreateCourse;
//____________________________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________________________
"use client";
// "use client";
// import React, { useEffect, useState } from "react";
// import CourseInformation from "./CourseInformation";
// import CourseOptions from "./CourseOptions";
// import CourseData from "./CourseData";
// import CourseContent from "./CourseContent";
// import CoursePreview from "./CoursePreview";
// import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
// import { toast } from "react-hot-toast";
// import { redirect } from "next/navigation";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const CourseInformation_1 = __importDefault(require("./CourseInformation"));
const CourseOptions_1 = __importDefault(require("./CourseOptions"));
const CourseData_1 = __importDefault(require("./CourseData"));
const CourseContent_1 = __importDefault(require("./CourseContent"));
const CoursePreview_1 = __importDefault(require("./CoursePreview"));
const coursesApi_1 = require("../../../../redux/features/courses/coursesApi");
const react_hot_toast_1 = require("react-hot-toast");
const navigation_1 = require("next/navigation");
const yup_1 = require("yup");
const CreateCourse = (props) => {
    const [createCourse, { isLoading, isSuccess, error }] = (0, coursesApi_1.useCreateCourseMutation)();
    (0, react_1.useEffect)(() => {
        if (isSuccess) {
            react_hot_toast_1.toast.success("Course created successfully");
            (0, navigation_1.redirect)("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error;
                react_hot_toast_1.toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);
    // const [active, setActive] = useState(0);
    // active 3 now after
    const [active, setActive] = (0, react_1.useState)(2);
    const [courseInfo, setCourseInfo] = (0, react_1.useState)({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = (0, react_1.useState)([{ title: "" }]);
    const [prerequisites, setPrerequisites] = (0, react_1.useState)([{ title: "" }]);
    const [courseContentData, setCourseContentData] = (0, react_1.useState)([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
            testsQuestions: [
                {
                    question: "",
                    options: [
                        {
                            optionText: "",
                            isCorrect: yup_1.boolean,
                        },
                    ],
                    currectAnswer: "",
                    marks: 0,
                },
            ],
            // notes: [
            //   {
            //     courseName: "",
            //   title: "",
            //   notes: [
            //     {
            //       public_id: "",
            //       url: "",
            //     },
            //   ],
            //   }
            // ],
            notes: ""
        },
    ]);
    const [courseData, setCourseData] = (0, react_1.useState)({});
    const handleSubmit = async () => {
        // Format benefits array
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));
        // Format prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title,
        }));
        // Format course content array
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
            // notes:  courseContent.notes.map((note) =>({
            //   courseName: note.courseName,
            //   title: note.title,
            //   notes: note.notes.map((notess) =>({
            //       public_id: notess.public_id,
            //       url: notess.url,
            //   }))
            // })),
            notes: courseContent.notes,
            // testsQuestions: courseContent.testsQuestions.map((testsQuestion) => ({
            //   question: testsQuestion.question,
            //   options: testsQuestion.options.map((option) => ({
            //     optionText: option.optionText,
            //     isCorrect: option.isCorrect,
            //   })),
            //   correctAnswer: testsQuestion.correctAnswer,
            //   marks: testsQuestion.marks,
            // })),
            testsQuestions: courseContent.testsQuestions.map((testQuestions) => ({
                question: testQuestions.question,
                options: testQuestions.options.map((option) => ({
                    optionText: option.optionText,
                    isCorrect: option.isCorrect,
                })),
                currectAnswer: testQuestions.currectAnswer,
                marks: testQuestions.marks,
            })),
        }));
        //   prepare our data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            categories: courseInfo.categories,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };
    const handleCourseCreate = async (e) => {
        const data = courseData;
        if (!isLoading) {
            await createCourse(data);
        }
    };
    return (<div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (<CourseInformation_1.default courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive}/>)}

        {active === 1 && (<CourseData_1.default benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} active={active} setActive={setActive}/>)}

        {active === 2 && (<>
            <CourseContent_1.default active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit} optionsArraytest={[]} setOptionsArraytest={function (optionsArray) {
                throw new Error("Function not implemented.");
            }}/>

            {/* <TestField
              active={active}
              setActive={setActive}
              handleSubmit={undefined}
          /> */}
          </>)}

        {active === 3 && (<CoursePreview_1.default active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate}/>)}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions_1.default active={active} setActive={setActive}/>
      </div>
    </div>);
};
exports.default = CreateCourse;
// //____________________________________________________________________________________________________________________________________________
// //____________________________________________________________________________________________________________________________________________
// // Import necessary dependencies and components
// import React, { useEffect, useState } from "react";
// import CourseInformation from "./CourseInformation";
// import CourseOptions from "./CourseOptions";
// import CourseData from "./CourseData";
// import CourseContent from "./CourseContent";
// import CoursePreview from "./CoursePreview";
// import TestField from "./TestField"; // Import the TestField component
// import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
// import { toast } from "react-hot-toast";
// import { redirect } from "next/navigation";
// type Props = {};
// const CreateCourse = (props: Props) => {
//   // State variables for test questions and answers
//   const [testQuestion, setTestQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   // Existing state variables
//   const [createCourse, { isLoading, isSuccess, error }] =
//     useCreateCourseMutation();
//   useEffect(() => {
//     // Handle success and error messages
//     if (isSuccess) {
//       toast.success("Course created successfully");
//       redirect("/admin/courses");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [isSuccess, error]);
//   // Existing state variables
//   const [active, setActive] = useState(0);
//   const [courseInfo, setCourseInfo] = useState({
//     name: "",
//     description: "",
//     price: "",
//     estimatedPrice: "",
//     tags: "",
//     level: "",
//     categories: "",
//     demoUrl: "",
//     thumbnail: "",
//   });
//   const [benefits, setBenefits] = useState([{ title: "" }]);
//   const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
//   const [courseContentData, setCourseContentData] = useState([
//     {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: "Untitled Section",
//       videoLength: "",
//       links: [
//         {
//           title: "",
//           url: "",
//         },
//       ],
//       suggestion: "",
//     },
//   ]);
//   const [courseData, setCourseData] = useState({});
//   const handleSubmit = async () => {
//     // Format benefits array
//     const formattedBenefits = benefits.map((benefit) => ({
//       title: benefit.title,
//     }));
//     // Format prerequisites array
//     const formattedPrerequisites = prerequisites.map((prerequisite) => ({
//       title: prerequisite.title,
//     }));
//     // Format course content array
//     const formattedCourseContentData = courseContentData.map(
//       (courseContent) => ({
//         videoUrl: courseContent.videoUrl,
//         title: courseContent.title,
//         description: courseContent.description,
//         videoLength: courseContent.videoLength,
//         videoSection: courseContent.videoSection,
//         links: courseContent.links.map((link) => ({
//           title: link.title,
//           url: link.url,
//         })),
//         suggestion: courseContent.suggestion,
//       })
//     );
//     // Prepare our data object
//     const data = {
//       name: courseInfo.name,
//       description: courseInfo.description,
//       categories: courseInfo.categories,
//       price: courseInfo.price,
//       estimatedPrice: courseInfo.estimatedPrice,
//       tags: courseInfo.tags,
//       thumbnail: courseInfo.thumbnail,
//       level: courseInfo.level,
//       demoUrl: courseInfo.demoUrl,
//       totalVideos: courseContentData.length,
//       benefits: formattedBenefits,
//       prerequisites: formattedPrerequisites,
//       courseData: formattedCourseContentData,
//     };
//     setCourseData(data);
//   };
//   const handleCourseCreate = async (e: any) => {
//     const data = courseData;
//     if (!isLoading) {
//       await createCourse(data);
//     }
//   };
//   return (
//     <div className="w-full flex min-h-screen">
//       <div className="w-[80%]">
//         {active === 0 && (
//           <CourseInformation
//             courseInfo={courseInfo}
//             setCourseInfo={setCourseInfo}
//             active={active}
//             setActive={setActive}
//           />
//         )}
//         {active === 1 && (
//           <CourseData
//             benefits={benefits}
//             setBenefits={setBenefits}
//             prerequisites={prerequisites}
//             setPrerequisites={setPrerequisites}
//             active={active}
//             setActive={setActive}
//           />
//         )}
//         {active === 2 && (
//           <>
//             {/* Continue with the CourseContent component */}
//             <CourseContent
//               active={active}
//               setActive={setActive}
//               courseContentData={courseContentData}
//               setCourseContentData={setCourseContentData}
//               handleSubmit={handleSubmit}
//             />
//             {/* Add the TestField component */}
//             <TestField
//               testQuestion={testQuestion}
//               setTestQuestion={setTestQuestion}
//               options={options}
//               setOptions={setOptions}
//               correctAnswer={correctAnswer}
//               setCorrectAnswer={setCorrectAnswer}
//             />
//           </>
//         )}
//         {active === 3 && (
//           <CoursePreview
//             active={active}
//             setActive={setActive}
//             courseData={courseData}
//             handleCourseCreate={handleCourseCreate}
//           />
//         )}
//       </div>
//       <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
//         <CourseOptions active={active} setActive={setActive} />
//       </div>
//     </div>
//   );
// };
// export default CreateCourse;
