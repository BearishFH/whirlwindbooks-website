// app/page.tsx
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import HeroBanner from "../components/layouts/HeroBanner";
import BookGrid from "../components/layouts/BookGrid";

const books = [
  {
    id: "1",
    cover: "/images/main/img1.png",
  },
  {
    id: "2",
    cover: "/images/main/img2.png",
  },
  {
    id: "3",

    cover: "/images/main/img3.png",
  },
  {
    id: "4",

    cover: "/images/main/img4.png",
  },
  {
    id: "5",

    cover: "/images/main/img5.png",
  },
  
  {
    id: "6",
    cover: "/images/main/img1.png",
  },
  {
    id: "7",
    cover: "/images/main/img2.png",
  },
  {
    id: "8",

    cover: "/images/main/img3.png",
  },
  {
    id: "9",

    cover: "/images/main/img4.png",
  },
  {
    id: "10",

    cover: "/images/main/img5.png",
  },
];


const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroBanner
        title="The Cyprus Agenda"
        description="A high-stakes cat & mouse between the rich & powerful American and the EU Agent"
        bookId="cyprus-agenda"
      />

      <div className="bg-[#262626] ">
          <BookGrid title="Featured Books" books={books}  />
       
      </div>
    </MainLayout>
  );
};

export default HomePage;
