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
const layoutApi_1 = require("@/redux/features/layout/layoutApi");
const react_1 = __importStar(require("react"));
const Loader_1 = __importDefault(require("../../Loader/Loader"));
const style_1 = require("@/app/styles/style");
const ai_1 = require("react-icons/ai");
const io_1 = require("react-icons/io");
const react_hot_toast_1 = require("react-hot-toast");
const EditCategories = (props) => {
    const { data, isLoading, refetch } = (0, layoutApi_1.useGetHeroDataQuery)("Categories", {
        refetchOnMountOrArgChange: true,
    });
    // const types = data?.layout ? Object.keys(data.layout) : [];
    const [editLayout, { isSuccess: layoutSuccess, error }] = (0, layoutApi_1.useEditLayoutMutation)();
    const [categories, setCategories] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // if (data) {
        //   setCategories(data.layout.categories);
        // }
        if (data && data.layout) {
            setCategories(data.layout.categories || []);
        }
        else {
            // If data.layout.categories is null, set an empty array as a default value
            setCategories([]);
        }
        if (layoutSuccess) {
            refetch();
            react_hot_toast_1.toast.success("Categories updated successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error;
                react_hot_toast_1.toast.error(errorData?.data?.message);
            }
        }
    }, [data, layoutSuccess, error, refetch]);
    const handleCategoriesAdd = (id, value) => {
        setCategories((prevCategory) => prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i)));
    };
    const newCategoriesHandler = () => {
        if (categories[categories.length - 1].title === "") {
            react_hot_toast_1.toast.error("Category title cannot be empty");
        }
        else {
            setCategories((prevCategory) => [...prevCategory, { title: "" }]);
        }
    };
    const areCategoriesUnchanged = (originalCategories, newCategories) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };
    const isAnyCategoryTitleEmpty = (categories) => {
        return categories.some((q) => q.title === "");
    };
    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.layout.categories, categories) &&
            !isAnyCategoryTitleEmpty(categories)) {
            await editLayout({
                type: "Categories",
                categories,
            });
        }
    };
    return (<>
      {isLoading ? (<Loader_1.default />) : (<div className="mt-[120px] text-center">
          <h1 className={`${style_1.styles.title}`}>All Categories</h1>
          {categories &&
                categories.map((item, index) => {
                    return (<div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input className={`${style_1.styles.input} !w-[unset] !border-none !text-[20px]`} value={item.title} onChange={(e) => handleCategoriesAdd(item._id, e.target.value)} placeholder="Enter category title..."/>
                    <ai_1.AiOutlineDelete className="dark:text-white text-black text-[18px] cursor-pointer" onClick={() => {
                            setCategories((prevCategory) => prevCategory.filter((i) => i._id !== item._id));
                        }}/>
                  </div>
                </div>);
                })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <io_1.IoMdAddCircleOutline className="dark:text-white text-black text-[25px] cursor-pointer" onClick={newCategoriesHandler}/>
          </div>
          <div className={`${style_1.styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"}
            !rounded absolute bottom-12 right-12`} onClick={areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler}>
            Save
          </div>
        </div>)}
    </>);
};
exports.default = EditCategories;
// import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast } from "react-hot-toast";
// type Props = {};
// const EditCategories = (props: Props) => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
//     refetchOnMountOrArgChange: true,
//   });
//   const [createLayout] = useEditLayoutMutation();
//   const [categories, setCategories] = useState<any>([]);
//   useEffect(() => {
//     if (data && data.layout) {
//       setCategories(data.layout.categories || []);
//     } else {
//       setCategories([]);
//     }
//   }, [data]);
//   const handleCategoriesAdd = (id: any, value: string) => {
//     setCategories((prevCategory: any) =>
//       prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };
//   const newCategoriesHandler = async () => {
//     try {
//       if (!data.layout) {
//         // If layout doesn't exist, create a new layout
//         await createLayout({
//           type: "Categories",
//           categories: [],
//         });
//         refetch();
//       }
//       setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
//     } catch (error) {
//       console.error("Error creating layout:", error);
//       toast.error("Failed to create layout");
//     }
//   };
//   const editCategoriesHandler = async () => {
//     try {
//       if (data.layout) {
//         await createLayout({
//           type: "Categories",
//           categories,
//         });
//         refetch();
//         toast.success("Categories updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating categories:", error);
//       toast.error("Failed to update categories");
//     }
//   };
//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[120px] text-center">
//           <h1 className={`${styles.title}`}>All Categories</h1>
//           {categories &&
//             categories.map((item: any, index: number) => (
//               <div className="p-3" key={index}>
//                 <div className="flex items-center w-full justify-center">
//                   <input
//                     className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
//                     value={item.title}
//                     onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
//                     placeholder="Enter category title..."
//                   />
//                   <AiOutlineDelete
//                     className="dark:text-white text-black text-[18px] cursor-pointer"
//                     onClick={() => {
//                       setCategories((prevCategory: any) =>
//                         prevCategory.filter((i: any) => i._id !== item._id)
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           <br />
//           <br />
//           <div className="w-full flex justify-center">
//             <IoMdAddCircleOutline
//               className="dark:text-white text-black text-[25px] cursor-pointer"
//               onClick={newCategoriesHandler}
//             />
//           </div>
//           <div
//             className={`${
//               styles.button
//             } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
//             ${
//               !data.layout || data.layout.categories.length === 0
//                 ? "!cursor-not-allowed"
//                 : "!cursor-pointer !bg-[#42d383]"
//             }
//             !rounded absolute bottom-12 right-12`}
//             onClick={
//               !data.layout || data.layout.categories.length === 0
//                 ? () => null
//                 : editCategoriesHandler
//             }
//           >
//             Save
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default EditCategories;
// import { useGetHeroDataQuery, useEditLayoutMutation , useCreateLayoutQuery} from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast } from "react-hot-toast";
// type Props = {
//   layoutType: string; // 'Categories' or 'FAQs'
// };
// const EditLayout = ({ layoutType }: Props) => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery(layoutType, {
//     refetchOnMountOrArgChange: true,
//   });
//   const [editLayout] = useEditLayoutMutation();
//   const [items, setItems] = useState<any>([]);
//   useEffect(() => {
//     if (data && data.layout) {
//       setItems(data.layout[layoutType.toLowerCase()] || []);
//     } else {
//       setItems([]);
//     }
//   }, [data, layoutType]);
//   const handleItemAdd = (id: any, value: string) => {
//     setItems((prevItems: any) =>
//       prevItems.map((i: any) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };
//   const newItemHandler = async () => {
//     try {
//       if (!data.layout) {
//         // If layout doesn't exist, create a new layout
//         const layoutData: any = {};
//         layoutData[layoutType.toLowerCase()] = [];
//         await editLayout(layoutData);
//         refetch();
//       }
//       setItems((prevItems: any) => [...prevItems, { title: "" }]);
//     } catch (error) {
//       console.error("Error creating layout:", error);
//       toast.error(`Failed to create ${layoutType}`);
//     }
//   };
//   const editItemsHandler = async () => {
//     try {
//       if (data.layout) {
//         const layoutData: any = {};
//         layoutData[layoutType.toLowerCase()] = items;
//         await editLayout(layoutData);
//         refetch();
//         toast.success(`${layoutType} updated successfully`);
//       }
//     } catch (error) {
//       console.error(`Error updating ${layoutType}:`, error);
//       toast.error(`Failed to update ${layoutType}`);
//     }
//   };
//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[120px] text-center">
//           <h1 className={`${styles.title}`}>All {layoutType}</h1>
//           {items &&
//             items.map((item: any, index: number) => (
//               <div className="p-3" key={index}>
//                 <div className="flex items-center w-full justify-center">
//                   <input
//                     className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
//                     value={item.title}
//                     onChange={(e) => handleItemAdd(item._id, e.target.value)}
//                     placeholder={`Enter ${layoutType} title...`}
//                   />
//                   <AiOutlineDelete
//                     className="dark:text-white text-black text-[18px] cursor-pointer"
//                     onClick={() => {
//                       setItems((prevItems: any) =>
//                         prevItems.filter((i: any) => i._id !== item._id)
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           <br />
//           <br />
//           <div className="w-full flex justify-center">
//             <IoMdAddCircleOutline
//               className="dark:text-white text-black text-[25px] cursor-pointer"
//               onClick={newItemHandler}
//             />
//           </div>
//           <div
//             className={`${
//               styles.button
//             } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
//             ${
//               !data.layout || items.length === 0
//                 ? "!cursor-not-allowed"
//                 : "!cursor-pointer !bg-[#42d383]"
//             }
//             !rounded absolute bottom-12 right-12`}
//             onClick={
//               !data.layout || items.length === 0
//                 ? () => null
//                 : editItemsHandler
//             }
//           >
//             Save
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default EditLayout;
