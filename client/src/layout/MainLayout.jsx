// MainLayout.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { setNotify } from "../sagas/comments/commentsSlice";
import { customersRequest } from "../sagas/customers/customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../sagas/global/globalSlice";
import Footer from "./Footer";
import Header from "./Header";

import { postsRequest } from "../sagas/posts/postsSlice";

function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, infoAuth } = useSelector((state) => state.auth);
  const tokenLocal = localStorage.getItem("authToken");
  const { socket } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(customersRequest());
    dispatch(postsRequest());
    dispatch(setNotify());
    dispatch(setErrorGlobal(""));
    dispatch(setNotifyGlobal(""));
  }, [token, dispatch, tokenLocal, location?.pathname]);
  useEffect(() => {
    const handleTabClose = () => {
      socket.emit('userUnconnect', infoAuth?._id);
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [socket]);
  return (
    <div className="relative min-h-[1000px] max-w-[1600px] m-auto flex flex-col overflow-hidden ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
