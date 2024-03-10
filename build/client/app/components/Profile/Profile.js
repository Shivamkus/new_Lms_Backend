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
const SideBarProfile_1 = __importDefault(require("./SideBarProfile"));
const authApi_1 = require("../../../redux/features/auth/authApi");
const react_2 = require("next-auth/react");
const ProfileInfo_1 = __importDefault(require("./ProfileInfo"));
const ChangePassword_1 = __importDefault(require("./ChangePassword"));
const CourseCard_1 = __importDefault(require("../Course/CourseCard"));
const coursesApi_1 = require("@/redux/features/courses/coursesApi");
const Profile = ({ user }) => {
    const [scroll, setScroll] = (0, react_1.useState)(false);
    const [avatar, setAvatar] = (0, react_1.useState)(null);
    const [logout, setLogout] = (0, react_1.useState)(false);
    const [courses, setCourses] = (0, react_1.useState)([]);
    const { data, isLoading } = (0, coursesApi_1.useGetUsersAllCoursesQuery)(undefined, {});
    const {} = (0, authApi_1.useLogOutQuery)(undefined, {
        skip: !logout ? true : false,
    });
    const [active, setActive] = (0, react_1.useState)(1);
    const logOutHandler = async () => {
        setLogout(true);
        await (0, react_2.signOut)();
    };
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            }
            else {
                setScroll(false);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        if (data) {
            const filteredCourses = user.courses
                .map((userCourse) => data.courses.find((course) => course._id === userCourse._id))
                .filter((course) => course !== undefined);
            setCourses(filteredCourses);
        }
    }, [data, user.courses]);
    return (<div className="w-[85%] flex mx-auto">
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
        <SideBarProfile_1.default user={user} active={active} avatar={avatar} setActive={setActive} logOutHandler={logOutHandler}/>
      </div>
      {active === 1 && (<div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo_1.default avatar={avatar} user={user}/>
        </div>)}

      {active === 2 && (<div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword_1.default />
        </div>)}

      {active === 3 && (<div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {courses &&
                courses.map((item, index) => (<CourseCard_1.default item={item} key={index} isProfile={true}/>))}
          </div>
          {courses.length === 0 && (<h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
              You don&apos;t have any purchased courses!
            </h1>)}
        </div>)}
    </div>);
};
exports.default = Profile;
