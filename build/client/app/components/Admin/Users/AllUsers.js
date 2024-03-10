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
const x_data_grid_1 = require("@mui/x-data-grid");
const material_1 = require("@mui/material");
const ai_1 = require("react-icons/ai");
const next_themes_1 = require("next-themes");
const Loader_1 = __importDefault(require("../../Loader/Loader"));
const timeago_js_1 = require("timeago.js");
const userApi_1 = require("@/redux/features/user/userApi");
const style_1 = require("@/app/styles/style");
const react_hot_toast_1 = require("react-hot-toast");
const AllCourses = ({ isTeam }) => {
    const { theme, setTheme } = (0, next_themes_1.useTheme)();
    const [active, setActive] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)("");
    const [role, setRole] = (0, react_1.useState)("admin");
    const [open, setOpen] = (0, react_1.useState)(false);
    const [userId, setUserId] = (0, react_1.useState)("");
    const [updateUserRole, { error: updateError, isSuccess }] = (0, userApi_1.useUpdateUserRoleMutation)();
    const { isLoading, data, refetch } = (0, userApi_1.useGetAllUsersQuery)({}, { refetchOnMountOrArgChange: true });
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = (0, userApi_1.useDeleteUserMutation)({});
    (0, react_1.useEffect)(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError;
                react_hot_toast_1.toast.error(errorMessage.data.message);
            }
        }
        if (isSuccess) {
            refetch();
            react_hot_toast_1.toast.success("User role updated successfully");
            setActive(false);
        }
        if (deleteSuccess) {
            refetch();
            react_hot_toast_1.toast.success("Delete user successfully!");
            setOpen(false);
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError;
                react_hot_toast_1.toast.error(errorMessage.data.message);
            }
        }
    }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);
    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", headerName: "Role", flex: 0.5 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params) => {
                return (<>
            <material_1.Button onClick={() => {
                        setOpen(!open);
                        setUserId(params.row.id);
                    }}>
              <ai_1.AiOutlineDelete className="dark:text-white text-black" size={20}/>
            </material_1.Button>
          </>);
            },
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params) => {
                return (<>
            <a href={`mailto:${params.row.email}`}>
              <ai_1.AiOutlineMail className="dark:text-white text-black" size={20}/>
            </a>
          </>);
            },
        },
    ];
    const rows = [];
    if (isTeam) {
        const newData = data && data.users.filter((item) => item.role === "admin");
        newData &&
            newData.forEach((item) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: (0, timeago_js_1.format)(item.createdAt),
                });
            });
    }
    else {
        data &&
            data.users.forEach((item) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: (0, timeago_js_1.format)(item.createdAt),
                });
            });
    }
    const handleSubmit = async () => {
        await updateUserRole({ email, role });
    };
    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id);
    };
    return (<div className="mt-[120px]">
      {isLoading ? (<Loader_1.default />) : (<material_1.Box m="20px">
          {isTeam && (<div className="w-full flex justify-end">
              <div className={`${style_1.styles.button} !w-[200px] !rounded-[10px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`} onClick={() => setActive(!active)}>
                Add New Member
              </div>
            </div>)}
          <material_1.Box m="40px 0 0 0" height="80vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                    color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                    color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderBottom: theme === "dark"
                        ? "1px solid #ffffff30!important"
                        : "1px solid #ccc!important",
                },
                "& .MuiTablePagination-root": {
                    color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none!important",
                },
                "& .name-column--cell": {
                    color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                    borderBottom: "none",
                    color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderTop: "none",
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                    color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#fff !important`,
                },
            }}>
            <x_data_grid_1.DataGrid checkboxSelection rows={rows} columns={columns}/>
          </material_1.Box>
          {active && (<material_1.Modal open={active} onClose={() => setActive(!active)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <material_1.Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${style_1.styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email..." className={`${style_1.styles.input}`}/>
                  <select name="" id="" className={`${style_1.styles.input} !mt-6`} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <div className={`${style_1.styles.button} my-6 !h-[30px]`} onClick={handleSubmit}>
                    Submit
                  </div>
                </div>
              </material_1.Box>
            </material_1.Modal>)}

          {open && (<material_1.Modal open={open} onClose={() => setOpen(!open)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <material_1.Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${style_1.styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div className={`${style_1.styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`} onClick={() => setOpen(!open)}>
                    Cancel
                  </div>
                  <div className={`${style_1.styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`} onClick={handleDelete}>
                    Delete
                  </div>
                </div>
              </material_1.Box>
            </material_1.Modal>)}
        </material_1.Box>)}
    </div>);
};
exports.default = AllCourses;
