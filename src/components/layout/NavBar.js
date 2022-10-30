import React, { useState } from "react";
import ColorifixLogo from "../../assets/images/colorifix-icon.svg";

export function NavBar() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className="px-6 md:px-12 lg:px-12 2xl:px-12 py-2 mb-16 bg-gray-50 border-solid border-t-2 border-b-2 border-gray-100 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between content-center items-center">
        <div className=" justify-between items-center space-x-6 lg:flex 2xl:flex ">
          <div className="font-bold text-3xl text-[#0E8427] cursor-pointer" onClick={()=>window.location.reload()}><img src={ColorifixLogo} alt="" /></div>
        </div>
        <div
          className="sm:hidden 2xl:hidden block cursor-pointer"
          onClick={() => setShowMobileNav(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#0E8427"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
      </div>
      <div
        className={
          showMobileNav
            ? " fixed h-full-vh w-full top-0 left-0 backdrop-filter transition duration-1000 ease-in-out "
            : "w-0  hidden"
        }
      >
        <div className="bg-[rgba(255,255,255,0.8)] h-1/2 fixed scroll overflow-y-scroll right-0 2xl:w-5/12 lg:w-5/12 md:w-1/2 sm:w-2/3 w-2/3 p-8 transition-opacity ease-in">
          <div
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="cursor-pointer text-center h-7 w-7 rounded-full bg-gray-100 border border-block border-[#0E8427]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="8px"
              transform="translate(10, 5)"
            >
              <path
                d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                fill="#0E8427"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}