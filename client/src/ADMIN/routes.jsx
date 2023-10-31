import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,
    NewspaperIcon,
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
                name: "Home",
                path: "/",
            },
            {
                icon: <NewspaperIcon {...icon} />,
                name: "Posts",
                path: "/posts",
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "tables",
                path: "/tables",
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

export default routes