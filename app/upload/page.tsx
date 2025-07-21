"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/layouts/Navbar";
import { JSX } from "react";
import {
  ArrowSquareLeft,
  ArrowSquareRight,
} from "../components/icons/Arrow";
import { BookSquare } from "../components/icons/Archive";
import { BookMarkTwo } from "../components/icons/SchoolLearning";
import { AirPlane } from "../components/icons/Car";
const languages = [
  "English",
  "French",
  "German",
  "Portuguese",
  "Korean",
  "Spanish",
  "Italian",
  "Russian",
  "Arabic",
  "Japanese",
] as const;

type Language = (typeof languages)[number];

interface FormData {
  title: string;
  wordCount: string;
  releaseMonth: string;
  releaseYear: string;
  description: string;
  tags: string;
  releaseDate: string;
}

interface FormField {
  label: string;
  placeholder: string;
  field: keyof FormData;
}

export default function UploadPage(): JSX.Element {
 
  const [mode, setMode] = useState<"single" | "series">("single");

  const [enableUpload, setEnableUpload] = useState<boolean>(false);

  
  const [selectedLanguages, setSelectedLanguages] = useState<
    Record<Language, boolean>
  >(
    Object.fromEntries(
      languages.map((lang) => [lang, false])
    ) as Record<Language, boolean>
  );
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>("English");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    wordCount: "",
    releaseMonth: "",
    releaseYear: "",
    description: "",
    tags: "",
    releaseDate: "",
  });

  // --- Handlers ---
  const toggleLanguage = (lang: Language) => {
    setSelectedLanguages((p) => ({ ...p, [lang]: !p[lang] }));
    setCurrentLanguage(lang);
  };
  const navigateLanguages = (dir: "prev" | "next") => {
    const enabled = languages.filter((l) => selectedLanguages[l]);
    if (!enabled.length) return;
    const idx = enabled.indexOf(currentLanguage);
    const next =
      dir === "next"
        ? (idx + 1) % enabled.length
        : (idx - 1 + enabled.length) % enabled.length;
    setCurrentLanguage(enabled[next]);
  };
  const handleInputChange = (f: keyof FormData, v: string) =>
    setFormData((p) => ({ ...p, [f]: v }));
  const handleFileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const inp = e.currentTarget.querySelector("input[type=file]") as HTMLInputElement;
    inp?.click();
  };

  // --- Constants & styling ---
  const inputClass =
    "w-full p-2 bg-[#1a1a1a] bg-[#31343C] border border-[#C19969] rounded-lg";
  const formFields: FormField[] = [
    { label: "Word Count *", placeholder: "23,920", field: "wordCount" },
    { label: "Release Month *", placeholder: "Sept", field: "releaseMonth" },
    { label: "Release Year *", placeholder: "2025", field: "releaseYear" },
  ];
  const uploadSections = ["Book Content *", "Book Covers *"];

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white">
      <Navbar />
      <div className="flex divide-x divide-gray-700">
        {/* ← LEFT PANEL */}
        <aside className="w-1/3 p-6 space-y-8 mt-20">
          <h1 className="text-3xl font-bold">Upload new book</h1>

          {/* MODE SELECTOR */}
          <div className="space-y-4">
            {(
              [
                {
                  key: "single",
                  title: "Single Book",
                  desc: "This book is not part of a series and is a single self‑contained story",
                },
                {
                  key: "series",
                  title: "Series of Books",
                  desc: "This is a series of books with multiple books as part of the series",
                },
              ] as const
            ).map(({ key, title, desc }) => {
              const isActive = mode === key;
              return (
                <label key={key} className="block">
                  <div
                    onClick={() => {
                      setMode(key);
                      if (key === "single" && !enableUpload) {
                        // ensure checkbox sync
                        setEnableUpload(false);
                      }
                    }}
                    className={`px-4 py-3 bg-[#1a1a1a] border ${
                      isActive
                        ? "border-green-500"
                        : "border-[#C19969] bg-[#31343C]"
                    } rounded-lg flex justify-between items-center`}
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="flex items-start space-x-2">
                      {key === "single" ? (
                        <BookSquare className="mt-1 w-[16px] text-gray-300" />
                      ) : (
                        <BookMarkTwo className="mt-1  w-[16px] text-gray-300" />
                      )}
                      <div>
                        <strong className="text-[#DAD9D3]">{title}</strong>
                        <div className="text-sm  mr-[2px] text-[#DAD9D3]">
                          {desc}
                        </div>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={key === "single" ? enableUpload : isActive}
                      onChange={() => {
                        if (key === "single") {
                          setEnableUpload((e) => !e);
                          setMode("single");
                        } else {
                          setMode("series");
                        }
                      }}
                      className="h-5 w-5 text-green-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </label>
              );
            })}
          </div>

          {/* LANGUAGES STEPPER */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Languages</h2>
              <div className="flex space-x-2">
                <button onClick={() => navigateLanguages("prev")}>
                  <ArrowSquareLeft />
                </button>
                <button onClick={() => navigateLanguages("next")}>
                  <ArrowSquareRight />
                </button>
              </div>
            </div>
            <input
              type="text"
              readOnly
              value={currentLanguage}
              className={inputClass}
              style={{ borderRadius: "8px" }}
            />
          </div>

          {/* LANGUAGES STATUS */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Languages Status</h2>
            <ul className="grid  grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {languages.map((lang) => (
                <li key={lang} className="flex items-center">
                  <span className="w-20">{lang}</span>
                  <div
                    onClick={() => toggleLanguage(lang)}
                    className={`w-5 h-5 ml-2 flex items-center justify-center cursor-pointer rounded-sm ${
                      selectedLanguages[lang]
                        ? "bg-green-500"
                        : "border border-gray-500 bg-[#31343C]"
                    }`}
                    style={{ borderRadius: "4px" }}
                  >
                    {selectedLanguages[lang] && (
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                      >
                        <path
                          d="M1 5L5 9L13 1"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {}}
            className="w-full h-[28px] text-[14px] text-[#262626]  border border-[#C19969] bg-[#4CAF50] flex items-center justify-center  font-semibold rounded-lg"
            style={{ borderRadius: "8px" }}
          >
            Save & Close
          </button>
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex-1 p-6 mt-20 space-y-6">
          {mode === "series" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 ">
                <div className="">
                  <div className="">
                    <label className="block mb-1">Series Title *</label>
                    <input
                      type="text"
                      placeholder="Resort Lost Icons"
                      className={inputClass}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                  <div className="relative mt-[4px]  mb-4 w-[290px] h-[72px]">
                    <label className="absolute flex items-center gap-1 text-sm text-gray-400 left-3 top-4 px-1 z-10">
                      <div
                        className="w-[32px] h-[32px] flex mr-[10px] items-center justify-center border border-[#C19969] rounded-md"
                        style={{ borderRadius: "8px" }}
                      >
                        <AirPlane w={16} className="  text-[white]" />
                      </div>
                      Release on... 01/01/2024
                    </label>
                    <input
                      className={`${inputClass} pt-6 mt-[8px]`}
                      style={{ borderRadius: "8px" }}
                      value={formData.releaseDate}
                      onChange={(e) =>
                        handleInputChange("releaseDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Series Description *</label>
                  <textarea
                    rows={4}
                    placeholder="Enter a description…"
                    className={inputClass}
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div className="">
                  <label className="block  mb-1">
                    Tags, Separate by Commas *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Portugal, Mystery, Crime, Thirller, Cozy, New, Fresh"
                    className={inputClass}
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#31343C",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3  items-end">
               
               {/* book series */}
                <div className="col-span-2  row-start-1">
                  <label className="block mb-1">Books in Series *</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="Book One: The Missing Sled"
                      className={inputClass}
                      style={{ borderRadius: "8px" }}
                    />
                    <button
                      className="bg-[#4CAF50] w-[296px] h-[44px] text-[#262626] px-4 py-2 border border-[#C19969] rounded-lg"
                      style={{ borderRadius: "6px" }}
                    >
                      Add new book
                    </button>
                  </div>
                </div>
               
                {/* Cover series */}
                <div className="row-start-2 col-start-1 ">
                  <label className="block mb-1">Series Cover *</label>
                  <div
                    className="w-full h-32 border border-dashed border-[#C19969] flex items-center justify-center text-gray-500 rounded-lg"
                    style={{ borderRadius: "8px" }}
                  >
                    Drag & Drop
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Book fields */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-1">Book Title *</label>
              <input
                type="text"
                placeholder="The Missing Sled"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            {formFields.map(({ label, placeholder, field }) => (
              <div key={field}>
                <label className="block mb-1">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={inputClass}
                  style={{ borderRadius: "8px" }}
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Description / Tags / Release */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Description *</label>
              <textarea
                rows={4}
                placeholder="Enter a description…"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1">Tags, Separate by Commas *</label>
              <textarea
                rows={4}
                placeholder="Portugal, Mystery, Crime, Thirller, Cozy, New, Fresh"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
            </div>

            <div className="relative mt-[20px] mb-4 w-[178px] h-[72px]">
              <label className="absolute flex items-center gap-1 text-sm text-gray-400 left-3 top-4 px-1 z-10">
                <div
                  className="w-[32px] h-[32px] flex mr-[10px] items-center justify-center border border-[#C19969] rounded-md"
                  style={{ borderRadius: "8px" }}
                >
                  <AirPlane w={16} className="  text-[white]" />
                </div>
                Release on... 01/01/2024
              </label>
              <input
                className={`${inputClass} pt-6 mt-[8px]`}
                style={{ borderRadius: "8px" }}
                value={formData.releaseDate}
                onChange={(e) =>
                  handleInputChange("releaseDate", e.target.value)
                }
              />
            </div>
          </div>

          {/* Conditionally render Content/Covers (single mode) */}
          {mode === "single" && enableUpload && (
            <div className="grid grid-cols-2 gap-4 items-start">
              {uploadSections.map((label: string) => (
                <div key={label}>
                  <label className="block mb-1">{label}</label>
                  <div
                    className="w-full h-32 border border-dashed border-[#C19969] flex flex-col items-center justify-center text-gray-500 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                    style={{ borderRadius: "8px" }}
                    onClick={handleFileClick}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept={
                        label.includes("Content")
                          ? ".pdf,.doc,.docx,.txt"
                          : "image/*"
                      }
                    />
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mb-2"
                    >
                      <path
                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Drag & Drop or Click to Upload</span>
                    <span className="text-xs mt-1"></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
