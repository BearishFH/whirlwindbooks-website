"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/layouts/Navbar";
import { JSX } from "react";
import { ArrowSquareLeft, ArrowSquareRight } from "../components/icons/Arrow";

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

interface ModeOption {
  title: string;
  desc: string;
  border: string;
}

interface FormField {
  label: string;
  placeholder: string;
  field: keyof FormData;
}

export default function UploadPage(): JSX.Element {
  const [selectedLanguages, setSelectedLanguages] = useState<
    Record<Language, boolean>
  >(
    Object.fromEntries(
      languages.map((lang: Language) => [lang, false])
    ) as Record<Language, boolean>
  );

  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    wordCount: "",
    releaseMonth: "",
    releaseYear: "",
    description: "",
    tags: "",
    releaseDate: "",
  });

  const [enableUpload, setEnableUpload] = useState<boolean>(true);

  const toggleLanguage = (lang: Language): void => {
    setSelectedLanguages((prev: Record<Language, boolean>) => ({
      ...prev,
      [lang]: !prev[lang],
    }));
    setCurrentLanguage(lang);
  };

  const navigateLanguages = (direction: "prev" | "next"): void => {
    const enabledLangs: Language[] = languages.filter(
      (lang: Language) => selectedLanguages[lang]
    );
    if (!enabledLangs.length) return;

    const currentIndex: number = enabledLangs.indexOf(currentLanguage);
    const newIndex: number =
      direction === "next"
        ? (currentIndex + 1) % enabledLangs.length
        : (currentIndex - 1 + enabledLangs.length) % enabledLangs.length;
    setCurrentLanguage(enabledLangs[newIndex]);
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
  };

  const handleFileInputClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const input = event.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const inputClass: string =
    "w-full p-2 bg-[#1a1a1a] border border-[#C19969] rounded-lg";
  const buttonClass: string =
    "p-2 bg-[#1a1a1a] border border-[#C19969] rounded-lg";

  const modeOptions: ModeOption[] = [
    {
      title: "Single Book",
      desc: "This book is not part of a series and is a single self‑contained story",
      border: "border-green-500",
    },
    {
      title: "Series of Books",
      desc: "This is a series of books with multiple books as part of the series",
      border: "border-[#C19969]",
    },
  ];

  const formFields: FormField[] = [
    {
      label: "Word Count *",
      placeholder: "23,920",
      field: "wordCount",
    },
    {
      label: "Release Month *",
      placeholder: "Sept",
      field: "releaseMonth",
    },
    {
      label: "Release Year *",
      placeholder: "2025",
      field: "releaseYear",
    },
  ];

  const uploadSections: string[] = ["Book Content *", "Book Covers *"];

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white">
      <Navbar />
      <div className="flex divide-x divide-gray-700">
        {/* Left Panel */}
        <aside className="w-1/3 p-6 space-y-8 mt-20">
          <h1 className="text-3xl font-bold">Upload new book</h1>

          {/* Mode Selector */}
          <div className="space-y-4">
            {modeOptions.map(({ title, desc, border }: ModeOption) => (
              <label key={title} className="block">
                <div
                  className={`px-4 py-3 bg-[#1a1a1a] border ${border} rounded-lg`}
                  style={{ borderRadius: "8px" }}
                >
                  <strong>{title}</strong>
                  <div className="text-sm text-gray-300">{desc}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Languages Stepper */}
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

          {/* Languages Status */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Languages Status</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {languages.map((lang: Language) => (
                <li key={lang} className="flex items-center">
                  <span className="w-20">{lang}</span>
                  <div
                    className={`w-5 h-5 ml-2 flex items-center justify-center cursor-pointer rounded-sm ${
                      selectedLanguages[lang]
                        ? "bg-green-500"
                        : "bg-[#1a1a1a] border border-gray-500"
                    }`}
                    style={{ borderRadius: "4px" }}
                    onClick={() => toggleLanguage(lang)}
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
            className="w-full py-3 bg-green-500 font-bold rounded-lg"
            style={{ borderRadius: "8px" }}
          >
            Save & Close
          </button>
        </aside>

        {/* Right Panel */}
        <main className="flex-1 p-6 mt-20">
          {/* First Row: Book Title, Word Count, Release Month, Release Year */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block mb-1">Book Title *</label>
              <input
                type="text"
                placeholder="The Missing Sled"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("title", e.target.value)
                }
              />
            </div>
            {formFields.map(({ label, placeholder, field }: FormField) => (
              <div key={field}>
                <label className="block mb-1">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={inputClass}
                  style={{ borderRadius: "8px" }}
                  value={formData[field]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(field, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Second Row: Description, Tags, Release Date */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-1">Description *</label>
              <textarea
                rows={4}
                placeholder="Enter a description…"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1">Tags, Separate by Commas *</label>
              <textarea
                rows={4}
                placeholder="Portugal, Mystery, Crime, Thriller,…"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.tags}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("tags", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1">Release on</label>
              <input
                type="date"
                className={inputClass}
                style={{ borderRadius: "8px" }}
                value={formData.releaseDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("releaseDate", e.target.value)
                }
              />
            </div>
          </div>

          {/* Upload Section - Only show when checkbox is checked */}
          {enableUpload && (
            <div className="grid grid-cols-2 gap-4 items-start">
              {uploadSections.map((label: string) => (
                <div key={label}>
                  <label className="block mb-1">{label}</label>
                  <div
                    className="w-full h-32 border border-dashed border-[#C19969] flex flex-col items-center justify-center text-gray-500 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                    style={{ borderRadius: "8px" }}
                    onClick={handleFileInputClick}
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