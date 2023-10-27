import React from 'react';
import Logo from '../components/logo/Logo';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutuberIcon } from '../components/Icon';

const Footer = () => {
    return (
        <div className=' bg-white-cream w-full mt-auto'>
            <div className='page-content flex flex-col items-start py-5 px-5 gap-y-10
            lg:justify-between lg:items-center lg:flex-row lg:gap-0 lg:px-2
            '>
                <div>
                    <Logo></Logo>
                    <div className='text-xs text-text-gray'>Món ăn Việt - Trải nghiệm Việt</div>
                </div>
                <div className='flex-1 grid grid-cols-2 text-sm gap-10 
                sm:grid-cols-4 sm:gap-5 sm:text-center 
                lg:flex lg:justify-center lg:items-center lg:gap-10'>
                    <div>Home</div>
                    <div>Post</div>
                    <div>About</div>
                    <div>Contact</div>
                </div>
                <div className='flex gap-10 text-text-gray items-center'>
                    <span className='text-sm'>Follow me:</span>
                    <InstagramIcon></InstagramIcon>
                    <TwitterIcon></TwitterIcon>
                    <YoutuberIcon></YoutuberIcon>
                    <FacebookIcon></FacebookIcon>
                </div>
            </div>
        </div>
    );
};

export default Footer;