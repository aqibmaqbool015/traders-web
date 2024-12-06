"use client";

import { usePathname, useRouter } from "next/navigation";
import { CarouselCar } from "../../components/carouselCar";
import CustomInput from "../../components/input";
import MapComponent from "../../components/mapComponent";
import { RatingStar } from "../../components/ratingStar";
import {
  auto,
  contact,
  contactList,
  participateForm,
  products,
  userListingDetail,
} from "../../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addCommentApi,
  createReviewApi,
  getAllCommentsApi,
  vehicleById,
} from "../api";
import Image from "next/image";
import { getAllAuctionApi } from "@/app/auctions/api";
import { Image_base } from "@/networking/network";

const image = {
  heart: "/heart.svg",
  auto: "/auto.svg",
  user: "/reviewer.png",
  star: "/star.svg",
  cross: "/cross-custom.svg",
  image1: "/instrument1.svg",
  image2: "/instrument2.svg",
  image3: "/instrument3.svg",
  image4: "/instrument4.svg",
  image5: "/instrument5.svg",
  user1: "/user1.png",
};

export const inputField = [
  {
    label: "Your Name",
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Enter your name",
  },
  {
    label: "Feedback",
    type: "text",
    id: "feedback",
    name: "feedback",
    placeholder: "Enter your feedback",
  },
  {
    label: "Registration Number",
    type: "text",
    id: "regno",
    name: "regno",
    placeholder: "Enter your regno",
  },
];

const Detail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVehicleDetail, setIsVehicleDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [error, setError] = useState(null);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const [isCallModal, setIsCallModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isReview, setIsReview] = useState("");
  const [allAuction, setAllAuction] = useState([]);
  const [isAllComments, setIsAllComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [isCommented, setIsCommented] = useState(false);

  useEffect(() => {
    fetchAllComments();
  }, [isCommented]);

  const fetchAllComments = async () => {
    const id = pathname.split("/")[2];
    const params = {
      vehicleId: id,
    };

    try {
      const data = await getAllCommentsApi(params);
      if (data?.data) {
        setIsAllComments(data?.data[0]?.comments);
        setIsCommented(false);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setIsAllComments([]);
    }
  };

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 3);
  };
  const handleShowLess = () => {
    setVisibleComments(3);
  };

  useEffect(() => {
    fetchAllAuctions();
  }, []);

  const fetchAllAuctions = async () => {
    try {
      const data = await getAllAuctionApi();
      if (data?.data) {
        setAllAuction(data?.data);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setAllAuction([]);
    }
  };

  const fetchGetVehicleDetail = async (id) => {
    try {
      const response = await vehicleById(id);
      if (response?.data) {
        setIsVehicleDetail(response.data);
      }
    } catch (err) {
      console.error("Error fetching vehicle details:", err);
      setError(err.message);
      setIsVehicleDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchGetVehicleDetail(id);
    }
  }, [pathname]);

  if (loading) {
    return <p className="text-center my-10 text-customBlue">Loading...</p>;
  }

  if (error) {
    return <p className="text-center my-10 text-customBlue">Error: {error}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) return;
    const id = pathname.split("/")[2];
    setIsLoadingComment(true);
    const params = {
      vehicleId: id,
      comment: commentText,
    };
    try {
      const rsponse = await addCommentApi(params);
      if (rsponse) {
        console.log("Comment added successfully.");
        setIsCommented(true);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsLoadingComment(false);
      closeCommentModal();
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const { name, rating, feedback, regno } = isReview;

    if (!name || !rating || !feedback || !regno) {
      console.log("Validation Error:", { name, rating, feedback, regno });
      return;
    }

    setLoading(true);

    const param = {
      traderId: isVehicleDetail?.user_id?._id,
      name: isReview.name,
      rating: isReview.rating,
      feedback: isReview.feedback,
      regno: isVehicleDetail?.regno,
    };

    try {
      await createReviewApi(param);
      console.log("Review added successfully.");
    } catch (error) {
      console.error("Error adding Review:", error);
    } finally {
      setLoading(false);
      closeFilterModal();
    }
  };

  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => {
    setCommentText("");
    setCommentModalOpen(false);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => {
    setIsReview("");
    setFilterModalOpen(false);
  };

  const openAuctionModal = () => setIsAuctionModalOpen(true);
  const closeAuctionModal = () => setIsAuctionModalOpen(false);

  const openCallModal = () => setIsCallModal(true);
  const closeCallModal = () => setIsCallModal(false);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/payment-method");
  };
  const handleClickBid = (e) => {
    e.preventDefault();
    router.push("/auction-bid");
  };

  const onHandleClickButtons = (index) => {
    if (index === 0) {
      openCallModal();
    } else if (index === 1) {
      const senderData = JSON.stringify(isVehicleDetail?.user_id);
      localStorage.setItem("senderId", senderData);
      router.push(`/chats`);
    } else if (index === 2) {
      router.push("https://web.whatsapp.com/");
    } else if (index === 3) {
      router.push(`/chats`);
    }
  };

  return (
    <>
      <div className="md:px-8">
        <section className="mt-5 px-2 py-6">
          {isVehicleDetail ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
                <div className="col-span-12 md:col-span-6">
                  <CarouselCar isVehicleDetail={isVehicleDetail} />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="px-2 py-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium  text-customBlackLight text-[26px]">
                        {isVehicleDetail?.make_id?.title} {""}
                        {isVehicleDetail?.model_id?.name}
                      </h4>
                      <Image
                        className="w-[22px] h-[22px] object-[initial]"
                        src={image.heart}
                        alt="Sample image"
                        width={22}
                        height={22}
                      />
                    </div>
                    <p className="text-customOrange text-[18px]">
                      {isVehicleDetail?.price}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-customDarkGray text-[15px]">
                        {isVehicleDetail?.year} - {isVehicleDetail?.mileage}{" "}
                        Miles
                      </p>
                      <p className="text-customDarkGray text-[14px]">
                        {isVehicleDetail.createdAt
                          ? new Date(
                              isVehicleDetail?.createdAt
                            ).toLocaleDateString("en-GB")
                          : "7 days ago"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="grid md:grid-cols-2 gap-4 my-4
                     md:py-0 md:pr-10"
                  >
                    {contact.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="inline-block md:w-full sm:w-[200px] w-[200px] mx-2"
                        >
                          <div
                            onClick={() => onHandleClickButtons(index)}
                            className="flex md:w-full sm:w-[200px] w-[200px] sm:px-3 px-5 py-3 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton items-center"
                          >
                            <Image
                              className="w-[20px] h-[20px]"
                              src={item.image}
                              width={20}
                              height={20}
                              alt=""
                            />
                            <h5 className="text-[16px] text-customBlue font-normal mx-3">
                              {item.title}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {isCallModal && (
                    <div
                      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center
                          z-10"
                    >
                      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[500px] max-h-[90vh] overflow-y-auto">
                        <div className="p-4 relative">
                          <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                            Contact Number
                          </h2>

                          <div className="absolute right-3 top-4">
                            <Image
                              src={image.cross}
                              alt=""
                              className="w-[15px] h-auto cursor-pointer"
                              width={15}
                              height={15}
                              onClick={closeCallModal}
                            />
                          </div>
                          <form className="space-y-4">
                            <p className="text-[16px] text-customColorNav font-medium ">
                              +9243 2390 102 80
                            </p>
                            <div className="flex justify-center">
                              <button className=" flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-2">
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-0 my-5">
                    {/* {products.map((item, index) => {
                      return (
                       
                      );
                    })} */}
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image1}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {isVehicleDetail?.location}
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image1}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {isVehicleDetail?.mileage} Liter
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image2}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray uppercase font-normal mx-3">
                        {isVehicleDetail?.transition}
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image3}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {isVehicleDetail?.door} Doors
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image4}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {isVehicleDetail?.seats} Seats
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.image5}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray uppercase font-normal mx-3">
                        {isVehicleDetail?.fuel_type?._id?.name} Liter
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-12">
                  {allAuction?.length === 0 ? (
                    <>
                      <p className="text-center text-customBlue">No Bid</p>
                    </>
                  ) : (
                    <>
                      {allAuction?.isLive && allAuction?.is_sold ? (
                        <>
                          <div className="text-center ">
                            <button
                              className="py-2.5 px-8 border border-transparent rounded-[12px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                              onClick={handleClickBid}
                            >
                              Start You Bid
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center ">
                            <button
                              className="py-2.5 px-8 border border-transparent rounded-[12px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2
                        opacity-50  "
                              disabled
                            >
                              Start You Bid
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="mt-10">
                    <Image
                      src={image.auto}
                      alt=""
                      className="md:w-[200px] w-[180px] h-full object-[initial]
                         inline-block"
                      width={200}
                      height={180}
                    />

                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Vehicle
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.vehicle_status}
                      </h5>
                    </div>
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Trade
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.trade}
                      </h5>
                    </div>
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Retail Value
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.retail}
                      </h5>
                    </div>
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Part Exchange
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.partExchange}
                      </h5>
                    </div>
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Private
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.private}
                      </h5>
                    </div>
                    {/* {auto.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3"
                        >
                          <h5 className="text-[16px] text-customBlackLight font-normal">
                            {item.title}
                          </h5>
                          <h5 className="text-[16px] text-customDarkGray font-normal">
                            {item.text}
                          </h5>
                        </div>
                      );
                    })} */}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="border-b border-b-customGray py-3">
                    <h5 className="text-[20px] text-customBlue font-normal ">
                      AutoTrader Valuation{" "}
                    </h5>
                    <p className="text-customBlackLight font-medium text-[16px]">
                      Today’s Valuation Based On{" "}
                      <span className="font-normal text-customDarkGray">
                        {isVehicleDetail?.mileage} Miles
                      </span>
                    </p>
                  </div>
                  <h5 className="text-[20px] text-customBlue font-normal mt-3">
                    Decsription{" "}
                  </h5>
                  <p className="text-[16px] font-normal text-customDarkGray ">
                    {isVehicleDetail?.post_desc}
                  </p>
                </div>
              </div>
              <div className="my-3">
                <h4 className="font-normal  text-customBlue  text-[24px] mb-5">
                  Comments
                </h4>
                {isAllComments?.length === 0 ? (
                  <p className="text-center text-customBlue">
                    No Comments available
                  </p>
                ) : (
                  <>
                    {isAllComments
                      ?.slice(0, visibleComments)
                      .map((comment, index) => (
                        <div key={index} className="flex items-center mb-3">
                          <Image
                            src={
                              comment?.user_id?.profilePicture
                                ? `${Image_base}${comment?.user_id?.profilePicture}`
                                : image.user1
                            }
                            alt="Profile Picture"
                            className="w-[47px] h-[47px] inline-block rounded-full"
                            width={47}
                            height={47}
                          />
                          <div className="mx-3">
                            <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                              {comment?.userId?.firstName || "Unknown User"}
                            </h5>
                            <p className="text-[13px] font-normal text-customDarkGray capitalize">
                              {comment?.comment || "No comment"}
                            </p>
                          </div>
                        </div>
                      ))}
                    {visibleComments < isAllComments?.length ? (
                      <button
                        onClick={handleShowMore}
                        className="text-customBlue font-medium mt-3 px-4 py-1 border border-customBlue rounded-[8px]  "
                      >
                        Show More
                      </button>
                    ) : (
                      visibleComments > 3 && (
                        <button
                          onClick={handleShowLess}
                          className="text-customBlue font-medium mt-3 px-4 py-1 border border-customBlue rounded-[8px]"
                        >
                          Show Less
                        </button>
                      )
                    )}
                  </>
                )}

                <div className="flex justify-between mt-3">
                  <button
                    type="submit"
                    onClick={openCommentModal}
                    className=" flex justify-center md:py-2.5 md:px-10 py-2 px-5 rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
                  >
                    Write a comment
                  </button>
                  <button
                    type="submit"
                    onClick={openFilterModal}
                    className=" flex justify-center md:py-2.5 md:px-10 py-2 px-5 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-7"
                  >
                    Write a Review
                  </button>
                </div>
                <h4 className="font-normal  text-customBlue  text-[24px] my-5">
                  The Trader
                </h4>
                <div className="md:flex justify-between items-center">
                  <div className="flex items-center mb-3">
                    <Image
                      src={
                        `${Image_base}${isVehicleDetail?.user_id?.profilePicture}` ||
                        image.user1
                      }
                      alt=""
                      className="w-[47px] h-[47px] inline-block rounded-full "
                      width={47}
                      height={47}
                    />
                    <div className="mx-3">
                      <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                        {isVehicleDetail?.user_id?.firstName} {""}
                        {isVehicleDetail?.user_id?.lastName}
                      </h5>
                      <p className="text-[13px] font-normal text-customDarkGray capitalize ">
                        <Image
                          className="w-[16px] h-[16px] inline-block object-contain mr-1 align-text-top"
                          src={image.star}
                          alt=""
                          width={16}
                          height={16}
                        />{" "}
                        {isVehicleDetail?.averageRating}(
                        {isVehicleDetail?.totalReviews} reviews)
                      </p>
                    </div>
                  </div>
                  <div className="md:flex sm:flex inline-block">
                    {contactList.map((item, index) => {
                      return (
                        <div
                          className="inline-block w-[140px] mx-2 "
                          key={index}
                          onClick={openAuctionModal}
                        >
                          <div
                            className="flex md:w-[140px] sm:w-[140px] w-[130px] mx-2 my-2 px-4 py-2 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
                                     items-center"
                          >
                            <Image
                              className="w-[20px] h-[20px]"
                              src={item.image}
                              alt=""
                              width={20}
                              height={20}
                            />
                            <h5 className="text-[16px] text-customBlue font-normal mx-3">
                              {item.title}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex mx-2 my-3">
                  <div className="flex justify-between md:w-[180px] w-[190px] border border-customOrange mx-2 my-3 px-3 py-3 cursor-pointer rounded-[12px] bg-customExtralight items-center">
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      Sale Cars{" "}
                    </h5>
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      35{" "}
                    </h5>
                  </div>
                  <div className="flex justify-between md:w-[180px]  w-[190px] border border-customOrange mx-2 my-3 px-3 py-3 cursor-pointer rounded-[12px] bg-customExtralight items-center">
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      Sold Cars{" "}
                    </h5>
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      20{" "}
                    </h5>
                  </div>
                </div>
                <p className="text-[16px] font-normal text-customDarkGray">
                  We have been supplying the trade for over 35 years building
                  many relationship on trust and integrity.
                </p>
                <div className="my-3 md:mx-10">
                  <MapComponent isVehicleDetail={isVehicleDetail} />
                </div>
              </div>
            </>
          ) : (
            <p>No vehicle details available</p>
          )}
        </section>
        {isCommentModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/2 max-h-[90vh] overflow-y-auto">
              <div className="p-4 relative">
                <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                  Write a Comment
                </h2>
                <div className="absolute right-3 top-4">
                  <Image
                    src={image.cross}
                    alt="Close"
                    className="w-[15px] h-auto cursor-pointer"
                    width={15}
                    height={15}
                    onClick={closeCommentModal}
                  />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label
                    htmlFor="message"
                    className="text-[16px] font-medium text-customDarkGray"
                  >
                    Comment
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={commentText}
                    onChange={handleCommentChange}
                    className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                 border border-[#CFCFCF] rounded-[25px]"
                    placeholder="Write a comment"
                  ></textarea>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isLoadingComment}
                      className="flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                    >
                      {isLoadingComment ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {isFilterModalOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center
                z-10"
          >
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/2 max-h-[90vh] overflow-y-auto">
              <div className="p-4 relative">
                <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                  filters
                </h2>
                <div className="absolute right-3 top-4">
                  <Image
                    src={image.cross}
                    alt=""
                    className="w-[15px] h-auto cursor-pointer"
                    width={15}
                    height={15}
                    onClick={closeFilterModal}
                  />
                </div>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <label className="text-[16px] font-medium text-customDarkGray">
                    Your Rating
                  </label>
                  {/* <RatingStar
                    value={isReview.rating || "0"}
                    onChange={(rating) => {
                      setIsReview((prev) => ({
                        ...prev,
                        rating: String(rating),
                      }));
                      console.log({ rating: String(rating) }, "Updated rating");
                    }}
                  /> */}
                  <RatingStar isReview={isReview} setIsReview={setIsReview} />
                  {inputField.map((field, index) => (
                    <CustomInput
                      key={index}
                      label={field.label}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={isReview[field.name] || ""}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setIsReview((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                        console.log({ [name]: value }, "Updated field");
                      }}
                    />
                  ))}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {isAuctionModalOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center
                z-10"
          >
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[500px] max-h-[90vh] overflow-y-auto">
              <div className="p-4 relative">
                <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                  Auction Participate Fee
                </h2>
                <h3 className="text-[19px] text-customOrange font-semibold capitalize mb-4">
                  £ 9.99
                </h3>
                <div className="absolute right-3 top-4">
                  <Image
                    src={image.cross}
                    alt=""
                    className="w-[15px] h-auto cursor-pointer"
                    width={15}
                    height={15}
                    onClick={closeAuctionModal}
                  />
                </div>
                <form className="space-y-4">
                  {participateForm?.map((field, index) => (
                    <CustomInput
                      key={index}
                      label={field.label}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      labelClass={field.labelClass}
                    />
                  ))}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className=" flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-2"
                    >
                      Submit and Pay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
