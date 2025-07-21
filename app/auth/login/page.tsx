"use client";

import React from "react";
import Image from "next/image";

type LoginHandler = () => void;

interface BookCoverGridProps {
  covers: string[];
}

interface OAuthButtonProps {
  onClick: LoginHandler;
  iconSrc: string;
  alt: string;
}

const bookCovers: string[] = [
  "/images/login/topImg1.png",
  "/images/login/topImg2.png",
  "/images/login/topImg3.png",
  "/images/login/secondRowfirst.png",
  "/images/login/secondRowSecond.png",
  "/images/login/secondRowthird.png",
  "/images/login/ThirdRowfirst.png",
  "/images/login/secondRowSecond.png",
  "/images/login/thirdRowThird.png",
  "/images/login/bottomImg1.png",
  "/images/login/bottomImg2.png",
  "/images/login/bottomImg3.png",
];

const BookCoverGrid: React.FC<BookCoverGridProps> = ({ covers }) => (
  <div className="hidden lg:block w-1/2 h-screen ">
    <div className="relative w-full h-full overflow-hidden ">
      <div className="relative z-10 grid grid-cols-3 grid-rows-4 h-full gap-x-4 gap-y-2  ">
        {covers.map((cover: string, index: number) => (
          <div
            key={index}
            className="relative w-full rounded-lg overflow-hidden "
            style={{
              aspectRatio: "2/3",
              maxHeight: "calc((90vh - 8rem) / 3)",
            }}
          >
            <Image
              src={cover}
              alt={`Book cover ${index + 1}`}
              fill
              className="object-content"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
const OAuthButton: React.FC<OAuthButtonProps> = ({ onClick, iconSrc, alt }) => (
  <button
    onClick={onClick}
    className="flex-1 h-11 bg-[#DAD9D3] border border-[#B3A89A] flex items-center justify-center transition-colors shadow-sm"
    style={{ borderRadius: "8px" }}
  >
    <Image src={iconSrc} alt={alt} width={24} height={24} className="w-6 h-6" />
  </button>
);

const LoginPage: React.FC = () => {
  const handleGoogleLogin: LoginHandler = () =>
    console.log("Google login clicked");
  const handleGithubLogin: LoginHandler = () =>
    console.log("GitHub login clicked");
  const handleAppleLogin: LoginHandler = () =>
    console.log("Apple login clicked");

  const oauthButtons = [
    {
      onClick: handleGoogleLogin,
      iconSrc: "/icons/login/Google.svg",
      alt: "Google",
    },
    {
      onClick: handleAppleLogin,
      iconSrc: "/icons/login/apple.svg",
      alt: "Apple",
    },
    {
      onClick: handleGithubLogin,
      iconSrc: "/icons/login/key-square.svg",
      alt: "GitHub",
    },
  ];

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{
        backgroundImage: "url('/images/login/ChatGPT Image Jul 9 2025 1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BookCoverGrid covers={bookCovers} />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-12">
            <Image
              src="/images/login/logoImg.png"
              alt="Logo"
              width={64}
              height={64}
              className=" object-contain w-full h-full"
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-white text-3xl font-serif text-[30px] font-bold leading-[38px] mb-2">
              Log in to your account
            </h1>
            <p className="font-serif text-[16px] font-normal leading-[24px] text-[#F5F5F7] text-center">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div
            className="flex rounded-md bg-[#DAD9D3] border border-[#B3A89A] gap-2 mb-12 w-[400px] mx-auto font-serif"
            style={{ borderRadius: "8px" }}
          >
            <button
              className="flex items-center justify-center gap-2 h-9 px-3 py-2 flex-1 text-sm font-medium text-gray-700 rounded-md hover:text-black cursor-default"
              style={{ borderRadius: "8px", fontWeight: 700 }}
              disabled
            >
              Sign up
            </button>
            <button
              className="flex rounded-md items-center border border-[#B3A89A] justify-center gap-2 h-9 px-3 flex-1 text-sm font-medium text-gray-900 bg-[#E0D8CF] shadow"
              style={{ borderRadius: "8px", fontWeight: 700 }}
            >
              Log in
            </button>
          </div>

          <div className="flex gap-2 mb-12 w-[400px] mx-auto">
            {oauthButtons.map((button, index) => (
              <OAuthButton key={index} {...button} />
            ))}
          </div>
          {/* Sign up link*/}
          <div className="text-center mt-12 ">
            <p className="text-[#DAD9D3] font-serif text-sm font-bold leading-5">
              Don't have an account?{" "}
              <button className="text-[#A0BF5B] hover:text-[#c4eb70] font-bold">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;