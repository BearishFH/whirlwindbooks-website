import React from "react";
import Link from "next/link";
import { DocumentUpload } from "../icons/ContentAndEdit";
import { LanguageSquare } from "../icons/Type,Paragraph,Character";

interface HeroBannerProps {
  coverSrc: string;
  title: string;
  description: string;
  backgroundImage?: string;
  bookId?: string;
  hideDescription?: boolean;
  showDetailRow?: boolean;
  month?: string;
  typeLabel?: string;
  chapters?: number;
  words?: number;
 
};
const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  backgroundImage = "/images/main/Banner.png",
  bookId,
  hideDescription = false,
  showDetailRow = false,
  month,
  typeLabel,
  chapters,
  words,
}) => {
  // Button labels and widths
  const primaryLabel = showDetailRow ? "Read Free now" : "Read now";
  const primaryWidthClass = showDetailRow ? "w-[282px]" : "w-[182px]";
  const secondaryWidthClass = showDetailRow ? "w-[280px]" : "w-[140px]";

  return (
    <div
      className="relative w-full  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        aspectRatio: "1440/572",
        minHeight: "400px",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 "></div>

      <div className="relative h-full flex  items-center ml-[-130px]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mt-60 ">
            <h1 className="text-[48px] font-bold w-full max-w-[428px]  text-[#F5F5F7] mb-6 leading-[48px]">
              {title}
            </h1>
            {/* Detail row, only on InsideBookPage */}
            {showDetailRow && (
              <div className="flex mt-20  items-center gap-10 text-[#DAD9D3] mb-6">
               
                {month && (
                  <div className="px-3 py-1 font-bold bg-[#3A3A3A] rounded">
                    {month}
                  </div>
                )}
                
                {typeLabel && (
                  <div className="px-3 py-1 font-bold bg-[#3A3A3A] rounded">
                    {typeLabel}
                  </div>
                )}
                
                {chapters !== undefined && words !== undefined && (
                  <div className="px-3 py-1 bg-[#96969650] text[14px] font-bold rounded">
                    {`${chapters} chapters; ${words.toLocaleString()} words`}
                  </div>
                )}
               
                <DocumentUpload size={24} />
                <LanguageSquare size={24} />
              </div>
            )}
            {/* Description block (hidden on InsideBookPage) */}
            {!hideDescription && (
              <div className="w-full max-w-[313px] h-[79px] bg-[#3a3a3a6b] backdrop-blur-md flex items-center justify-center mb-6">
                <p
                  className="text-[#DAD9D3] text-[20px] font-bold leading-[22px] w-full max-w-[264px] h-[71px] flex items-center justify-center text-center"
                  style={{ fontFamily: '"Inria Serif", serif' }}
                >
                  {description}
                </p>
              </div>
            )}
            <div className="flex items-center ml-[-5px]  space-x-4">
              <Link
                href={bookId ? `/read/${bookId}` : "#"}
                className={`${primaryWidthClass} h-[44px] bg-[#DAD9D3] rounded-full font-bold border border-[#38393C] hover:bg-[#faf7e7] text-black text-[20px] flex items-center justify-center text-center`}
              >
                {primaryLabel}
              </Link>

              <button
                className={`${secondaryWidthClass} h-[44px] bg-gray-800/80 backdrop-blur-sm text-white rounded-full font-bold border border-[#DAD9D3] leading-[22px] text-[20px]`}
              >
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
