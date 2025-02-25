"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import productDemo from "../app/productDemo.jpeg";

const carouselImgSrc = [
  productDemo,
  productDemo,
  productDemo,
  productDemo,
  productDemo,
  productDemo,
];

export default function Carousel() {
  const [carouselActiveItem, setCarouselActiveItem] = useState(0);
  const carouselRef = useRef(null);

  // Autoplay function to increment the active item every 2 seconds
  const scrollItem = useCallback(() => {
    setCarouselActiveItem((prev) => {
      if (prev < carouselImgSrc.length - 1) {
        return prev + 1;
      } else {
        // When reaching the last image, go back to the first
        return 0;
      }
    });
  }, []);

  // Start/stop the interval
  useEffect(() => {
    const intervalId = setInterval(scrollItem, 2000);
    return () => clearInterval(intervalId);
  }, [scrollItem]);

  // Smoothly scroll to the new position each time `carouselActiveItem` changes
  useEffect(() => {
    const itemWidth = 400; // in px, matches the width of each item (image + margin)
    if (carouselRef.current) {
      carouselRef.current.scroll({
        left: itemWidth * carouselActiveItem,
        behavior: "smooth",
      });
    }
  }, [carouselActiveItem]);

  return (
    <div
      ref={carouselRef}
      className="w-85 overflow-hidden mx-auto rounded-xl"
      style={{ whiteSpace: "nowrap" }}
    >
      <div className="flex">
        {carouselImgSrc.map((imgSrc, index) => (
          <div key={index} className="flex-shrink-0 mr-4">
            <Image
              src={imgSrc}
              alt="Product demo"
              width={400} // Smaller width
              height={400} // Smaller height
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
