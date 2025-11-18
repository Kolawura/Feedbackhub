import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeStore } from "../../Store/useThemeStore";
import { Button } from "../ui/Button";

const HeroSection = () => {
  const { theme } = useThemeStore();
  const lightImages = [
    "/Images/Dashboard-light.png",
    "/Images/Analytics-light.png",
    "/Images/Feedbacks-light.png",
  ];

  const darkImages = [
    "/Images/Dashboard-dark.png",
    "/Images/Analytics-dark.png",
    "/Images/Feedbacks-dark.png",
  ];

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = theme === "dark" ? darkImages : lightImages;

  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchDark.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    matchDark.addEventListener("change", handleChange);

    return () => matchDark.removeEventListener("change", handleChange);
  }, []);

  const goToNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(goToNext, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index, isHovered, isDarkMode]);

  return (
    <div className="flex items-center justify-center lg:w-3/4 w-7/8 m-auto gap-4">
      <button
        onClick={goToPrev}
        className="hidden lg:flex text-gray-800 dark:text-white hover:text-white p-2 rounded-full hover:bg-black/60"
      >
        <ChevronLeft size={25} />
      </button>
      <div
        className="relative w-full m-auto h-[500px] overflow-hidden rounded-xl shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Hero Image ${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-fill"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4 text-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to FeedbackHub
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Understand your users. Improve your product.
            </p>
            <div className="space-x-4">
              <Button className="text-white px-6 py-2 rounded-md">
                Join Now
              </Button>
              <Button className="text-black px-6 py-2 rounded-md">Demo</Button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={goToNext}
        className="hidden lg:flex text-gray-800 dark:text-white hover:text-white p-2 rounded-full hover:bg-black/60"
      >
        <ChevronRight size={25} />
      </button>
    </div>
  );
};

export default HeroSection;
