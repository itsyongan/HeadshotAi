"use client";

import Image from "next/image";
import React from "react";
import productDemo from "../app/productDemo.jpeg";

/**
 * Example image data. Replace these with your own AI-generated images or real URLs.
 */
const GALLERY_IMAGES = [
  {
    src: productDemo,
    alt: "AI Headshot 1",
  },
  {
    src: productDemo,
    alt: "AI Headshot 2",
  },
  {
    src: productDemo,
    alt: "AI Headshot 3",
  },
  {
    src: productDemo,
    alt: "AI Headshot 4",
  },
  {
    src: productDemo,
    alt: "AI Headshot 5",
  },
  {
    src: productDemo,
    alt: "AI Headshot 6",
  },
  {
    src: productDemo,
    alt: "AI Headshot 7",
  },
  {
    src: productDemo,
    alt: "AI Headshot 8",
  },
  {
    src: productDemo,
    alt: "AI Headshot 9",
  },
  {
    src: productDemo,
    alt: "AI Headshot 10",
  },
  {
    src: productDemo,
    alt: "AI Headshot 11",
  },
  {
    src: productDemo,
    alt: "AI Headshot 12",
  },
];

export default function ImageGallery() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        AI-Generated Headshots
      </h2>

      {/* Responsive grid for images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {GALLERY_IMAGES.map((img, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-xl group">
            {/* The image itself */}
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={300}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* "AI GENERATED" label in the top-left corner */}
            <div className="absolute top-2 left-2 bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded shadow">
              AI GENERATED
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
