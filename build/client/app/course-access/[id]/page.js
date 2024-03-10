"use strict";
'use client';
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
const CourseContent_1 = __importDefault(require("@/app/components/Course/CourseContent"));
const Footer_1 = __importDefault(require("@/app/components/Footer"));
const Loader_1 = __importDefault(require("@/app/components/Loader/Loader"));
const apiSlice_1 = require("@/redux/features/api/apiSlice");
const navigation_1 = require("next/navigation");
const react_1 = __importStar(require("react"));
const Page = ({ params }) => {
    const id = params.id;
    const { isLoading, error, data, refetch } = (0, apiSlice_1.useLoadUserQuery)(undefined, {});
    (0, react_1.useEffect)(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item) => item._id === id);
            if (!isPurchased) {
                (0, navigation_1.redirect)("/");
            }
        }
        if (error) {
            (0, navigation_1.redirect)("/");
        }
    }, [data, error, id]);
    return (<>
   {isLoading ? (<Loader_1.default />) : (<div>
          <CourseContent_1.default id={id} user={data.user}/>
          <Footer_1.default />

        </div>)}
   </>);
};
exports.default = Page;
