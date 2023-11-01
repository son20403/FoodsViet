import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    Avatar,
    Button,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../../sagas/global/globalSlice";

export function Sidenav({ brandImg, brandName, routes }) {
    const { infoAdmin } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const sidenavTypes = {
        dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
        white: "bg-primary shadow-lg",
        transparent: "bg-transparent",
    };
    const { showNavbar: openSidenav } = useSelector((state) => state.global)
    const setOpenSidenav = () => {
        dispatch(toggleNavbar())
    }
    const sidenavType = 'dark'
    const sidenavColor = 'white'

    return (
        <aside
            className={`${sidenavTypes['white']} ${openSidenav ? "translate-x-0" : "-translate-x-80"
                } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
        >
            <div
                className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
                    }`}
            >
                <Link to="/" className="flex items-center gap-4 py-6 px-8">
                    <Avatar src={infoAdmin?.image || brandImg} size="sm" />
                    <Typography
                        variant="h6"
                        color={sidenavType === "dark" ? "white" : "blue-gray"}
                    >
                        {brandName}
                    </Typography>
                </Link>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={setOpenSidenav}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
                </IconButton>
            </div>
            <div className="m-4">
                {routes.map(({ layout, title, pages }, key) => (
                    <ul key={key} className="mb-4 flex flex-col gap-1">
                        {title && (
                            <li className="mx-3.5 mt-4 mb-2">
                                <Typography
                                    variant="small"
                                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                                    className="font-black uppercase opacity-75"
                                >
                                    {title}
                                </Typography>
                            </li>
                        )}
                        {pages.map(({ icon, name, path }) => (
                            <li key={name}>
                                <NavLink to={`/${layout}${path}`}>
                                    {({ isActive }) => (
                                        <Button
                                            variant={isActive ? "gradient" : "text"}
                                            color={
                                                isActive
                                                    ? sidenavColor
                                                    : sidenavType === "dark"
                                                        ? "white"
                                                        : "blue-gray"
                                            }
                                            className="flex items-center gap-4 px-4 capitalize"
                                            fullWidth
                                        >
                                            {icon}
                                            <Typography
                                                color="inherit"
                                                className="font-medium capitalize"
                                            >
                                                {name}
                                            </Typography>
                                        </Button>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </aside>
    );
}

Sidenav.defaultProps = {
    brandImg: "../src/assets/image/user.png",
    brandName: "FOODSVIET",
};

Sidenav.propTypes = {
    brandImg: PropTypes.string,
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
