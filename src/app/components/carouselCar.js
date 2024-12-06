import { useEffect, useState } from "react";
import Image from "next/image";
import { Image_base } from "@/networking/network";

export const CarouselCar = ({ isVehicleDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (isVehicleDetail?.pictures?.length > 0) {
      const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % isVehicleDetail.pictures.length);
      }, 3000); 
      return () => clearInterval(intervalId);
    }
  }, [isVehicleDetail]);
  if (!isVehicleDetail?.pictures?.length) {
    return <p>No pictures available</p>;
  }

  return (
    <div id="carousel" data-carousel="slide" className="relative">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div>
          {isVehicleDetail.pictures.map((picture, index) => {
            const imageUrl = `${Image_base}${picture}`;
            return (
              <div
                key={`${index}`}
                className={`${
                  activeIndex === index ? "block" : "hidden"
                } duration-700 ease-in-out`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Vehicle Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="!relative w-full h-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
