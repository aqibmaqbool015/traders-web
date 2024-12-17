"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import Image from "next/image";
import {
  allComments,
  allVehiclesNews,
  dislikeApi,
  likeunlikeApi,
} from "../home/api";
import { usePathname } from "next/navigation";
import { Image_base } from "@/networking/network";

const image = {
  heart: "/heart.svg",
  vehicle: "/vehicle-profile.png",
  user: "/user-profile.svg",
  thumbUp: "/up.svg",
  thumbDown: "/down.svg",
  thumbsCheck: "/Thumbs-up.png",
  thumbsDislike: "/dislike.png",
};

const BrandsCards = ({
  vehicles,
  // newsFeed,
  rowsPerPage,
  handleShowMore,
  showLoading,
  totalPages,
}) => {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState(1);
  const [expand, setExpand] = useState(null);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLike, setIsLike] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const rowsPerPage = 20;
  const [newsFeed, setNewsFeed] = useState([]);

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

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const fetchNewsFeed = async () => {
    try {
      const data = await allVehiclesNews();
      if (data?.data) {
        setNewsFeed(data?.data);
      }
    } catch (err) {
      console.error("Error fetching NewsFeed:", err);
      setNewsFeed([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClickLiked = async (feedId) => {
    try {
      const response = await likeunlikeApi({ vehicleId: feedId });
      if (response) {
        setNewsFeed((prevNewsFeed) =>
          prevNewsFeed.map((feed) =>
            feed.vehicle._id === feedId
              ? {
                  ...feed,
                  isLiked: !feed.isLiked,
                  likeCount: feed.isLiked
                    ? feed.likeCount - 1
                    : feed.likeCount + 1,
                }
              : feed
          )
        );
      }
    } catch (error) {
      console.error("Liked API Error:", error);
    }
  };

  const handleClickDisliked = async (feedId) => {
    try {
      const response = await dislikeApi({ vehicleId: feedId });
      if (response) {
        setNewsFeed((prevNewsFeed) =>
          prevNewsFeed.map((feed) =>
            feed.vehicle._id === feedId
              ? {
                  ...feed,
                  isDisLiked: !feed.isDisLiked,
                  dislikeCount: feed.isDisLiked
                    ? feed.dislikeCount - 1
                    : feed.dislikeCount + 1,
                }
              : feed
          )
        );
      }
    } catch (error) {
      console.error("Disliked API Error:", error);
    }
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
              <div className="px-4 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={
                      openTab === 1
                        ? "text-center flex justify-center"
                        : "hidden"
                    }
                  >
                    {vehicles?.length === 0 ? (
                      <>
                        {loading ? (
                          <p className="animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 my-5 "></p>
                        ) : null}
                      </>
                    ) : (
                      <div className="md:mx-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                          {vehicles?.map((vehicle, index) => (
                            <VehicleCard key={index} vehicle={vehicle} />
                          ))}
                        </div>

                        {vehicles?.length < totalPages * rowsPerPage && (
                          <div className="text-center my-5">
                            <button
                              onClick={handleShowMore}
                              className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                            >
                              {showLoading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                              ) : null}
                              {showLoading ? "Loading..." : "Show More"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={
                      openTab === 2
                        ? "text-center flex justify-center"
                        : "hidden"
                    }
                  >
                    <div className="container md:px-40">
                      {newsFeed?.length === 0 ? (
                        <>
                          {loading ? (
                            <p className="animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 my-5"></p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {newsFeed?.map((feed) => (
                            <div
                              key={feed.vehicle._id}
                              className="rounded-[8px] overflow-hidden cursor-pointer gap-2 my-3 border-2 border-customBorderColor"
                            >
                              <div className="flex justify-between items-center py-4 px-2 text-left ">
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
                                    <h4 className="md:text-[18px] text-[15px] text-customBlue font-medium capitalize">
                                      {feed?.vehicle?.user_id?.firstName}{" "}
                                      {feed?.vehicle?.user_id?.lastName}
                                    </h4>
                                    <p className="md:text-[15px] text-[14px] text-customDarkGray font-normal">
                                      {feed?.vehicle?.createdAt
                                        ? new Date(
                                            feed?.vehicle?.createdAt
                                          ).toLocaleDateString("en-GB")
                                        : "7 days ago"}
                                    </p>
                                  </div>
                                </div>
                                <div className="capitalize bg-customBlue rounded-[20px] px-3 py-2 text-white md:text-[15px] text-[14px]  text-center md:w-[100px]">
                                  facebook
                                </div>
                              </div>
                              <div className="w-full md:h-[full] inline-block ">
                                <Image
                                  className=" w-full h-full "
                                  src={
                                    feed?.vehicle?.pictures?.length > 0
                                      ? `${Image_base}${feed.vehicle.pictures[0]}`
                                      : image.vehicle
                                  }
                                  alt="Sample image"
                                  width={300}
                                  height={400}
                                />
                              </div>
                              <div className="py-1">
                                <div className="px-2 flex justify-between items-center border-b-2 border-customBorderColor py-3">
                                  <div className="flex">
                                    <div className="flex items-center">
                                      {feed.isLiked ? (
                                        <Image
                                          src={image.thumbsCheck}
                                          alt="Thumb up"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={() =>
                                            handleClickLiked(feed.vehicle._id)
                                          }
                                        />
                                      ) : (
                                        <Image
                                          src={image.thumbUp}
                                          alt="Thumb up"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={() =>
                                            handleClickLiked(feed.vehicle._id)
                                          }
                                        />
                                      )}
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed.likeCount}
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      {feed.isDisLiked ? (
                                        <Image
                                          src={image.thumbsDislike}
                                          alt="Thumb down"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={() =>
                                            handleClickDisliked(
                                              feed.vehicle._id
                                            )
                                          }
                                        />
                                      ) : (
                                        <Image
                                          src={image.thumbDown}
                                          alt="Thumb down"
                                          className="w-[22px] h-[22px]"
                                          width={22}
                                          height={22}
                                          onClick={() =>
                                            handleClickDisliked(
                                              feed.vehicle._id
                                            )
                                          }
                                        />
                                      )}
                                      <p className="text-customDarkGray text-[15px] mx-2">
                                        {feed?.dislikeCount}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    className="md:px-7 px-4 py-2 md:text-[16px] text-[13px] font-normal text-white bg-customBlue rounded-[20px] capitalize"
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
                              <div className="py-3 px-2 text-left">
                                <h2 className="text-customBlue font-medium md:text-[23px] text-[15px] ">
                                  {feed?.vehicle?.model_id?.name ||
                                    feed?.vehicle?.regno}
                                </h2>
                                <h4 className="text-customOrange font-medium md:text-[18px] text-[15px] ">
                                  £ {feed?.vehicle?.price}
                                </h4>
                                <p className="text-customDarkGray md:text-[14px] text-[13px] ">
                                  {feed?.vehicle?.year || "2014"} -{" "}
                                  {feed?.vehicle?.mileage || "167,453"} Km
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {/* <div className="text-center">
                        {newsFeed.length && (
                          <div className="text-center my-5">
                            <button
                              onClick={handleShowMore}
                              className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                            >
                              Show More
                            </button>
                          </div>
                        )}
                      </div> */}
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
