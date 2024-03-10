"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Loader.css");
const Loader = () => {
    return (<div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>);
};
exports.default = Loader;
