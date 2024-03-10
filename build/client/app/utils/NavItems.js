"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navItemsData = void 0;
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
exports.navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    // {
    //   name: "Policy",
    //   url: "/policy",
    // },
    // {
    //   name: "FAQ",
    //   url: "/faq",
    // },
    {
        name: "Notes",
        url: "/notes",
    },
    {
        name: "Test",
        url: "/test"
    },
    {
        name: "contact us",
        url: "/contact"
    }
];
const NavItems = ({ activeItem, isMobile }) => {
    return (<>
      <div className="hidden 800px:flex">
        {exports.navItemsData &&
            exports.navItemsData.map((i, index) => (<link_1.default href={`${i.url}`} key={index} passHref>
              <span className={`${activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
                {i.name}
              </span>
            </link_1.default>))}
      </div>
      {isMobile && (<div className="800px:hidden mt-5">
             <div className="w-full text-center py-6">
            <link_1.default href={"/"} passHref>
              <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>ELearning</span>
            </link_1.default>
          </div>
            {exports.navItemsData &&
                exports.navItemsData.map((i, index) => (<link_1.default href="/" passHref key={index}>
                  <span className={`${activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                    {i.name}
                  </span>
                </link_1.default>))}
          </div>)}
    </>);
};
exports.default = NavItems;
