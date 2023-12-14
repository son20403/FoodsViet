import {
  HomeIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
  UserIcon,
  EnvelopeOpenIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon,
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
        icon: <UserIcon {...icon} />,
        name: "Người dùng",
        path: "/customers",
      },
      {
        icon: <ChatBubbleLeftIcon {...icon} />,
        name: "Bình luận",
        path: "/comments",
      },
      {
        icon: <EnvelopeOpenIcon {...icon} />,
        name: "Phản hồi",
        path: "/feedBack",
      },
      {
        icon: <ShieldCheckIcon {...icon} />,
        name: "Quản lý",
        path: "/manage",
      },
    ],
  },
];

export default routes;
