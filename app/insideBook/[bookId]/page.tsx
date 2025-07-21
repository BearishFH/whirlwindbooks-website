"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/layouts/Navbar";
import HeroBanner from "@/app/components/layouts/HeroBanner";
import BookGrid from "@/app/components/layouts/BookGrid";
import { AddCircle, SendTwo } from "@/app/components/icons/Essentional";
import { Star } from "@/app/components/icons/SupportLikeQues";

export default function InsideBookPage() {
  const { bookId } = useParams();
  const book = {
    id: bookId,
    title: "The Cyprus Agenda",
    cover: "/images/main/Banner.png",
    month: "Sept 2025",
    type: "Single",
    chapters: 10,
    words: 20000,
    description:
      `She found the camera covered in blood, its lens cracked like a shattered eye. ` +
      `The memory card was missing, ripped out with such force the slot was warped. ` +
      `On the wall behind it, scrawled in something that looked disturbingly fresh, ` +
      `were the words: "YOU’RE NEXT, LUCIA." The room was silent, but the air buzzed ` +
      `with the threat of something unfinished—something watching.`,
    tags: ["Romance", "Brazil", "Long", "Long", "Long"],
    recommended: [
      { id: "1", cover: "/images/main/img1.png" },
      { id: "2", cover: "/images/main/img2.png" },
      { id: "3", cover: "/images/main/img3.png" },
      { id: "4", cover: "/images/main/img4.png" },
      { id: "5", cover: "/images/main/img5.png" },
      { id: "6", cover: "/images/main/img5.png" },
    ],
  };

  return (
    <div className="min-h-screen  bg-[#262626] text-white flex flex-col">
      {/*  Navbar */}
      <Navbar />
      {/*  Hero banner with cover, title, meta and primary actions */}
      <HeroBanner
        coverSrc={book.cover}
        title={book.title}
        description={book.description}
        backgroundImage={book.cover}
        bookId={book.id}
        showDetailRow={true}
        month={book.month}
        typeLabel={book.type}
        chapters={book.chapters}
        words={book.words}
        metaLeft={[
          { label: book.month, variant: "filled" },
          { label: book.type, variant: "outline" },
          { label: `${book.chapters} Chapters`, variant: "text" },
          { label: `${book.words.toLocaleString()} words`, variant: "text" },
        ]}
        hideDescription={true}
        actions={[
          {
            label: "Read Free Now",
            style: "primaryOutline",
            href: `/read/${book.id}`,
          },
          { label: "My list", style: "secondary", href: `/my-list` },
        ]}
        utilityIcons={[
          { Icon: AddCircle, onClick: () => console.log("Add to list") },
          { Icon: Star, onClick: () => console.log("Rate") },
          { Icon: SendTwo, onClick: () => console.log("Share") },
        ]}
      />
      {/*  Description */}
      <section className="px-3 md:px-12  lg:px-24 py-8 max-w-10xl mx-auto   ml-[-60px]">
        <h2
          className="text-[20px] font-bold mb-4 w-[144px] h-[24px] "
          style={{ fontFamily: "Inria Serif", fontStyle: "italic" }}
        >
          Description
        </h2>
        <p
          className="text-[#DAD9D3]   leading-relaxed"
          style={{ fontFamily: "Inria Serif", fontStyle: "italic" }}
        >
          {book.description}
        </p>
        <button className="mt-10 text-[14px] text-sm font-bold underline text-[#ffffff] hover:underline">
          Read more
        </button>
      </section>
      {/* Icons and Tags Row */}
      <div className=" px-6 md:px-12 lg:px-24 flex items-center justify-between mb-12">
        {/* Left: utility icons */}
        <div className="flex items-center gap-[110px] ml-[-55px] text-gray-300">
          <button
            onClick={() => console.log("Add to list")}
            className="flex flex-col items-center space-y-1"
          >
            <AddCircle size={24} />
            <span className="text-xs">My list</span>
          </button>
          <button
            onClick={() => console.log("Rate")}
            className="flex flex-col items-center space-y-1"
          >
            <Star size={24} />
            <span className="text-xs">Rate</span>
          </button>
          <button
            onClick={() => console.log("Share")}
            className="flex flex-col items-center space-y-1"
          >
            <SendTwo size={24} />
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="
        flex 
        items-center 
        justify-center 
        w-[102px] 
        h-[44px] 
        text-[16px] 
        bg-[#3A3A3A]
        border 
        whitespace-nowrap
      "
              style={{
                borderRadius: "10px",
                borderColor:
                  tag === "Romance"
                    ? "#c34f4f"
                    : tag === "Brazil"
                    ? "#4fbf5e"
                    : tag === "Long"
                    ? "#A12424"
                    : "#4f6bcf",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* “You’ll love these”  */}
      <div className="px-6  md:px-12 lg:px-24 pb-12 ">
        <h3 className="text-2xl font-semibold mb-4 ml-[-60px]">
          You’ll love these
        </h3>
        <BookGrid books={book.recommended} simple />
      </div>
    </div>
  );
}
