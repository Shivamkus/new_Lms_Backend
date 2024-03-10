"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const Footer = (props) => {
    return (<footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]"/>
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
            <ul className="space-y-4">
              <li>
                <link_1.default href="/about" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Our Story
                </link_1.default>
              </li>
              <li>
                <link_1.default href="/privacy-policy" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Privacy Policy
                </link_1.default>
              </li>
              <li>
                <link_1.default href="/faq" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  FAQ
                </link_1.default>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <link_1.default href="/courses" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Courses
                </link_1.default>
              </li>
              <li>
                <link_1.default href="/profile" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  My Account
                </link_1.default>
              </li>
              <li>
                <link_1.default href="/course-dashboard" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Course Dashboard
                </link_1.default>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
            <ul className="space-y-4">
              <li>
                <link_1.default href="https://www.youtube.com/channel/" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Youtube
                </link_1.default>
              </li>
              <li>
                <link_1.default href="https://www.instagram.com/" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Instagram
                </link_1.default>
              </li>
              <li>
                <link_1.default href="https://www.github.com/" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  github
                </link_1.default>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">Contact Info</h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
            Call Us: 1-885-665-2022
            </p>
           
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
            Address: +7011 Vermont Ave, Los Angeles, CA 90044
            </p>
         
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
            Mail Us: hello@elearning.com
            </p>
            
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyright © 2023 Elearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>);
};
exports.default = Footer;