"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";

const BASE_URL = "https://t2tcorebucket.s3.eu-west-2.amazonaws.com";

const BrandsCards = ({ vehicles, newsFeed }) => {
  const [openTab, setOpenTab] = useState(1);

  const image = {
    heart: "/heart.svg",
    vehicle: "/vehicle-profile.png",
    user: "/user-profile.svg",
    thumbUp: "/up.svg",
    thumbDown: "/down.svg",
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center"
              role="tablist"
            >
              <li className="-mb-px last:mr-0 text-center">
                <a
                  className={
                    "text-[14px] font-medium px-5 py-3 shadow-lg rounded-[30px] block leading-normal w-[140px] relative left-8 cursor-pointer " +
                    (openTab === 1
                      ? " text-white bg-customOrange"
                      : " text-customDarkGray bg-customLightColor")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  role="tablist"
                >
                  Listings
                </a>
              </li>
              <li className="-mb-px last:mr-0 text-center">
                <a
                  className={
                    "text-[14px] font-medium px-5 py-3 shadow-lg rounded-[30px] block leading-normal w-[140px] cursor-pointer " +
                    (openTab === 2
                      ? " text-white bg-customOrange"
                      : "text-customDarkGray bg-customLightColor")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  role="tablist"
                >
                  Newsfeed
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"}>
                    {vehicles.length === 0 ? (
                      <p className="text-center">No vehicles available</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vehicles?.map((vehicle, index) => (
                          <VehicleCard key={index} vehicle={vehicle} />
                        ))}
                      </div>
                    )}
                    <div className="text-center my-3">
                      <button className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium">
                        Show more
                      </button>
                    </div>
                  </div>

                  <div className={openTab === 2 ? "block" : "hidden"}>
                    <div className="container md:px-40">
                      {newsFeed?.length === 0 ? (
                        <p className="text-center">No vehicles available</p>
                      ) : (
                        <>
                          {newsFeed?.map((feed, index) => (
                            <div
                              key={index}
                              className=" rounded-[8px] overflow-hidden cursor-pointer gap-2 my-3 border-2 border-customBorderColor"
                            >
                              <div className="flex items-center py-4 px-2 ">
                                <img
                                  src={
                                    `${BASE_URL}${feed?.vehicle?.user_id?.profilePicture}` ||
                                    image.vehicle
                                  }
                                  alt=""
                                  className="w-[40px] h-[40px] rounded-full inline-block object-cover mr-3"
                                />
                                <div className="">
                                  <h4 className="text-[18px] text-customBlue font-medium capitalize">
                                    {feed?.vehicle?.user_id?.firstName}{" "}
                                    {feed?.vehicle?.user_id?.lastName}
                                  </h4>
                                  <p className="text-[15px] text-customDarkGray font-normal">
                                    {feed?.vehicle?.mileage}
                                  </p>
                                </div>
                              </div>
                              <img
                                className="w-full md:h-[400px] object-[initial]"
                                src={`${BASE_URL}${feed?.vehicle?.pictures}`}
                                alt="Sample image"
                              />
                              <div className="py-1">
                                <div className="px-2 flex justify-between items-center border-b-2 border-customBorderColor py-3">
                                  <div className="flex">
                                    <div className="flex">
                                      <img
                                        className="w-[22px] h-[22px] object-[initial]"
                                        src={image.thumbUp}
                                        alt="Sample image"
                                      />
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed?.likeCount}
                                      </p>
                                    </div>
                                    <div className="flex">
                                      <img
                                        className="w-[22px] h-[22px] object-[initial]"
                                        src={image.thumbDown}
                                        alt="Sample image"
                                      />
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed?.dislikeCount}
                                      </p>
                                    </div>
                                  </div>
                                  <button className="px-7 py-2 md:text-[16px] text-[13px] font-normal text-white bg-customBlue rounded-[20px] capitalize">
                                    view comment
                                  </button>
                                </div>
                                <div className="py-3 px-2">
                                  <h2 className="text-customBlue font-medium md:text-[23px]">
                                    {feed?.vehicle?.user_id?.companyName}
                                  </h2>
                                  <h4 className="text-customOrange text-[18px]">
                                    {feed?.vehicle?.price}
                                  </h4>
                                  <p className="text-customDarkGray text-[14px]">
                                    {feed?.vehicle?.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsCards;
