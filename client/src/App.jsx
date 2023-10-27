import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { router } from "./routes";

function App() {
  const { token } = useSelector((state) => state.auth);
  const { errorGlobal, notifyGlobal } = useSelector((state) => state.global);
  useEffect(() => {
    if (errorGlobal) toast.error(errorGlobal);
  }, [errorGlobal]);
  useEffect(() => {
    if (notifyGlobal) toast.success(notifyGlobal);
  }, [notifyGlobal]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
