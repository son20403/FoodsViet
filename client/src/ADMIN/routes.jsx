import {
  HomeIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
export const icon = {
  className: "w-5 h-5 text-inherit",
};
const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Thống kê",
        path: "/",
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "Bài viết",
        path: "/posts",
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: "Loại",
        path: "/categories",
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
      },
    ],
  },
];

export default routes;
