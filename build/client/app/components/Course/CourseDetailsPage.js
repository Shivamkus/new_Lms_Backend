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
const coursesApi_1 = require("@/redux/features/courses/coursesApi");
const react_1 = __importStar(require("react"));
const Loader_1 = __importDefault(require("../Loader/Loader"));
const Heading_1 = __importDefault(require("@/app/utils/Heading"));
const Header_1 = __importDefault(require("../Header"));
const Footer_1 = __importDefault(require("../Footer"));
const CourseDetails_1 = __importDefault(require("./CourseDetails"));
const ordersApi_1 = require("@/redux/features/orders/ordersApi");
const stripe_js_1 = require("@stripe/stripe-js");
const apiSlice_1 = require("@/redux/features/api/apiSlice");
const CourseDetailsPage = ({ id }) => {
    const [route, setRoute] = (0, react_1.useState)("Login");
    const [open, setOpen] = (0, react_1.useState)(false);
    const { data, isLoading } = (0, coursesApi_1.useGetCourseDetailsQuery)(id);
    const { data: config } = (0, ordersApi_1.useGetStripePublishablekeyQuery)({});
    const [createPaymentIntent, { data: paymentIntentData }] = (0, ordersApi_1.useCreatePaymentIntentMutation)();
    const { data: userData } = (0, apiSlice_1.useLoadUserQuery)(undefined, {});
    const [stripePromise, setStripePromise] = (0, react_1.useState)(null);
    const [clientSecret, setClientSecret] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (config) {
            const publishablekey = config?.publishablekey;
            setStripePromise((0, stripe_js_1.loadStripe)(publishablekey));
        }
        if (data && userData?.user) {
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount);
        }
    }, [config, createPaymentIntent, data, userData]);
    (0, react_1.useEffect)(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.client_secret);
        }
    }, [paymentIntentData]);
    return (<>
      {isLoading ? (<Loader_1.default />) : (<div>
          <Heading_1.default title={data.course.name + " - ELearning"} description={"ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"} keywords={data?.course?.tags}/>
          <Header_1.default route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1}/>
          {stripePromise && (<CourseDetails_1.default data={data.course} stripePromise={stripePromise} clientSecret={clientSecret} setRoute={setRoute} setOpen={setOpen}/>)}
          <Footer_1.default />
        </div>)}
    </>);
};
exports.default = CourseDetailsPage;
