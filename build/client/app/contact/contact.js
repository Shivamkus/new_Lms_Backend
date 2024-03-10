"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const style_1 = require("../styles/style");
// import { GoogleMap, LoadScript } from "react-google-maps-api";
// const MapContainer = () => {
//     const mapStyles = {
//       height: "50vh",  // Set the height of the map container
//       width: "100%",   // Set the width of the map container
//     };
//     return (
//       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={15}
//           center={{ lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }}  // Replace with your desired coordinates
//         />
//       </LoadScript>
//     );
//   };
const contact = () => {
    return (<div className="text-black dark:text-white">
      <br />
      <h1 className={`${style_1.styles.title} 800px:!text-[45px]`}>
        Contact <span className="text-gradient">us</span>
      </h1>
      <div className="w-[50%]">
      <h1 className={`${style_1.styles.title}`}>Join to ELearning</h1>
      <form>
        <div className="mb-3">
          <label className={`${style_1.styles.label}`} htmlFor="email">
            Enter your Name
          </label>
          <input type="text" name="" 
    // value={}
    // onChange={}
    id="name" placeholder="johndoe" className={` ${style_1.styles.input}`}/>
        
        </div>
        <label className={`${style_1.styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input type="email" name="" 
    //   value={values.email}
    //   onChange={handleChange}
    id="email" placeholder="loginmail@gmail.com" className={` ${style_1.styles.input}`}/>
        {/* {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )} */}

    <div className="mb-3">
  <label className={`${style_1.styles.label}`} htmlFor="message">
    Enter your message
  </label>
  <textarea name="message" 
    // value={}
    // onChange={}
    id="message" placeholder="Write your message here..." className={`${style_1.styles.input}`}/>
    </div>




        




        
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${style_1.styles.button}`}/>
        </div>
        <br />
        
      </form>
      <br />
    </div>
  
      
    </div>);
};
exports.default = contact;
