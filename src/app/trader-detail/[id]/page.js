"use client";
import MapComponent from "@/app/components/mapComponent";
import { contactList } from "@/app/constant";
import {
  createReviewApi,
  reviewDetailsApi,
  reviewDetailsVehicleApi,
  vehicleById,
} from "@/app/detail/api";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserVehicleHistoryApi } from "../api";
import { Image_base } from "@/networking/network";
import CustomInput from "@/app/components/input";
import { RatingStar } from "@/app/components/ratingStar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "@/app/components/toast";

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

const image = {
  user: "/reviewer.png",
  star: "/star.svg",
  user1: "/user1.png",
  cross: "/cross-custom.svg",
};

const TraderDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCallModal, setIsCallModal] = useState(false);
  const [vehicleHIstory, setVehicleHistory] = useState({});
  const [allReviewsVehicle, setAllReviewsVehicle] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const [traderData, setTraderData] = useState(null);
  const [isReview, setIsReview] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("traderData");
    const JSONData = JSON.parse(data);
    if (data) {
      setTraderData(JSONData);
    }
  }, [searchParams]);

  const fetchAllReviewsVehicle = async () => {
    const params = {
      userId: traderData?._id,
    };
    const data = await reviewDetailsApi(params);

    if (data?.data) {
      setAllReviewsVehicle(data?.data[0]?.reviews);
    } else {
      setAllReviewsVehicle([]);
    }
  };

  useEffect(() => {
    if (traderData?._id) {
      fetchAllReviewsVehicle();
    }
  }, [traderData]);

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchVehicleHistory(id);
    }
  }, [pathname]);

  const fetchVehicleHistory = async (id) => {
    try {
      const response = await getUserVehicleHistoryApi(id);
      if (response) {
        setVehicleHistory(response);
      } else {
        console.error("No data found in API response");
        setVehicleHistory([]);
      }
    } catch (err) {
      setVehicleHistory([]);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const { name, rating, feedback } = isReview;

    if (!name || !rating || !feedback) {
      toast.error(<CustomToast content="Validation Error:" />);

      return;
    }
    setReviewLoading(true);

    const param = {
      traderId: traderData?._id,
      name: isReview.name,
      rating: isReview.rating,
      feedback: isReview.feedback,
      regno: "N/A",
    };

    try {
      const response = await createReviewApi(param);
      if (response) {
        fetchAllReviewsVehicle();
        toast.success(<CustomToast content="Review added successfully." />);
      }
    } catch (error) {
    } finally {
      setReviewLoading(false);
      closeFilterModal();
    }
  };

  const openCallModal = () => setIsCallModal(true);
  const closeCallModal = () => setIsCallModal(false);

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => {
    setIsReview("");
    setFilterModalOpen(false);
  };

  const onHandleClickButtons = (index) => {
    if (index === 0) {
      openCallModal();
    } else if (index === 1) {
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
        user_id: traderData?._id,
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
          <h4 className="font-normal  text-customBlue  text-[24px] my-5">
            The Trader
          </h4>
          <div className="">
            {traderData?.length === 0 ? (
              <p className="text-center text-customBlue">
                No reviews available
              </p>
            ) : (
              <div className="md:flex justify-between items-center ">
                <div className="flex items-center mb-3">
                  <Image
                    src={
                      `${Image_base}${traderData?.profilePicture}` ||
                      image.user1
                    }
                    alt=""
                    className="w-[47px] h-[47px] inline-block rounded-full"
                    width={47}
                    height={47}
                  />
                  <div className="mx-3">
                    <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                      {traderData?.firstName} {traderData?.lastName}
                    </h5>
                    {/* <p className="text-[13px] font-normal text-customDarkGray capitalize mr-2">
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
                        </p> */}
                  </div>
                </div>
                <div className="md:flex sm:flex inline-block">
                  {contactList.map((item, index) => {
                    return (
                      <div className="inline-block w-[140px] mx-2 " key={index}>
                        <div
                          className="flex md:w-[140px] sm:w-[140px] w-[130px] mx-2 my-2 px-4 py-2 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
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
            )}
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
                  </div>
                </div>
              </div>
            </div>
          )}
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
          <div className="">
            <button
              type="submit"
              onClick={openFilterModal}
              className=" flex justify-center md:py-2.5 md:px-10 py-2 px-5 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-7"
            >
              Write a Review
            </button>
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
                      <RatingStar
                        isReview={isReview}
                        setIsReview={setIsReview}
                      />

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
          </div>
          <div className="my-3">
            <p className="my-2 text-[20px] text-customBlue font-medium ">
              <span className="text-customDarkGray font-light">Reviews</span>
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
          <ToastContainer position="top-right" />
        </section>
      </div>
    </>
  );
};

export default TraderDetail;
