// MainLayout.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setNotify } from "../sagas/comments/commentsSlice";
import { customersRequest } from "../sagas/customers/customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../sagas/global/globalSlice";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const tokenLocal = localStorage.getItem("authToken");
  useEffect(() => {
    dispatch(customersRequest());
    dispatch(setNotify());
    dispatch(setErrorGlobal(""));
    dispatch(setNotifyGlobal(""));
  }, [token, dispatch, tokenLocal, location?.pathname]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token]);
  return (
    <div className="relative min-h-[1000px] max-w-[1600px] m-auto flex flex-col ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
