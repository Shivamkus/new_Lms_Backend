"use strict";
// components/QuizComponent.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const QuizComponent_module_css_1 = __importDefault(require("./QuizComponent.module.css"));
const QuizComponent = () => {
    const [mcqAnswers, setMCQAnswers] = (0, react_1.useState)({});
    const [fillInAnswers, setFillInAnswers] = (0, react_1.useState)({});
    const handleMCQChange = (questionId, option) => {
        setMCQAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: option,
        }));
    };
    const handleFillInChange = (questionId, answer) => {
        setFillInAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };
    const handleSubmit = () => {
        // Handle the submission of answers
        console.log('MCQ Answers:', mcqAnswers);
        console.log('Fill-In Answers:', fillInAnswers);
    };
    return (<div className={QuizComponent_module_css_1.default.quizContainer}>
      {/* MCQ Section */}
      <div className={QuizComponent_module_css_1.default.questionSection}>
        <h2>Multiple Choice Questions</h2>
        <div className={QuizComponent_module_css_1.default.question}>
          <p>What is the capital of France?</p>
          <div className={QuizComponent_module_css_1.default.options}>
            <label>
              <input type="radio" name="mcq1" value="paris" onChange={() => handleMCQChange('mcq1', 'paris')}/>
              Paris
            </label>
            <label>
              <input type="radio" name="mcq1" value="berlin" onChange={() => handleMCQChange('mcq1', 'berlin')}/>
              Berlin
            </label>
            <label>
              <input type="radio" name="mcq1" value="rome" onChange={() => handleMCQChange('mcq1', 'rome')}/>
              Rome
            </label>
          </div>
        </div>
        {/* Add more MCQ questions as needed */}
      </div>

      {/* Fill-In Section */}
      <div className={QuizComponent_module_css_1.default.questionSection}>
        <h2>Fill-In-The-Blank Questions</h2>
        <div className={QuizComponent_module_css_1.default.question}>
          <p>My favorite programming language is ____________.</p>
          <input type="text" className={QuizComponent_module_css_1.default.textInput} // Use the local class
     onChange={(e) => handleFillInChange('fillIn1', e.target.value)}/>
        </div>
        {/* Add more fill-in questions as needed */}
      </div>

      {/* Submission Button */}
      <button onClick={handleSubmit} className={QuizComponent_module_css_1.default.submitButton}>
        Submit Answers
      </button>
    </div>);
};
exports.default = QuizComponent;
