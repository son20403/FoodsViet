import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LayoutEditAdmin = ({ children, onClick = () => { } }) => {
    return (
        <div className=' fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  
            h-full max-h-[80%] w-full max-w-[850px] mx-auto  z-[990] rounded-sm overflow-hidden '>
            <div className='zoom bg-blue-gray-50 h-full max-h-[650px] overflow-y-auto transition-all overscroll-none'>
                <div className='absolute top-2 right-5 text-2xl text-primary cursor-pointer z-10' onClick={onClick}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default LayoutEditAdmin;