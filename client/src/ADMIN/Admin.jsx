import { Outlet } from "react-router-dom";
import Sidenav from "../layout/adminLayout/SideBarAdmin";
import DashboardNavbar from "../layout/adminLayout/NavBarAdmin";
import routes from "./routes";
import FooterAdmin from "../layout/adminLayout/FooterAdmin";

export function Dashboard() {
    //   const [controller, dispatch] = useMaterialTailwindController();
    //   const { sidenavType } = controller;
    const sidenavType = 'dark'
    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
            />
            <div className="p-4 xl:ml-80 min-h-screen flex flex-col">
                <DashboardNavbar />
                <Outlet></Outlet>
                <div className="text-blue-gray-600 mt-auto">
                    <FooterAdmin />
                </div>
            </div>
        </div>
    );
}

// Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
