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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coursesApi_1 = require("@/redux/features/courses/coursesApi");
const react_1 = __importStar(require("react"));
const Loader_1 = __importDefault(require("../Loader/Loader"));
const Heading_1 = __importDefault(require("@/app/utils/Heading"));
const CourseContentMedia_1 = __importDefault(require("./CourseContentMedia"));
const Header_1 = __importDefault(require("../Header"));
const CourseContentList_1 = __importDefault(require("./CourseContentList"));
const CourseContent = ({ id, user }) => {
    const { data: contentData, isLoading, refetch } = (0, coursesApi_1.useGetCourseContentQuery)(id, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = (0, react_1.useState)(false);
    const [route, setRoute] = (0, react_1.useState)('Login');
    const data = contentData?.content;
    const [activeVideo, setActiveVideo] = (0, react_1.useState)(0);
    return (<>
      {isLoading ? (<Loader_1.default />) : (<>
          <Header_1.default activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute}/>
          <div className="w-full grid 800px:grid-cols-10">
            <Heading_1.default title={data[activeVideo]?.title} description="anything" keywords={data[activeVideo]?.tags}/>
            <div className="col-span-7">
              <CourseContentMedia_1.default data={data} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} user={user} refetch={refetch}/>
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
            <CourseContentList_1.default setActiveVideo={setActiveVideo} data={data} activeVideo={activeVideo}/>
          </div>
          </div>
        </>)}
    </>);
};
exports.default = CourseContent;
