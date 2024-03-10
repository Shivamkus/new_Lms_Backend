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
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const NavItems_1 = __importDefault(require("../utils/NavItems"));
const ThemeSwitcher_1 = require("../utils/ThemeSwitcher");
const hi_1 = require("react-icons/hi");
const CustomModal_1 = __importDefault(require("../utils/CustomModal"));
const Login_1 = __importDefault(require("../components/Auth/Login"));
const SignUp_1 = __importDefault(require("../components/Auth/SignUp"));
const Verification_1 = __importDefault(require("../components/Auth/Verification"));
const image_1 = __importDefault(require("next/image"));
const avatar_png_1 = __importDefault(require("../../public/assests/avatar.png"));
const react_2 = require("next-auth/react");
const authApi_1 = require("@/redux/features/auth/authApi");
const react_hot_toast_1 = require("react-hot-toast");
const apiSlice_1 = require("@/redux/features/api/apiSlice");
const Loader_1 = __importDefault(require("./Loader/Loader"));
const Header = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = (0, react_1.useState)(false);
    const [openSidebar, setOpenSidebar] = (0, react_1.useState)(false);
    const { data: userData, isLoading, refetch } = (0, apiSlice_1.useLoadUserQuery)(undefined, {});
    const { data } = (0, react_2.useSession)();
    const [socialAuth, { isSuccess, error }] = (0, authApi_1.useSocialAuthMutation)();
    const [logout, setLogout] = (0, react_1.useState)(false);
    const {} = (0, authApi_1.useLogOutQuery)(undefined, {
        skip: !logout ? true : false,
    });
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            if (!userData) {
                if (data) {
                    socialAuth({
                        email: data?.user?.email,
                        name: data?.user?.name,
                        avatar: data.user?.image,
                    });
                    refetch();
                }
            }
            if (data === null) {
                if (isSuccess) {
                    react_hot_toast_1.toast.success("Login Successfully");
                }
            }
            if (data === null && !isLoading && !userData) {
                setLogout(true);
            }
        }
    }, [data, userData, isLoading, socialAuth, refetch, isSuccess]);
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setActive(true);
            }
            else {
                setActive(false);
            }
        });
    }
    const handleClose = (e) => {
        if (e.target.id === "screen") {
            {
                setOpenSidebar(false);
            }
        }
    };
    return (<>
   {isLoading ? (<Loader_1.default />) : (<div className="w-full relative">
      <div className={`${active
                ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <link_1.default href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                Elearning
              </link_1.default>
            </div>
            <div className="flex items-center">
              <NavItems_1.default activeItem={activeItem} isMobile={false}/>
              <ThemeSwitcher_1.ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <hi_1.HiOutlineMenuAlt3 size={25} className="cursor-pointer dark:text-white text-black" onClick={() => setOpenSidebar(true)}/>
              </div>
              {userData ? (<link_1.default href={"/profile"}>
                  <image_1.default 
            // src={userData?.user.avatar ? userData.user.avatar.url : avatar}
            src={userData?.user?.avatar ? userData.user.avatar.url : avatar_png_1.default} alt="" width={30} height={30} className="w-[30px] h-[30px] rounded-full cursor-pointer" style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}/>
                </link_1.default>) : (<hi_1.HiOutlineUserCircle size={25} className="hidden 800px:block cursor-pointer dark:text-white text-black" onClick={() => setOpen(true)}/>)}
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        {openSidebar && (<div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems_1.default activeItem={activeItem} isMobile={true}/>
              {/* {userData?.user ? (
                  <Link href={"/profile"}>
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                      style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
                    />
                  </Link>
                ) : (
  
                  <HiOutlineUserCircle
                    size={25}
                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )} */}
            <hi_1.HiOutlineUserCircle size={25} className="cursor-pointer ml-5 my-2 text-black dark:text-white " onClick={() => setOpen(true)}/>
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © 2023 ELearning
              </p>
            </div>
          </div>)}
      </div>
      {route === "Login" && (<>
          {open && (<CustomModal_1.default open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login_1.default} refetch={refetch}/>)}
        </>)}

      {route === "Sign-Up" && (<>
          {open && (<CustomModal_1.default open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={SignUp_1.default}/>)}
        </>)}

      {route === "Verification" && (<>
          {open && (<CustomModal_1.default open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification_1.default}/>)}
        </>)}
    </div>)}
   </>);
};
exports.default = Header;
