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
/* eslint-disable @next/next/no-img-element */
const style_1 = require("@/app/styles/style");
const layoutApi_1 = require("@/redux/features/layout/layoutApi");
const react_1 = __importStar(require("react"));
const react_hot_toast_1 = require("react-hot-toast");
const ai_1 = require("react-icons/ai");
const EditHero = (props) => {
    const [image, setImage] = (0, react_1.useState)("");
    const [title, setTitle] = (0, react_1.useState)("");
    const [subTitle, setSubTitle] = (0, react_1.useState)("");
    const { data, refetch } = (0, layoutApi_1.useGetHeroDataQuery)("Banner", {
        refetchOnMountOrArgChange: true
    });
    const [editLayout, { isLoading, isSuccess, error }] = (0, layoutApi_1.useEditLayoutMutation)();
    (0, react_1.useEffect)(() => {
        if (data) {
            setTitle(data?.layout?.banner.title);
            setSubTitle(data?.layout?.banner.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
        if (isSuccess) {
            react_hot_toast_1.toast.success("Hero updated successfully!");
            refetch();
        }
        if (error) {
            if ("data" in error) {
                const errorData = error;
                react_hot_toast_1.toast.error(errorData?.data?.message);
            }
        }
    }, [data, isSuccess, error, refetch]);
    const handleUpdate = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleEdit = async () => {
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        });
    };
    return (<>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img src={image} alt="" className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"/>
            <input type="file" name="" id="banner" accept="image/*" onChange={handleUpdate} className="hidden"/>
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <ai_1.AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer"/>
            </label>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block" placeholder="Improve Your Online Learning Experience Better Instantly" value={title} onChange={(e) => setTitle(e.target.value)} rows={4}/>
          <br />
          <textarea value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them." className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none"></textarea>
          <br />
          <br />
          <br />
          <div className={`${style_1.styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
          ${data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
            ? "!cursor-pointer !bg-[#42d383]"
            : "!cursor-not-allowed"}
          !rounded absolute bottom-12 right-12`} onClick={data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
            ? handleEdit
            : () => null}>
            Save
          </div>
        </div>
      </div>
    </>);
};
exports.default = EditHero;
