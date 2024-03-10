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
const Heading_1 = __importDefault(require("./utils/Heading"));
const Header_1 = __importDefault(require("./components/Header"));
const Hero_1 = __importDefault(require("./components/Route/Hero"));
const Courses_1 = __importDefault(require("./components/Route/Courses"));
const Reviews_1 = __importDefault(require("./components/Route/Reviews"));
const FAQ_1 = __importDefault(require("./components/FAQ/FAQ"));
const Footer_1 = __importDefault(require("./components/Footer"));
// import Attendance from "./components/Route/attandance";
const Quizecomp_1 = __importDefault(require("./components/Quiz/Quizecomp"));
const Page = (props) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [activeItem, setActiveItem] = (0, react_1.useState)(0);
    const [route, setRoute] = (0, react_1.useState)("Login");
    return (<div>
      <Heading_1.default title="ELearning" description="ELearning is a platform for students to learn and get help from teachers" keywords="Prograaming,MERN,Redux,Machine Learning"/>
      <Header_1.default open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/>
      <Hero_1.default />
      {/* <Attendance /> */}
      <Courses_1.default />
      <Reviews_1.default />
      <FAQ_1.default />
      <Quizecomp_1.default />
      <Footer_1.default />
    </div>);
};
exports.default = Page;
