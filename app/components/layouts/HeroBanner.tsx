import React from "react";
import Link from "next/link";

interface HeroBannerProps {
  title: string;
  description: string;
  backgroundImage?: string;
  bookId?: string;
 
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  backgroundImage = "/images/main/Banner.png",
  bookId,
 

}) => {
  return (
    <div
      className="relative w-full  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        aspectRatio: "1440/572", // Matches your banner dimensions
        minHeight: "400px", // Ensures minimum height on smaller screens
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 "></div>

      <div className="relative h-full flex  items-center ml-[-130px]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mt-60 ">
            <h1 className="text-[48px] font-bold w-full max-w-[428px] text-[#F5F5F7] mb-6 leading-[48px]">
              {title}
            </h1>

            <div className="w-full max-w-[313px] h-[79px] bg-[#3a3a3a6b] backdrop-blur-md flex items-center justify-center mb-6">
              <p
                className="text-[#DAD9D3] text-[20px] font-bold leading-[22px] w-full max-w-[264px] h-[71px] flex items-center justify-center text-center "
                style={{ fontFamily: '"Inria Serif", serif' }}
              >
                {description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href={bookId ? `/books/${bookId}` : "#"}
                className="text-black w-[182px] h-[44px] bg-[#DAD9D3] rounded-full font-bold border border-[#38393C] hover:bg-[#faf7e7] text-[20px] flex items-center justify-center text-center"
              >
                Read now
              </Link>

              <button className="bg-gray-800/80 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold border w-[140px] h-[44px] border-[#DAD9D3] leading-[22px] text-[20px]">
                My list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
