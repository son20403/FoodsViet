import React from 'react';
import { Link } from "react-router-dom";

const Breadcrumbs = ({ path }) => {

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/categories", breadcrumb: "Danh mục" },
        { path: "/detail", breadcrumb: "Bài viết chi tiết" },
        { path: "/products/category2", breadcrumb: "Danh mục 2" },
    ];
    const breadcrumbItems = routes
        .filter((route) => path.startsWith(route.path))
        .map((route) => (
            <li key={route.path}>
                <Link to={route.path}>{route.breadcrumb}</Link>
            </li>
        ));

    return <ul className=' flex gap-10'>{breadcrumbItems}</ul>;
};

export default Breadcrumbs;



