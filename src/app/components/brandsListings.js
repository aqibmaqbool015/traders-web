"use client";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { Image_base } from "@/networking/network";
import Image from "next/image";
import { useEffect, useRef } from "react";

const BrandsListing = ({ brand }) => {
  useEffect(() => {
    if (typeof brand === "object" && typeof window !== "undefined") {
      const getPerView = () => (window.innerWidth < 640 ? 3 : 7);

      const glide = new Glide(".glide", {
        type: "carousel",
        perView: getPerView(),
      });
      glide.mount();
      const handleResize = () => glide.update({ perView: getPerView() });
      window.addEventListener("resize", handleResize);
      return () => {
        glide.destroy();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [brand]);

  return (
    <>
      <div className="glide xl:w-[54rem] lg:w-[42rem] md:w-[30rem] sm:w-[18rem] px-16 py-8 bg-white">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {brand?.map((item, index) => {
              return (
                <li key={index} className="glide__slide">
                  <Image
                    src={`${Image_base}${brand.logo}`}
                    alt={brand.title}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-[50%] cursor-pointer"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BrandsListing;
