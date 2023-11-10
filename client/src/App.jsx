import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { router } from "./routes";
import { setSocket } from "./sagas/global/globalSlice";
import socketIOClient from "socket.io-client";
import BASE_URL from "./connect";
import { customersRequest } from "./sagas/customers/customersSlice";
function App() {
  const { token, infoAuth } = useSelector((state) => state.auth);
  const { errorGlobal, notifyGlobal, socket } = useSelector((state) => state.global);
  const dispatch = useDispatch()
  useEffect(() => {
    if (errorGlobal) toast.error(errorGlobal);
  }, [errorGlobal]);
  useEffect(() => {
    if (notifyGlobal) toast.success(notifyGlobal);
  }, [notifyGlobal]);
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
      socket.emit('addUser', infoAuth?._id)
    }
  }, [socket, infoAuth, token]);
  useEffect(() => {
    dispatch(customersRequest())
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
