import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const image = {
  search: "/search.svg",
  filter: "/filter.svg",
  brand: "/brand-1.svg",
  brand2: "/brand-2.svg",
  brand3: "/brand-3.svg",
  brand4: "/brand-4.svg",
  brand5: "/brand--5.svg",
  brand6: "/brand-6.svg",
  brand7: "/brand-7.svg",
  crossBlue: "/cross-custom.svg",
  logo: "/logo-trade.svg",
  vector: "/person.svg",
  camera: "/camera.svg",
  plas: "/plus.svg",
};

const CarouselBanner = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    "/home-banner.png",
    "/home-banner.png",
    "/home-banner.png",
    "/home-banner.png",
    "/home-banner.png",
  ];

  const handleClick = () => {
    router.push("/search");
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden md:h-[100vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={index === activeIndex}
            />
            <div className="flex justify-center items-center w-full h-full ">
              <div className=" relative">
                <h1 className="text-white md:text-[40px] text-center font-semibold">
                  Get deals on inspected and used cars
                </h1>
                <h1 className="text-white md:text-[20px] text-center font-normal">
                  Lets find your favourite vehicle here
                </h1>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-md mt-3 md:mx-20 mx-4">
                  <div className="relative flex items-center flex-1">
                    <div onClick={handleClick}>
                      <input
                        type="text"
                        placeholder="Find Vehicle / Trader"
                        className="pl-4 border-none pr-4 py-2 w-full focus:outline-none"
                      />
                    </div>

                    <div className="absolute right-3 text-gray-500">
                      <Image
                        src={image.search}
                        alt="img"
                        className="w-[20px] h-auto"
                        width={20}
                        height={10}
                      />
                    </div>
                  </div>
                  <button className="bg-customBlue text-white py-2 px-4 rounded-md flex items-center space-x-1">
                    <span>Filter</span>
                    <Image
                      src={image.filter}
                      alt="img"
                      className="w-[20px] h-auto"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-customBlue" : "bg-customGray"
            }`}
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group"
      >
        <span className="inline-flex text-white items-center justify-center w-10 h-10 text-[25px]">
          {"<"}
        </span>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 text-[25px] text-white">
          {">"}
        </span>
      </button>
    </div>
  );
};

export default CarouselBanner;
