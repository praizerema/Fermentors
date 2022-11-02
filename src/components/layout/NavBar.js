import React from "react";
import ColorifixLogo from "../../assets/images/colorifix-icon.svg";

export function NavBar() {
  return (
    <div className="px-6 md:px-12 lg:px-12 2xl:px-12 py-2 mb-16 bg-gray-50 border-solid border-t-2 border-b-2 border-gray-100 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between content-center items-center">
        <div className=" justify-between items-center space-x-6 lg:flex 2xl:flex ">
          <div className="font-bold text-3xl text-[#0E8427] cursor-pointer" onClick={()=>window.location.reload()}><img src={ColorifixLogo} alt="" /></div>
        </div>
      </div>
     
    </div>
  );
}