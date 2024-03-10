import mongoose, { Document, Model, Schema } from "mongoose";

interface ITestQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
  courseId: string;  // Add courseId field
  videoId: string;   // Add videoId field
}

const testQuestionSchema = new Schema<ITestQuestion>({
  question: String,
  options: [String],
  correctAnswer: String,
  courseId: String,  // Add courseId field
  videoId: String,   // Add videoId field
});

const TestModel: Model<ITestQuestion> = mongoose.model("Test", testQuestionSchema);


export default TestModel;
