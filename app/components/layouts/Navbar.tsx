"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchNormalTwoIcon } from "../icons/Search";
import { ProfileCircle } from "../icons/Users";
import { DocumentUpload } from "../icons/ContentAndEdit";

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-8">
        {/*  Logo and Whirlwind Title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex justify-center items-center w-[48px] h-[48px] flex-shrink-0">
            <Image
              src="/images/login/logoImg.png"
              alt="Whirlwind Logo"
              width={48}
              height={48}
              className="w-[48px] h-[48px] object-contain"
            />
          </div>
          <span
            className="text-[#DAD9D3] font-bold text-[28px] leading-[22px]"
            style={{ fontFamily: '"Inria Serif", serif' }}
          >
            Whirlwind
          </span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors font-light text-[20px]"
          >
            Home
          </Link>
          <Link
            href="/singles"
            className="text-white hover:text-gray-300 transition-colors font-light text-[20px]"
          >
            Singles
          </Link>
          <Link
            href="/series"
            className="text-white hover:text-gray-300 transition-colors font-light text-[20px]"
          >
            Series
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <Link
          href="/upload"
          className="text-[#F5F5F7] hover:text-gray-300 transition-colors"
        >
          <DocumentUpload />
        </Link>
        <button className="text-[#F5F5F7] hover:text-gray-300 transition-colors">
          <SearchNormalTwoIcon />
        </button>
        <div className="flex items-center space-x-3">
          <ProfileCircle />
        </div>
        <button
          className="bg-[#31343C] hover:bg-[#4d515c] text-[#F5F5F7] px-4 py-2 text-sm font-medium transition-colors border border-[#DAD9D3]"
          style={{ borderRadius: "6px" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;