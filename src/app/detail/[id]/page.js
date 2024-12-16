"use client";

import { usePathname, useRouter } from "next/navigation";
import { CarouselCar } from "../../components/carouselCar";
import CustomInput from "../../components/input";
import MapComponent from "../../components/mapComponent";
import { RatingStar } from "../../components/ratingStar";
import { contact, contactList, participateForm } from "../../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addCommentApi,
  createReviewApi,
  getAllCommentsApi,
  getAllReviewsApi,
  getUserVehicleHistoryApi,
  reviewDetailsApi,
  reviewDetailsVehicleApi,
  vehicleById,
} from "../api";
import Image from "next/image";
import { getAllAuctionApi } from "@/app/auctions/api";
import { Image_base } from "@/networking/network";
import { wishlistPost } from "@/app/home/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "@/app/components/toast";

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
  regIcon: "/verify.png",
  location: "/location.png",
  distance: "/distance.png",
};

const inputField = [
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
];

const Detail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVehicleDetail, setIsVehicleDetail] = useState([]);
  const [isVehicleDetailRate, setIsVehicleDetailRate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
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
  const [allReviews, setAllReviews] = useState([]);
  const [allReviewsVehicle, setAllReviewsVehicle] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [vehicleHIstory, setVehicleHistory] = useState({});

  useEffect(() => {
    const id = isVehicleDetail?.user_id?._id;
    if (id) {
      fetchVehicleHistory(id);
    }
  }, [isVehicleDetail?.user_id?._id]);

  const fetchVehicleHistory = async (id) => {
    try {
      const response = await getUserVehicleHistoryApi(id);
      if (response) {
        setVehicleHistory(response);
      } else {
        setVehicleHistory([]);
      }
    } catch (err) {
      setError(err.message);
      setVehicleHistory([]);
    }
  };

  const handleClickFavourite = async () => {
    const id = pathname.split("/")[2];
    const params = {
      vehicleId: id,
    };
    try {
      const response = await wishlistPost(params);
      if (response) {
        setIsFavourite(!isFavourite);
      }
    } catch (error) {
      // toast.error(<CustomToast content="Failed to Add to Wishlist" />);
    }
  };

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
      setIsAllComments([]);
    }
  };

  const fetchAllReviewsVehicle = async () => {
    const params = {
      regno: isVehicleDetail?.regno,
    };
    const data = await reviewDetailsVehicleApi(params);
    if (data?.data) {
      setAllReviewsVehicle(data?.data[0]?.reviews);
    } else {
      setAllReviewsVehicle([]);
    }
  };

  useEffect(() => {
    if (isVehicleDetail?.regno) {
      fetchAllReviewsVehicle();
    }
  }, [isVehicleDetail]);

  const fetchAllReviews = async () => {
    const params = {
      regno: isVehicleDetail?.regno,
    };
    try {
      const data = await reviewDetailsApi(params);
      console.log("data------", data);

      if (data?.data) {
        setAllReviews(data?.data[0]?.reviews || []);
      }
    } catch (err) {
      setAllReviews([]);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 3);
  };
  const handleShowLess = () => {
    setVisibleComments(3);
  };

  // useEffect(() => {
  //   fetchAllAuctions();
  // }, []);

  // const fetchAllAuctions = async () => {
  //   try {
  //     const data = await getAllAuctionApi();
  //     if (data?.data) {
  //       setAllAuction(data?.data);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching vehicles:", err);
  //     setAllAuction([]);
  //   }
  // };

  const fetchGetVehicleDetail = async (id) => {
    try {
      const response = await vehicleById(id);
      if (response?.data) {
        setIsVehicleDetail(response?.data);
      }
      if (response) {
        setIsVehicleDetailRate(response);
      }
    } catch (err) {
      toast.error(<CustomToast content="Error fetching vehicle details:" />);

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
    return (
      <div className="flex justify-center">
        <p className="text-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 my-5 "></p>
      </div>
    );
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
        toast.success(<CustomToast content="Comment added successfully." />);
        setIsCommented(true);
      }
    } catch (error) {
      toast.error(<CustomToast content="Error adding comment:" />);
    } finally {
      setIsLoadingComment(false);
      closeCommentModal();
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const { name, rating, feedback, regno } = isReview;

    if (!name || !rating || !feedback) {
      toast.error(<CustomToast content="Validation Error:" />);

      return;
    }

    setReviewLoading(true);

    const param = {
      traderId: isVehicleDetail?.user_id?._id,
      name: isReview.name,
      rating: isReview.rating,
      feedback: isReview.feedback,
      regno: isVehicleDetail?.regno,
    };

    try {
      await createReviewApi(param);
      console.log("review------");
      console.log("Review added successfully.");
    } catch (error) {
    } finally {
      setReviewLoading(false);
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
  const handleClickHistory = (selected) => {
    if (vehicleHIstory) {
      const param = {
        user_id: isVehicleDetail?.user_id?._id,
        sold: selected === "sold" ? true : false,
      };
      const userJsonParams = JSON.stringify(param);
      localStorage.setItem("traderVehicleId", userJsonParams);
      router.push("/my-post");
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
                      <h4 className="font-medium  text-customBlackLight md:text-[26px] text-[20px] ">
                        {isVehicleDetail?.make_id?.title} {""}
                        {isVehicleDetail?.model_id?.name}
                      </h4>
                      {isFavourite ? (
                        <svg
                          onClick={handleClickFavourite}
                          width="25"
                          height="25"
                          viewBox="0 0 35 32"
                          fill="#F53535"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            d="M24.5487 0.814148C29.5477 0.814148 33.6001 4.89137 33.6001 10.5995C33.6001 22.0157 21.2573 28.5392 17.143 30.9856C13.0287 28.5392 0.685852 22.0157 0.685852 10.5995C0.685852 4.89137 4.80014 0.814148 9.73728 0.814148C12.7983 0.814148 15.4973 2.44504 17.143 4.07592C18.7887 2.44504 21.4877 0.814148 24.5487 0.814148Z"
                            fill="#F53535"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={handleClickFavourite}
                          width="25"
                          height="25"
                          viewBox="0 0 35 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            d="M24.5487 0.814148C29.5477 0.814148 33.6001 4.89137 33.6001 10.5995C33.6001 22.0157 21.2573 28.5392 17.143 30.9856C13.0287 28.5392 0.685852 22.0157 0.685852 10.5995C0.685852 4.89137 4.80014 0.814148 9.73728 0.814148C12.7983 0.814148 15.4973 2.44504 17.143 4.07592C18.7887 2.44504 21.4877 0.814148 24.5487 0.814148Z"
                            stroke="#7C7C7C"
                          />
                        </svg>
                      )}
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
                          <div className="space-y-4">
                            <p className="text-[16px] text-customColorNav font-medium ">
                              +123 324424 4234
                            </p>
                            {/* {isVehicleDetail?.length === 0 ? (
                              <p>No contact number</p>
                            ) : (
                              isVehicleDetail?.map((item, index) => {
                                <p
                                  key={index}
                                  className="text-[16px] text-customColorNav font-medium "
                                >
                                  {item?.userId?.phone}
                                </p>
                              })
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-0 my-5">
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.regIcon}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {isVehicleDetail?.regno}
                      </h5>
                    </div>

                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.distance}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray uppercase font-normal mx-3">
                        {isVehicleDetail?.mileage} miles
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
                      <h5 className="text-[16px] text-customDarkGray uppercase font-normal mx-3">
                        {isVehicleDetail?.door} Doors
                      </h5>
                    </div>
                    <div className="flex cursor-pointer items-center border-b border-b-customGray py-3">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={image.location}
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
                        src={image.image5}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray uppercase font-normal mx-3">
                        {isVehicleDetail?.fuel_type?._id?.name} mile
                      </h5>
                    </div>
                  </div>
                </div>
                {/* <div className="col-span-12 md:col-span-12">
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
                </div> */}
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
                        {isVehicleDetail?.make_id?.title}
                        {", "}
                        {isVehicleDetail?.model_id?.name}
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

                <div className="md:flex justify-between items-center ">
                  <div className="flex items-center mb-3">
                    <Image
                      src={
                        isVehicleDetail?.user_id?.profilePicture
                          ? `${Image_base}${isVehicleDetail?.user_id?.profilePicture}`
                          : image.user1
                      }
                      alt=""
                      className="w-[47px] h-[47px] inline-block rounded-full"
                      width={47}
                      height={47}
                    />
                    <div className="mx-3">
                      <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                        {isVehicleDetail?.user_id?.firstName}{" "}
                        {isVehicleDetail?.user_id?.lastName}
                      </h5>
                      <div className="flex items-center ">
                        <p className="text-[13px] font-normal text-customDarkGray capitalize mr-2">
                          <Image
                            className="w-[16px] h-[16px] inline-block object-contain mr-1 align-text-top"
                            src={image.star}
                            alt=""
                            width={16}
                            height={16}
                          />{" "}
                          {isVehicleDetailRate?.averageRating} {""}
                        </p>
                        <p className="text-[13px] text-customDarkGray">
                          ({isVehicleDetailRate?.totalReviews} reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex sm:flex inline-block">
                    {contactList.map((item, index) => {
                      return (
                        <div
                          className="inline-block w-[140px] mx-2 "
                          key={index}
                        >
                          <div
                            className="flex md:w-[100px] mx-2 my-2 sm:w-[140px] w-[130px] mx-2 my-2 px-4 py-2 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
                                 items-center"
                            onClick={() => onHandleClickButtons(index)}
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
                {/* <div className="">
                  {allReviews?.length === 0 ? (
                    <p className="text-center text-customBlue">
                      No reviews available
                    </p>
                  ) : (
                    <div className=" ">
                      {allReviews?.map((review, index) => (
                        <>
                          <div className="flex justify-between items-center ">
                            <div key={index} className="flex items-center mb-3">
                              <Image
                                src={image.user1}
                                alt=""
                                className="w-[47px] h-[47px] inline-block rounded-full"
                                width={47}
                                height={47}
                              />
                              <div className="mx-3">
                                <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                                  {review?.userId?.firstName}{" "}
                                  {review?.userId?.lastName}
                                </h5>
                                <p className="text-[13px] font-normal text-customDarkGray capitalize">
                                  <Image
                                    className="w-[16px] h-[16px] inline-block object-contain mr-1 align-text-top"
                                    src={image.star}
                                    alt=""
                                    width={16}
                                    height={16}
                                  />{" "}
                                  {review?.rating}
                                </p>
                                <p className="text-[13px] text-customDarkGray">
                                  ({review?.feedback} reviews)
                                </p>
                              </div>
                            </div>
                            <div className="md:flex sm:flex inline-block">
                              {contactList.map((item, index) => {
                                return (
                                  <div
                                    className="inline-block w-[140px] mx-2 "
                                    key={index}
                                  >
                                    <div
                                      className="flex md:w-[100px] mx-2 my-2 sm:w-[140px] w-[130px] mx-2 my-2 px-4 py-2 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
                                 items-center"
                                      onClick={() =>
                                        onHandleClickButtons(index)
                                      }
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
                        </>
                      ))}
                    </div>
                  )}
                </div> */}
                <div className="flex mx-2 my-3">
                  <div
                    className="flex justify-between md:w-[180px] w-[190px] border border-customOrange mx-2 my-3 px-3 py-3 cursor-pointer rounded-[12px] bg-customExtralight items-center"
                    onClick={() => handleClickHistory("sale", false)}
                  >
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      Sale Cars{" "}
                    </h5>
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      {vehicleHIstory?.userSaleVehicles || "0"}
                    </h5>
                  </div>
                  <div
                    className="flex justify-between md:w-[180px]  w-[190px] border border-customOrange mx-2 my-3 px-3 py-3 cursor-pointer rounded-[12px] bg-customExtralight items-center"
                    onClick={() => handleClickHistory("sold", true)}
                  >
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      Sold Cars{" "}
                    </h5>
                    <h5 className="text-[16px] text-customOrange font-normal ">
                      {vehicleHIstory?.totalSoldVehicle || "0"}
                    </h5>
                  </div>
                </div>
                <p className="text-[16px] font-normal text-customDarkGray">
                  We have been supplying the trade for over 35 years building
                  many relationship on trust and integrity.
                </p>
                <div className="my-3">
                  <p className="my-2 text-[20px] text-customBlue font-medium ">
                    {" "}
                    <span className="text-customDarkGray font-light">
                      Reviews
                    </span>
                  </p>
                  {allReviewsVehicle.length === 0 ? (
                    <p>No reviews available</p>
                  ) : (
                    <>
                      {allReviewsVehicle?.map((review, index) => {
                        return (
                          <div key={index} className="">
                            <div className="flex items-center mb-3">
                              <Image
                                src={
                                  `${Image_base}${review?.userId?.profilePicture}` ||
                                  image.user1
                                }
                                alt=""
                                className="w-[47px] h-[47px] inline-block rounded-full"
                                width={47}
                                height={47}
                              />
                              <div className="mx-3">
                                <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                                  {review?.userId?.firstName} {""}{" "}
                                  {review?.userId?.lastName}
                                </h5>
                                <p className="text-[13px] font-normal text-customDarkGray capitalize">
                                  <Image
                                    className="w-[16px] h-[16px] inline-block object-contain mr-1 align-text-top"
                                    src={image.star}
                                    alt=""
                                    width={16}
                                    height={16}
                                  />{" "}
                                  {review?.rating}
                                </p>
                                <p className="text-[13px] text-customDarkGray">
                                  {review?.feedback}
                                </p>
                                <p className="text-[13px] text-customDarkGray">
                                  {review?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="my-3">
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
                        setIsReview((prev) => ({ ...prev, [name]: value }));
                      }}
                    />
                  ))}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                    >
                      {reviewLoading ? "Loading..." : "Submit"}
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
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default Detail;
