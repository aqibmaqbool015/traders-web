"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import Image from "next/image";
import { allComments, likeUnlikeApi } from "../home/api";
import { usePathname } from "next/navigation";
import { Image_base } from "@/networking/network";

const image = {
  heart: "/heart.svg",
  vehicle: "/vehicle-profile.png",
  user: "/user-profile.svg",
  thumbUp: "/up.svg",
  thumbDown: "/down.svg",
  thumbsCheck: "/Thumbs-up.png",
};

const BrandsCards = ({ vehicles, newsFeed }) => {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState(1);
  const [expand, setExpand] = useState(null);
  const [comments, setComments] = useState({});
  const [isLike, setIsLike] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 20;

  const toggleAccordion = async (vehicleId) => {
    if (expand === vehicleId) {
      setExpand(null);
    } else {
      setExpand(vehicleId);
      if (!comments[vehicleId]) {
        try {
          const response = await allComments({ vehicleId });
          if (response) {
            setComments((prev) => ({
              ...prev,
              [vehicleId]: response.data.comments,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      }
    }
  };

  const handleClickLiked = async (id) => {
    const params = { vehicleId: id };
    console.log(params, "lllllll");
    try {
      const response = await likeUnlikeApi(params);
      if (response) {
        setIsLike(!isLike);
      }
    } catch (error) {
      console.error("Liked API Error:", error);
    }
  };

  const handleShowMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const displayedVehicles = vehicles.slice(0, currentPage * rowsPerPage);
  const displayedNewsfeed = newsFeed.slice(0, currentPage * rowsPerPage);

  // const BrandsCards = ({ vehicles, newsFeed }) => {
  //   const pathname = usePathname();
  //   const [openTab, setOpenTab] = useState(1);
  //   const [expand, setExpand] = useState(null);
  //   const [comments, setComments] = useState({});
  //   const [isLike, setIsLike] = useState();

  //   const [isLoading, setIsLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const rowsPerPage = 20;
  //   const [totalPages, setTotalPages] = useState(1);

  //   const toggleAccordion = async (vehicleId) => {
  //     if (expand === vehicleId) {
  //       setExpand(null);
  //     } else {
  //       setExpand(vehicleId);
  //       if (!comments[vehicleId]) {
  //         try {
  //           const response = await allComments({ vehicleId });
  //           if (response) {
  //             setComments((prev) => ({
  //               ...prev,
  //               [vehicleId]: response.data.comments,
  //             }));
  //           }
  //         } catch (error) {
  //           console.error("Failed to fetch comments:", error);
  //         }
  //       }
  //     }
  //   };

  //   // useEffect(() => {
  //   //   const id = pathname.split("/")[2];
  //   //   if (id) {
  //   //     fetchGetVehicleDetail(id);
  //   //   }
  //   // }, [pathname]);

  //   const handleClickLiked = async (id) => {
  //     const params = {
  //       vehicleId: id,
  //     };
  //     console.log(params, "lllllll");
  //     try {
  //       const response = await likeUnlikeApi(params);
  //       if (response) {
  //         setIsLike(!isLike);
  //       }
  //     } catch (error) {
  //       console.error("Liked API Error:", error);
  //     }
  //   };

  //   const handleShowMore = () => {
  //     if (currentPage < totalPages) {
  //       setCurrentPage((prev) => prev + 1);
  //       const id = pathname.split("/")[2];
  //       const fetchFunction = fetchGetAllAuctions;
  //       fetchFunction(id);
  //     }
  //   };
  //   useEffect(() => {
  //     const id = pathname.split("/")[2];
  //     if (id) {
  //       fetchGetVehicleDetail(id);
  //     }
  //   }, [pathname]);

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
                    {displayedVehicles.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No vehicles available
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedVehicles.map((vehicle, index) => (
                          <VehicleCard key={index} vehicle={vehicle} />
                        ))}
                      </div>
                    )}
                    <div className="text-center">
                      {displayedVehicles.length < vehicles.length && (
                        <div className="text-center my-5">
                          <button
                            onClick={handleShowMore}
                            className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                          >
                            Show More
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={openTab === 2 ? "block" : "hidden"}>
                    <div className="container md:px-40">
                      {displayedNewsfeed?.length === 0 ? (
                        <p className="text-center text-customBlue">
                          No Newsfeed available
                        </p>
                      ) : (
                        <>
                          {displayedNewsfeed?.map((feed) => (
                            <div
                              key={feed.vehicle._id}
                              className="rounded-[8px] overflow-hidden cursor-pointer gap-2 my-3 border-2 border-customBorderColor"
                            >
                              <div className="flex justify-between items-center py-4 px-2">
                                <div className="flex">
                                  <Image
                                    src={
                                      `${Image_base}${feed?.vehicle?.user_id?.profilePicture}` ||
                                      image.vehicle
                                    }
                                    width={40}
                                    height={40}
                                    alt="img"
                                    className="w-[40px] h-[40px] rounded-full inline-block object-cover mr-3"
                                  />
                                  <div>
                                    <h4 className="text-[18px] text-customBlue font-medium capitalize">
                                      {feed?.vehicle?.user_id?.firstName}{" "}
                                      {feed?.vehicle?.user_id?.lastName}
                                    </h4>
                                    <p className="text-[15px] text-customDarkGray font-normal">
                                      {feed?.vehicle?.createdAt
                                        ? new Date(
                                            feed?.vehicle?.createdAt
                                          ).toLocaleDateString("en-GB")
                                        : "7 days ago"}
                                    </p>
                                  </div>
                                </div>
                                <div className="capitalize bg-customBlue rounded-[20px] px-3 py-2 text-white text-[15px] text-center md:w-[100px]">
                                  facebook
                                </div>
                              </div>
                              <Image
                                className="w-full md:h-[100%] max-h-[100vh] "
                                src={
                                  feed?.vehicle?.pictures?.length > 0
                                    ? `${Image_base}${feed.vehicle.pictures[0]}`
                                    : image.vehicle
                                }
                                alt="Sample image"
                                width={300}
                                height={400}
                              />
                              <div className="py-1">
                                <div className="px-2 flex justify-between items-center border-b-2 border-customBorderColor py-3">
                                  <div className="flex">
                                    <div className="flex items-center">
                                      {isLike ? (
                                        <Image
                                          src={image.thumbsCheck}
                                          alt="Thumb up"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={handleClickLiked}
                                        />
                                      ) : (
                                        <Image
                                          src={image.thumbUp}
                                          alt="Thumb up"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={handleClickLiked}
                                        />
                                      )}
                                      {/* <Image
                                      src={image.thumbUp}
                                      alt="Thumb up"
                                      className="w-[22px] h-[22px]"
                                      width={22}
                                      height={22}
                                      onClick={thumbsUpClick}
                                    /> */}
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed?.likeCount}
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <Image
                                        src={image.thumbDown}
                                        alt="Thumb down"
                                        className="w-[22px] h-[22px]"
                                        width={22}
                                        height={22}
                                      />
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed?.dislikeCount}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    className="px-7 py-2 md:text-[16px] text-[13px] font-normal text-white bg-customBlue rounded-[20px] capitalize"
                                    onClick={() =>
                                      toggleAccordion(feed.vehicle._id)
                                    }
                                  >
                                    {expand === feed.vehicle._id
                                      ? "Hide Comments"
                                      : "View Comments"}
                                  </button>
                                </div>
                                {expand === feed.vehicle._id && (
                                  <div className="mt-4 p-4 transition-all duration-300">
                                    {comments[feed.vehicle._id]?.length > 0 ? (
                                      comments[feed.vehicle._id].map(
                                        (comment, index) => (
                                          <p
                                            key={index}
                                            className="text-customBlue"
                                          >
                                            {comment.text ||
                                              "Comment text not available."}
                                          </p>
                                        )
                                      )
                                    ) : (
                                      <p className="text-center text-customBlue">
                                        No comments available for this vehicle.
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="py-3 px-2">
                                <h2 className="text-customBlue font-medium md:text-[23px]">
                                  {feed?.vehicle?.model_id?.name ||
                                    feed?.vehicle?.regno}
                                </h2>
                                <h4 className="text-customOrange font-medium text-[18px]">
                                  £ {feed?.vehicle?.price}
                                </h4>
                                <p className="text-customDarkGray text-[14px]">
                                  {feed?.vehicle?.year || "2014"} -{" "}
                                  {feed?.vehicle?.mileage || "167,453"} Km
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      <div className="text-center">
                        {displayedNewsfeed.length < newsFeed.length && (
                          <div className="text-center my-5">
                            <button
                              onClick={handleShowMore}
                              className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                            >
                              Show More
                            </button>
                          </div>
                        )}
                      </div>
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
