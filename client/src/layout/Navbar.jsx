import React from 'react';

import { NavLink } from 'react-router-dom';
import Overlay from './common/Overlay';
import { Heading } from '../components/heading';

const listLink = [
    {
        id: 1,
        title: 'Trang chủ',
        to: '/',
    },
    {
        id: 2,
        title: 'Danh mục',
        to: '/categories',
    },
    {
        id: 3,
        title: 'Bài viết',
        to: '/posts',
    },
    {
        id: 4,
        title: 'Về FoodsViet',
        to: '/about',
    },
    {
        id: 5,
        title: 'Liên hệ',
        to: '/contact',
    },
]

const Navbar = ({ showNavbar, handleShowNavbar }) => {
    return (
        <>
            <Overlay show={showNavbar} onClick={handleShowNavbar}></Overlay>
            <div className={`flex-1 absolute  bg-white-cream flex top-full w-full justify-center gap-5 transition-all
                flex-col px-5 py-5 text-sm z-[10] shadow-soft border-t border-primary
                ${showNavbar ? 'left-0' : '-left-full'}
                lg:gap-10 md:static md:flex-row md:p-0 md:bg-transparent md:flex md:gap-4
                md:shadow-transparent md:border-0`}>
                {listLink.map(({ to, title, id }) => (
                    <NavLink
                        className={({ isActive }) => isActive ? 'text-primary' : ''} key={id} to={to}>
                        <Heading isHeading className='text-base font-medium z-[9]'>{title}</Heading></NavLink>
                ))}
            </div>
        </>
    );
};

export default Navbar;