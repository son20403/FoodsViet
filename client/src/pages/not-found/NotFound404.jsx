import React from 'react';

const NotFound404 = () => {
    return (
        <div>
            <div className=''>
                <div className="h-screen w-full flex justify-center items-center bg-[#1A2238] flex-col">
                    {/* <img src="../src/assets/log.svg" alt="" /> */}
                    <h1 className="font-extrabold text-9xl text-white tracking-wide">
                        404
                    </h1>
                    <div className="bg-[#FF6A3D] text-sm px-2 rounded rotate-12 absolute">
                        Page not found
                    </div>
                    <button className="mt-5">
                        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                <router-link to="/">Go Home</router-link>
                            </span>
                        </a>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default NotFound404;