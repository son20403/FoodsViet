// MainLayout.jsx
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setNotify } from "../sagas/comments/commentsSlice";
import { customersRequest } from "../sagas/customers/customersSlice";
import { setErrorGlobal, setNotifyGlobal, setSocket } from "../sagas/global/globalSlice";
import Footer from "./Footer";
import Header from "./Header";


import socketIOClient from "socket.io-client";
import BASE_URL from '../connect';
import { postsRequest } from "../sagas/posts/postsSlice";

function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, infoAuth } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.global);

  const tokenLocal = localStorage.getItem("authToken");
  useEffect(() => {
    dispatch(customersRequest());
    dispatch(postsRequest());
    dispatch(setNotify());
    dispatch(setErrorGlobal(""));
    dispatch(setNotifyGlobal(""));
  }, [token, dispatch, tokenLocal, location?.pathname]);
  const navigate = useNavigate();
  useEffect(() => {
    if (token && infoAuth) {
      dispatch(setSocket(socketIOClient(BASE_URL)))
    }
    else {
      dispatch(setSocket(null))
    }
  }, [token, infoAuth]);
  useEffect(() => {
    if (token && infoAuth && socket) {
      socket.emit('newCustomer', infoAuth?._id)
    }
  }, [socket, infoAuth, token]);
  return (
    <div className="relative min-h-[1000px] max-w-[1600px] m-auto flex flex-col overflow-hidden ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
