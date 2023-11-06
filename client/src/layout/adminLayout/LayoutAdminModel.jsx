import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LayoutAdminModel = ({ children, onClick = () => { }, className = '' }) => {
  return (
    <div
      className={` fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  
            h-full w-full  mx-auto  z-[990] rounded-sm overflow-hidden !max-w-[80%] !max-h-[90%] ${className} `}
    >
      <div className="zoom bg-blue-gray-50 h-full max-h-[650px] overflow-y-auto transition-all overscroll-none p-5">
        <div
          className="absolute z-10 text-2xl cursor-pointer top-2 right-5 text-primary"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutAdminModel;
