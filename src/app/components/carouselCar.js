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
      <div className="relative overflow-hidden rounded-lg min-h-96">
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
                <div className="relative w-full h-[450px] inline-block ">
                  <Image
                    src={imageUrl}
                    alt={`Vehicle Slide ${index + 1}`}
                    layout="fill"
                    className="!relative w-full h-full rounded-[10px] "
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
