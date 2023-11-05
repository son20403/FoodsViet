import { Outlet, useNavigate } from "react-router-dom";
import Sidenav from "../layout/adminLayout/SideBarAdmin";
import DashboardNavbar from "../layout/adminLayout/NavBarAdmin";
import routes from "./routes";
import FooterAdmin from "../layout/adminLayout/FooterAdmin";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
  UserPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddPostAdmin from "../layout/adminLayout/posts/AddPostAdmin";
import useToggle from "../hooks/useToggle";
import { handleCreatePosts } from "../sagas/posts/handles";
import AddCategotiesAdmin from "../layout/adminLayout/categories/AddCategotiesAdmin";
export function Dashboard() {
  const navLink = [
    {
      id: 1,
      title: "Thêm bài viết",
      icon: <DocumentPlusIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleAddPost();
      },
    },
    {
      id: 2,
      title: "Thêm loại",
      icon: <FolderPlusIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleCategories();
      },
    },
    {
      id: 3,
      title: "Thêm người dùng",
      icon: <UserPlusIcon className="w-5 h-5" />,
      onclick: () => {},
    },
    {
      id: 4,
      title: "Thêm nhân viên",
      icon: <UserCircleIcon className="w-5 h-5" />,
      onclick: () => {},
    },
  ];
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className: `absolute top-2/4 w-[150px] text-white p-1 bg-primary/90 rounded-full 
             -translate-y-2/4 -translate-x-3/4 font-normal  `,
  };
  const { tokenAdmin } = useSelector((state) => state.admin);
  const { handleToggle: handleToggleAddPost, toggle: showAddPost } =
    useToggle(false);
  const { handleToggle: handleToggleCategories, toggle: showCategories } =
    useToggle(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenAdmin) navigate("/admin/signin");
  }, [tokenAdmin]);
  return (
    <div className="min-h-screen bg-blue-gray-50/50 max-w-[1600px] mx-auto !relative">
      <Sidenav routes={routes} />
      <div className="flex flex-col min-h-screen p-4 xl:ml-80">
        <DashboardNavbar />
        <Outlet></Outlet>
        <div className="mt-auto text-blue-gray-600">
          <FooterAdmin />
        </div>
      </div>
      <div className="fixed bottom-10 right-10">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full bg-primary">
              <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="bg-white border rounded-full shadow-xl border-blue-gray-50 shadow-black/10">
            {navLink.map((nav) => (
              <SpeedDialAction
                onClick={nav.onclick}
                key={nav.id}
                className="relative text-white bg-primary/90"
              >
                {nav.icon}
                <Typography {...labelProps}>{nav.title}</Typography>
              </SpeedDialAction>
            ))}
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <AddPostAdmin
        onClick={handleToggleAddPost}
        show={showAddPost}
      ></AddPostAdmin>
      <AddCategotiesAdmin
        onClick={handleToggleCategories}
        show={showCategories}
      ></AddCategotiesAdmin>
    </div>
  );
}

export default Dashboard;