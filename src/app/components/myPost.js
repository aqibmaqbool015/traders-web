"use client";

import { Image_base } from "@/networking/network";
import Image from "next/image";
import { useRouter } from "next/navigation";

const image = {
  car: "post-car.png",
  calendar: "/calendar.svg",
};
const MyPost = ({ vehicle }) => {

  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${vehicle?._id}`);
  };
  return (
    <>
     
      <div
        onClick={handleClick}
        className="rounded-[12px] cursor-pointer p-2 overflow-hidden gap-2 flex justify-between items-baseline my-3 border border-customGray"
      >
        <div className="flex">
          <div>
            <Image
              className="w-[150px] object-[initial] cursor-pointer h-[110px] rounded-[8px] "
              src={
                vehicle?.pictures?.length > 0
                  ? `${Image_base}${vehicle?.pictures[0]}`
                  : image.car
              }
              alt="allAuction"
              width={150}
              height={110}
            />
          </div>

          <div className="px-2 py-1">
            <div>
              <h4 className="font-medium  text-customOrange text-[20px] md:text-[15px]">
                £{vehicle?.price}
              </h4>
              <p className="text-customBlackLight text-[14px] md:text-[17px] capitalize ">
                {vehicle?.make_id?.title} {""}
                {vehicle?.model_id?.name}
              </p>
              <p className="text-customDarkGray text-[15px] md:text-[16px]">
                {vehicle?.year} - {vehicle?.mileage} Km
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={image.calendar}
                    alt="img"
                    className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                    width={14}
                    height={14}
                  />
                  <p className="text-customSmallGray text-[13px] mx-2">
                    {vehicle?.createdAt
                      ? new Date(vehicle?.createdAt).toLocaleDateString("en-GB")
                      : "12 June 2024"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-customDarkGray text-[14px]">
          {vehicle?.createdAt
            ? new Date(vehicle?.createdAt).toLocaleDateString("en-GB")
            : "7 days ago"}
        </p>
      </div>
    </>
  );
};

export default MyPost;
