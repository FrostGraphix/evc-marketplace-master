import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import image1 from "../assest/banner/tecpc1.jpg";
import image2 from "../assest/banner/tecpc2.jpg";
import image3 from "../assest/banner/tecpc1.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image6 from "../assest/banner/techno one.jpg";
import image7 from "../assest/banner/technew.jpg";
import image8 from "../assest/banner/tech second.jpg";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image6, image7, image8];

  // Continuous sliding logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const nextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) =>
        prev < desktopImages.length - 1 ? prev + 1 : 0
      );
      setIsTransitioning(false);
    }, 700);
  };

  const previousImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) =>
        prev > 0 ? prev - 1 : desktopImages.length - 1
      );
      setIsTransitioning(false);
    }, 700);
  };

  return (
    <div className="container mx-auto px-4 py-6 rounded-lg">
      <div className="relative h-80 md:h-[500px] w-full bg-gray-100 shadow-lg overflow-hidden rounded-lg">
        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-10 flex justify-between items-center px-4 md:px-6 text-white">
          <button
            onClick={previousImage}
            className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition duration-300"
          >
            <FaAngleLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition duration-300"
          >
            <FaAngleRight size={24} />
          </button>
        </div>

        {/* Desktop and Tablet Version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {desktopImages.map((imageURL, index) => (
              <div
                key={index}
                className="h-full w-full flex-shrink-0 relative"
              >
                <img
                  src={imageURL}
                  className="w-full h-full object-cover"
                  alt={`Banner ${index + 1}`}
                />
                <div className="absolute bottom-10 left-10 bg-black/50 text-white p-4 rounded-md shadow-lg">
                  <h2 className="text-xl md:text-3xl font-bold">
                    Captivating Technology
                  </h2>
                  <p className="text-sm md:text-lg mt-2">
                    Explore the latest in tech innovations.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="flex md:hidden h-full w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {mobileImages.map((imageURL, index) => (
              <div
                key={index}
                className="h-full w-full flex-shrink-0 relative"
              >
                <img
                  src={imageURL}
                  className="w-full h-full object-cover"
                  alt={`Banner Mobile ${index + 1}`}
                />
                <div className="absolute bottom-8 left-4 bg-black/50 text-white p-3 rounded-md shadow-lg">
                  <h2 className="text-lg font-bold">
                    Discover Innovations
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
