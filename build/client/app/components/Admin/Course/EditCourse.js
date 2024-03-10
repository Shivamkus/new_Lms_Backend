"use strict";
"use client";
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
const EditCourse = ({ id }) => {
    const [editCourse, { isSuccess, error }] = (0, coursesApi_1.useEditCourseMutation)();
    const { data, refetch } = (0, coursesApi_1.useGetAllCoursesQuery)({}, { refetchOnMountOrArgChange: true });
    const editCourseData = data && data.courses.find((i) => i._id === id);
    (0, react_1.useEffect)(() => {
        if (isSuccess) {
            react_hot_toast_1.toast.success("Course Updated successfully");
            (0, navigation_1.redirect)("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error;
                react_hot_toast_1.toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);
    const [active, setActive] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                categories: editCourseData.categories,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url,
            });
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);
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
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
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
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
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
            courseContent: formattedCourseContentData,
        };
        setCourseData(data);
    };
    const handleCourseCreate = async (e) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
    };
    return (<div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (<CourseInformation_1.default courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive}/>)}

        {active === 1 && (<CourseData_1.default benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} active={active} setActive={setActive}/>)}

        {active === 2 && (<CourseContent_1.default active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit} optionsArraytest={[]} setOptionsArraytest={function (optionsArray) {
                throw new Error("Function not implemented.");
            }}/>)}

        {active === 3 && (<CoursePreview_1.default active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate} isEdit={true}/>)}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions_1.default active={active} setActive={setActive}/>
      </div>
    </div>);
};
exports.default = EditCourse;
