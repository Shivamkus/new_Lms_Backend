"use strict";
// components/TestForm.js
// import { useState } from "react";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import TestModel from "../../../../../server/models/test.Model";
require("./testForm.css");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const TestForm = (props) => {
    const [active, setActive] = (0, react_1.useState)(0);
    const [testInfo, setTestInfo] = (0, react_1.useState)({
        courseId: "",
        videoId: "",
        question: "",
        correctAnswer: ""
    });
    const [options, setOption] = (0, react_1.useState)([{ options: "",
        }]);
    return (<div className="w-full flex min-h-screen">

    </div>);
};
// useEffect(() => {
//   // Fetch courses when the component mounts
//   const fetchCourses = async () => {
//     try {
//       const response = await fetch("/api/courses"); // Adjust the endpoint URL
//       const data = await response.json();
//       setCourses(data.courses); // Assuming the response structure has a "courses" property
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };
//   fetchCourses();
// }, []); 
// const TestForm = () => {
//   const [courseId, setCourseId] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const newTest = new TestModel({
//         courseId,
//         videoId,
//         question,
//         options,
//         correctAnswer,
//       });
//       await newTest.save();
//       alert("Test added successfully!");
//     } catch (error) {
//       console.error("Error adding test:", error);
//       alert("Failed to add test. Check console for details.");
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Course ID:
//         <select
//           value={courseId}
//           onChange={(e) => setCourseId(e.target.value)}
//         >
//           <option value="" disabled>Select a course</option>
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <label>
//         Video ID:
//         <input
//           type="text"
//           value={videoId}
//           onChange={(e) => setVideoId(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Question:
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Options:
//         {options.map((option, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={option}
//               onChange={(e) => {
//                 const newOptions = [...options];
//                 newOptions[index] = e.target.value;
//                 setOptions(newOptions);
//               }}
//             />
//           </div>
//         ))}
//       </label>
//       <br />
//       <label>
//         Correct Answer:
//         <select
//           value={correctAnswer}
//           onChange={(e) => setCorrectAnswer(e.target.value)}
//         >
//           {options.map((option, index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <button type="submit">Add Test</button>
//     </form>
//   );
// };
exports.default = TestForm;
