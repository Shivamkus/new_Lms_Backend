"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TestField = ({ active, setActive, handleSubmit: handlleTestQuestionSubmit, }) => {
    const prevButton = () => {
        setActive(active - 1);
    };
    const handleOptions = () => {
        setActive(active + 1);
        handlleCourseSubmit();
    };
    return (<>
      <div className="w-[80%] m-auto mt-24 p-3">
        TestField
        <div className="w-full flex items-center justify-between">
          <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => prevButton()}>
            Prev
          </div>
          <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => handleOptions()}>
            Next
          </div>
        </div>
      </div>
    </>);
};
exports.default = TestField;
function setActive(arg0) {
    throw new Error("Function not implemented.");
}
function handlleCourseSubmit() {
    throw new Error("Function not implemented.");
}
