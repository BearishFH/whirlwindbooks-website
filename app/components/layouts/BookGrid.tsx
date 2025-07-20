"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InformationBug } from "../icons/Essentional";

interface Book {
  id: string;
  cover: string;
  title?: string;
}

interface BookGridProps {
  title?: string;            // unused in simple mode
  books: Book[];
  simple?: boolean;          // NEW flag
}

const BookGrid: React.FC<BookGridProps> = ({
  title,
  books,
  simple = false,           // default is full mode
}) => {
  // fallback data only for full mode
  const fallbackBooks: Book[] = [
    { id: "1", cover: "/images/main/img1.png" },
    { id: "2", cover: "/images/main/img2.png" },
    { id: "3", cover: "/images/main/img3.png" },
    { id: "4", cover: "/images/main/img4.png" },
    { id: "5", cover: "/images/main/img5.png" },
    { id: "6", cover: "/images/main/img6.png" },
    { id: "7", cover: "/images/main/img7.png" },
    { id: "8", cover: "/images/main/img1.png" },
    { id: "9", cover: "/images/main/img2.png" },
    { id: "10", cover: "/images/main/img3.png" },
  ];
if (simple) {
  return (
    <div className=" grid grid-cols-6 gap-[120px] overflow-hidden  ml-[-70px]  py-4">
      {books.map((book, idx) => (
        <BookItem key={book.id} book={book} index={idx} isFirstRow={false} />
      ))}
    </div>
  );
}


  // Full mode (original): two rows with fallback
  const booksToUse = books.length > 0 ? books : fallbackBooks;

  return (
    <section className="py-8 bg-[#1a1a1a]">
      <div className="container mx-auto px-6 ml-[10px]">
        <h2 className="text-white text-[32px] font-bold mb-6">
          Continue Reading for Jackie
        </h2>
        <div className="flex flex-wrap gap-4 justify-center ml-[-30px]">
          {booksToUse.slice(0, 5).map((book, idx) => (
            <BookItem key={book.id} book={book} index={idx} isFirstRow={true} />
          ))}
        </div>

        <h2 className="text-white text-[32px] font-bold mb-6 mt-10">
          Your Next Reading
        </h2>
        <div className="flex flex-wrap gap-4 justify-center ml-[-30px]">
          {booksToUse.slice(5, 10).map((book, idx) => (
            <BookItem
              key={book.id}
              book={book}
              index={idx}
              isFirstRow={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookItem: React.FC<{
  book: Book;
  index: number;
  isFirstRow: boolean;
}> = ({ book, index, isFirstRow }) => {
  const hasBookmark = isFirstRow && (index === 0 || index === 1);
  const hasInfoIcon = isFirstRow && index === 2;

  return (
    <Link
      href={`/insideBook/${book.id}`}
      className="group block w-[228px] h-[142px]"
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={book.cover}
          alt={book.title ?? "Book cover"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {hasBookmark && (
          <div className="absolute top-2 left-2 z-10">
            <Image
              src="/images/main/bookmark.png"
              alt="Bookmark"
              width={24}
              height={24}
            />
          </div>
        )}

        {hasInfoIcon && (
          <div className="absolute top-2 right-2 z-10">
            <InformationBug />
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
      </div>
    </Link>
  );
};

export default BookGrid;
