'use client'
import React from "react";
import Navbar from "./Navbar";


interface MainLayoutProps {
  children: React.ReactNode;
  currentUser?: {
    name: string;
    avatar?: string;
  };
  showNavbar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentUser,
  showNavbar = true,
}) => {
  return (
    <div className="min-h-screen bg-[#262626]">
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
