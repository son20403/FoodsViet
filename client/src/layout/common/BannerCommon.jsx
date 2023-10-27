import React from 'react';

const BannerCommon = ({ image, title, className = '' }) => {
    return (
        <div className={`w-full h-full relative min-h-[100%] bg-cover bg-center bg-fixed ${className}`}
            style={{ backgroundImage: `url(${image})` }}>
            <div className='absolute inset-0 bg-black bg-opacity-70 flex z-0 justify-center items-center'></div>
            <div className='flex flex-col items-center text-white py-20 md:py-32     lg:py-40 '>
                <h1 className='text-2xl md:text-7xl lg:text-8xl font-bold font-logo z-[1]'
                    style={{ fontFamily: `Dancing Script, cursive` }}>{title}</h1>
            </div>
        </div>
    );
};

export default BannerCommon;