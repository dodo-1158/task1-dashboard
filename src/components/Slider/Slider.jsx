"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./slider.module.css"; // Create a CSS file for styling

const images = [
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.jpg",
  "/slide4.jpg",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Dots for Navigation */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
