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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const CoursePlayer = ({ videoUrl }) => {
    const [videoData, setVideoData] = (0, react_1.useState)({
        otp: "",
        playbackInfo: "",
    });
    (0, react_1.useEffect)(() => {
        axios_1.default
            .post("https://new-lms-backend.onrender.com/api/v1/getVdoCipherOTP", {
            videoId: videoUrl,
        })
            .then((res) => {
            setVideoData(res.data);
        });
    }, [videoUrl]);
    return (<div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (<iframe 
        // src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=Ub9OiZXIOeUXH0Nv`}
        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=JoTYi94iOWBwzR8i`} // paste here //www.vdocipher.com player link
         style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0
            }} allowFullScreen={true} allow="encrypted-media"></iframe>)}
    </div>);
};
exports.default = CoursePlayer;
