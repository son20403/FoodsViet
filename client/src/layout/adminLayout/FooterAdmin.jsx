import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function FooterAdmin({ brandName, brandLink, routes }) {
    const year = new Date().getFullYear();

    return (
        <footer className="py-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                <Typography variant="small" className="font-normal text-inherit">
                    &copy; {year}, made with{" "}
                    <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" /> by{" "}
                    <a
                        href={brandLink}
                        target="_blank"
                        className="transition-colors hover:text-blue-500" rel="noreferrer"
                    >
                        {brandName}
                    </a>{" "}
                    for a better web.
                </Typography>
            </div>
        </footer>
    );
}

FooterAdmin.defaultProps = {
    brandName: "Creative Tim",
    brandLink: "https://www.creative-tim.com",
    routes: [
        { name: "Creative Tim", path: "https://www.creative-tim.com" },
        { name: "About Us", path: "https://www.creative-tim.com/presentation" },
        { name: "Blog", path: "https://www.creative-tim.com/blog" },
        { name: "License", path: "https://www.creative-tim.com/license" },
    ],
};

FooterAdmin.propTypes = {
    brandName: PropTypes.string,
    brandLink: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
};

FooterAdmin.displayName = "/src/widgets/layout/footer.jsx";

export default FooterAdmin;
