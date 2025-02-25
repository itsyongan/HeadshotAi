"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import productDemo from "../app/productDemo.jpeg";

const imgWidth = 200;
const imgHeight = 200;

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

  const scrollItem = () => {
    setCarouselActiveItem((prevState) => {
      if (carouselImgSrc.length - 1 > prevState) {
        return prevState + 1;
      } else {
        return 0;
      }
    });
  };

  const autoplay = useCallback(() => setInterval(scrollItem, 2000), []);

  useEffect(() => {
    const play = autoplay();
    return () => clearInterval(play);
  }, [autoplay]);

  useEffect(() => {
    carouselRef.current?.scroll({ left: imgWidth * carouselActiveItem });
  }, [carouselActiveItem]);

  return (
    <div ref={carouselRef} className="carousel">
      {carouselImgSrc.map((imgSrc) => (
        <div key={imgSrc} className="carousel-item w-full">
          <Image src={imgSrc} alt="Product demo" className="w-96 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
