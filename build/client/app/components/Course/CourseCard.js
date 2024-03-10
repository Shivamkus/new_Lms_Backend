"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ratings_1 = __importDefault(require("@/app/utils/Ratings"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const ai_1 = require("react-icons/ai");
const CourseCard = ({ item, isProfile }) => {
    return (<link_1.default href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
      {item && item.thumbnail && item.thumbnail.url && (<image_1.default src={item.thumbnail.url} 
        // src={item.thumbnail}
        width={500} height={300} objectFit="contain" className="rounded w-full" alt=""/>)}
        <br />
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings_1.default rating={item.ratings}/>
          <h5 className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[2px] line-through opacity-80 text-black dark:text-[#fff] 
              
             ">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <ai_1.AiOutlineUnorderedList size={20} fill="#fff"/>
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </link_1.default>);
};
exports.default = CourseCard;
