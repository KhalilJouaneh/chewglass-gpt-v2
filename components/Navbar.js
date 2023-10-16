import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="header-big-container">
      <nav className="navbar-container mobile-nav">
        <div className="flex flex-wrap items-center justify-between mx-auto pt-7">
          <div className="flex items-center">
            <div className="flex ml-[100px] navbar-items text-[#F8F7F7] font-semibold text-[14px]">
              <Image
                src="/logo.svg"
                alt="ChewGlass GPT Logo"
                width={30}
                height={20}
                className="mr-2"
              />
              {/* Chew<span className="gradient-text">Glass</span>&nbsp;Labs */}
            </div>
          </div>

          <div className="flex items-center mr-5">{/* Twitter */}</div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
