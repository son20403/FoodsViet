import { useLocation, Link } from "react-router-dom";
import {
  Navbar, Typography, IconButton, Breadcrumbs, Input, Menu, MenuHandler, MenuList, MenuItem, Avatar
} from "@material-tailwind/react";
import {
  Bars3Icon,
  ClockIcon,
  BellIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchAdmin, toggleSideBar } from "../../sagas/global/globalSlice";
import { useEffect, useState } from "react";
import { getNotificationByAdminRequest, updateNotificationAdminRequest } from "../../sagas/notification/notificationSlice";
import useTimeSince from "../../hooks/useTimeSince";


export function DashboardNavbar() {
  const dispatch = useDispatch()
  const fixedNavbar = true
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { infoAdmin } = useSelector((state) => state.admin)
  const { notificationsAdmin } = useSelector((state) => state.notification)
  const { socketAdmin } = useSelector((state) => state.global)
  const [notificationIsActive, setNotificationIsActive] = useState(0);
  let totalNotificationActive = 0;
  if (notificationsAdmin?.length > 0) {
    totalNotificationActive = notificationsAdmin.filter((noti) => noti.status === true).length;
  }
  const setOpenSidenav = () => {
    dispatch(toggleSideBar())
  }
  const handleGetNotification = () => {
    dispatch(getNotificationByAdminRequest());
  };
  const handleShowSearch = () => {
    dispatch(toggleSearchAdmin())
  }
  useEffect(() => {
    handleGetNotification()
  }, [page]);

  useEffect(() => {
    if (socketAdmin) {
      socketAdmin.on("notificationAdmin", () => {
        setTimeout(() => {
          handleGetNotification();
        }, 500);
      });
      socketAdmin.on('updateNotificationAdmin', () => {
        setTimeout(() => {
          dispatch(handleGetNotification())
        }, 200);
      })
    }
  }, [socketAdmin]);
  let pages = "Thống kê"
  switch (page) {
    case 'posts':
      pages = 'Bài viết'
      break;
    case 'categories':
      pages = 'Danh mục'
      break;
    case 'customers':
      pages = 'Người dùng'
      break;
    case 'feedBack':
      pages = 'Phản hồi'
      break;
    case 'manage':
      pages = 'Quản lý'
      break;
    case 'comments':
      pages = 'Bình luận'
      break;
    case 'statistical':
      pages = 'Thống kê'
      break;
    default:
      break;
  }
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}/statistical`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout || ''}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {pages}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {pages}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="block mr-4 cursor-pointer" onClick={handleShowSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <Avatar src={infoAdmin?.image} size="sm" />
          </div>
          <Menu>
            <MenuHandler>
              <div className="relative">
                <div className="absolute text-xs p-3 z-10 flex items-center justify-center bg-red-500 
                text-white -right-1 -top-2 rounded-full">
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {totalNotificationActive}</span>
                </div>
                <IconButton variant="text" color="blue-gray" className="mx-1">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </div>
            </MenuHandler>
            <MenuList
              className="w-max border-0 flex flex-col gap-y-3 max-h-[400px] overflow-y-auto overscroll-none">
              {notificationsAdmin && notificationsAdmin?.length > 0 ? notificationsAdmin?.map((notify) => (
                <NotifyItem key={notify?._id + notify} notify={notify}></NotifyItem>
              ))
                : <div className='text-center'>Không có thông báo nào</div>
              }
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden mr-4"
            onClick={setOpenSidenav}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}


export default DashboardNavbar;

const NotifyItem = ({ notify }) => {
  const timeSince = useTimeSince()
  const dispatch = useDispatch()
  const { customers } = useSelector((state) => state.admin);
  const { socketAdmin } = useSelector((state) => state.global);
  const infoCustomer = customers.find((cus) => cus._id === notify?.id_sender)
  const handleUpdateNotification = () => {
    if (notify?.status === true) {
      dispatch(updateNotificationAdminRequest(notify?._id))
      if (socketAdmin) {
        socketAdmin.emit('updateNotificationAdmin')
      }
    }
  }

  return (
    <Link to={`/admin/posts#id_post=${notify?.id_post}`}>
      <MenuItem className={`flex items-center gap-3 ${notify?.status ? 'bg-primary bg-opacity-10' : ''}`} onClick={handleUpdateNotification}>
        <Avatar
          src={infoCustomer?.image}
          alt="item-1"
          size="sm"
          variant="circular"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-normal"
          >
            <strong>{infoCustomer?.full_name}</strong> Đã đăng bài viết mới!
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center gap-1 text-xs font-normal opacity-60"
          >
            <ClockIcon className="h-3.5 w-3.5" /> {timeSince(notify?.timestamps)}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  )
}
