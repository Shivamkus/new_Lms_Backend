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
const react_1 = __importStar(require("react"));
const bs_1 = require("react-icons/bs");
const md_1 = require("react-icons/md");
const CourseContentList = (props) => {
    const [visibleSections, setVisibleSections] = (0, react_1.useState)(new Set());
    // Find unique video sections
    const videoSections = [
        ...new Set(props.data?.map((item) => item.videoSection)),
    ];
    let totalCount = 0; // Total count of videos from previous sections
    const toggleSection = (section) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        }
        else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    };
    return (<div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
      {videoSections.map((section, sectionIndex) => {
            const isSectionVisible = visibleSections.has(section);
            // Filter videos by section
            const sectionVideos = props.data.filter((item) => item.videoSection === section);
            const sectionVideoCount = sectionVideos.length; // Number of videos in the current section
            const sectionVideoLength = sectionVideos.reduce((totalLength, item) => totalLength + item.videoLength, 0);
            const sectionStartIndex = totalCount; // Start index of videos within the current section
            totalCount += sectionVideoCount; // Update the total count of videos
            const sectionContentHours = sectionVideoLength / 60;
            return (<div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                <button className="mr-4 cursor-pointer text-black dark:text-white" onClick={() => toggleSection(section)}>
                  {isSectionVisible ? (<bs_1.BsChevronUp size={20}/>) : (<bs_1.BsChevronDown size={20}/>)}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (<div className="w-full">
                {sectionVideos.map((item, index) => {
                        const videoIndex = sectionStartIndex + index; // Calculate the video index within the overall list
                        const contentLength = item.videoLength / 60;
                        return (<div className={`w-full ${videoIndex === props.activeVideo ? "bg-slate-800" : ""} cursor-pointer transition-all p-2`} key={item._id} onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}>
                      <div className="flex items-start">
                        <div>
                          <md_1.MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada"/>
                        </div>
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>);
                    })}
              </div>)}
          </div>);
        })}
    </div>);
};
exports.default = CourseContentList;
// import React, { FC, useState } from "react";
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
// import { MdOutlineOndemandVideo } from "react-icons/md";
// type Props = {
//   data: any; // Video content data
//   activeVideo?: number;
//   setActiveVideo?: any;
//   isDemo?: boolean;
//   testQuestions?: any[]; // Test questions data
// };
// const CourseContentList: FC<Props> = (props) => {
//   const [visibleSections, setVisibleSections] = useState<Set<string>>(
//     new Set<string>()
//   );
//   const videoSections: string[] = [
//     ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
//   ];
//   const testSection = "Test Questions";
//   const toggleSection = (section: string) => {
//     const newVisibleSections = new Set(visibleSections);
//     if (newVisibleSections.has(section)) {
//       newVisibleSections.delete(section);
//     } else {
//       newVisibleSections.add(section);
//     }
//     setVisibleSections(newVisibleSections);
//   };
//   function handleTestQuestionClick(id: any): void {
//     throw new Error("Function not implemented.");
//   }
//   return (
//     <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
//       {videoSections.map((section: string, sectionIndex: number) => (
//         <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
//           <div className="w-full flex">
//             <div className="w-full flex justify-between items-center">
//               <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
//               <button
//                 className="mr-4 cursor-pointer text-black dark:text-white"
//                 onClick={() => toggleSection(section)}
//               >
//                 {visibleSections.has(section) ? (
//                   <BsChevronUp size={20} />
//                 ) : (
//                   <BsChevronDown size={20} />
//                 )}
//               </button>
//             </div>
//           </div>
//           <h5 className="text-black dark:text-white">
//             {props.data.filter((item: any) => item.videoSection === section).length} Lessons
//           </h5>
//           <br />
//           {visibleSections.has(section) && (
//             <div className="w-full">
//               {props.data
//                 .filter((item: any) => item.videoSection === section )
//                 .map((item: any, index: number) => (
//                   <div
//                     className={`w-full ${
//                       index === props.activeVideo ? "bg-slate-800" : ""
//                     } cursor-pointer transition-all p-2`}
//                     key={item._id}
//                     onClick={() => props.isDemo ? null : props?.setActiveVideo(index)}
//                   >
//                     <div className="flex items-start">
//                       <div>
//                         <MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada" />
//                       </div>
//                       <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
//                         {item.title}
//                       </h1>
//                     </div>
//                     <h5 className="pl-8 text-black dark:text-white">
//                       {item.videoLength} minutes
//                     </h5>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       ))}
//       <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={testSection}>
//         <div className="w-full flex">
//           <div className="w-full flex justify-between items-center">
//             <h2 className="text-[22px] text-black dark:text-white">{testSection}</h2>
//             <button
//               className="mr-4 cursor-pointer text-black dark:text-white"
//               onClick={() => toggleSection(testSection)}
//             >
//               {visibleSections.has(testSection) ? (
//                 <BsChevronUp size={20} />
//               ) : (
//                 <BsChevronDown size={20} />
//               )}
//             </button>
//           </div>
//         </div>
//         {/* Additional details about the test section */}
//         {visibleSections.has(testSection) && (
//           <div className="w-full">
//             {/* Map through and render test questions */}
//             {props.testQuestions?.map((question: any, index: number) => (
//               <div
//                 className={`w-full cursor-pointer transition-all p-2`}
//                 key={question.id}
//                 onClick={() => (props.isDemo ? null : handleTestQuestionClick(question.id))}
//                 >
//                 <div className="flex items-start">
//                   <div>
//                     {/* Your test question icon */}
//                   </div>
//                   <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
//                     {question.title}
//                   </h1>
//                 </div>
//                 {/* Additional information about the test question */}
//                 <h5 className="pl-8 text-black dark:text-white">
//                   {/* Additional details */}
//                 </h5>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default CourseContentList;
