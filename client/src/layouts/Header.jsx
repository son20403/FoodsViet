import React, { useEffect, useRef, useState } from 'react';
import Logo from '../components/logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import useToggle from '../hooks/useToggle';
import Setting from './Setting';
import Search from './Search';
import Avatar from './customers/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar, toggleSearch, toggleSetting, closeNavbar, closeSearch, closeSetting } from '../sagas/global/globalSlice';
import { useLocation } from 'react-router-dom';
import { SearchIcon } from '../components/Icon';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { showSearch, showSetting, showNavbar } = useSelector((state) => state.global)
    const { infoAuth } = useSelector((state) => state.auth)
    const { customers } = useSelector((state) => state.customers)
    const dataAuth = customers.filter((cus) => cus._id === infoAuth?._id)[0]
    const handleShowNavbar = () => {
        dispatch(toggleNavbar())
        dispatch(closeSearch())
        dispatch(closeSetting())
    }
    const handleShowSearch = () => {
        dispatch(toggleSearch())
        dispatch(closeNavbar())
        dispatch(closeSetting())
    }
    const handleShowSetting = () => {
        dispatch(toggleSetting())
        dispatch(closeNavbar())
        dispatch(closeSearch())
    }
    useEffect(() => {
        dispatch(closeNavbar())
        dispatch(closeSearch())
        dispatch(closeSetting())
    }, [location?.pathname, dispatch]);

    const [isScroll, setIsScroll] = useState(false);
    useEffect(() => {
        const handleScrollbar = () => {
            setIsScroll(window.scrollY >= 50);
        }
        window.addEventListener('scroll', handleScrollbar)
        return () => {
            window.removeEventListener('scroll', handleScrollbar)
        }
    }, []);
    return (
        <div className={`fixed  top-0 left-0 right-0 z-[10] duration-300 
        ${isScroll ? 'bg-white text-black shadow-3xl' : 'md:text-white'}`}>
            <Search showSearch={showSearch} handleShowSearch={handleShowSearch}></Search>
            <div className='page-content relative px-2 md:px-3 lg:px-2 flex items-center py-2 justify-between'>
                <div className='z-[10]'>
                    <Logo></Logo>
                </div>
                <Navbar handleShowNavbar={handleShowNavbar} showNavbar={showNavbar}></Navbar>
                <Setting show={showSetting} onClick={handleShowSetting}></Setting>
                <div className='flex items-center gap-7  z-[10]'>
                    <span className={`text-2xl  font-thin flex justify-center items-center cursor-pointer
                     ${isScroll ? '!text-black ' : '!text-white'}`}
                        onClick={handleShowSearch}>
                        <SearchIcon />
                    </span>
                    <Avatar onClick={handleShowSetting} image={dataAuth?.image}></Avatar>
                    <div className='md:hidden' onClick={handleShowNavbar}>
                        <FontAwesomeIcon className={` ${showNavbar ? 'text-2xl' : 'text-xl'} 
                        ${isScroll ? '!text-black ' : '!text-white'}`}
                            icon={showNavbar ? faXmark : faBars} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;