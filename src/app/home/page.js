"use client";

import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandsCards from "../components/BrandsCards";
import Subscription from "../components/subscription";
import {
  allBrands,
  allVehicles,
  allVehiclesNews,
  paymentSubscription,
  uploadDocuments,
  wishlistPost,
} from "./api";
import { toast, ToastContainer } from "react-toastify";
import { getUserProfile } from "../login/api";
import { setUser } from "@/redux/slice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomToast from "../components/toast";
import "react-toastify/dist/ReactToastify.css";
import { Image_base } from "@/networking/network";
import CarouselBanner from "../components/carouselBanner";
import { VehicleCard } from "../components/VehicleCard";
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

const HomePage = () => {
  const glideRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.User?.data);

  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDocumentsOpen, setIsModalDocumentsOpen] = useState(false);
  const [isReviewingModal, setIsReviewingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [insurancePreview, setInsurancePreview] = useState(null);
  const [brands, setBrands] = useState([]);
  // const [vehicles, setVehicles] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);

  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    fetchVehicles(currentPage);
  }, []);

  const fetchVehicles = async (page) => {
    try {
      const data = await allVehicles({ page, limit: rowsPerPage });
      setShowLoading(false);
      if (data?.data) {
        setVehicles((prevVehicles) => [...prevVehicles, ...data?.data]);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setVehicles([]);
    }
  };

  const handleShowMore = () => {
    setShowLoading(true);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      fetchVehicles((prev) => prev + 1);
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
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await allBrands();

      if (response?.data) {
        setBrands(response?.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    if (!user?.paidMember) {
      setIsModalOpen(true);
      return;
    }
    if (user?.reviewStatus === "rejected") {
      setIsModalDocumentsOpen(true);
      return;
    }
    if (user?.reviewStatus === "reviewing") {
      setIsReviewingModal(true);
      return;
    }
  }, [user?.paidMember, user?.reviewStatus]);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  useEffect(() => {
    if (brands.length > 0 && typeof window !== "undefined") {
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
  }, [brands]);

  const fetchSubscriptionData = async () => {
    try {
      const response = await paymentSubscription();
      setSubscriptions(response?.data);
    } catch (err) {
      setError("Failed to load subscription data.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const cloeModalDocuments = () => {
    setIsModalDocumentsOpen(false);
  };

  const handleImageUpload = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleClick = () => {
    router.push("/search");
  };

  const handleClickBrands = (id) => {
    router.push(`/brand-make/${id}`);
  };

  const handleSubmitDocuments = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (profileImage) {
      formData.append("selfie", profileImage);
    } else {
      console.error("Profile image is required.");
    }

    if (frontImage) {
      formData.append("drivingLicence", frontImage);
    } else {
      console.error("Front image is required.");
    }

    if (insurance) {
      formData.append("insurance", insurance);
    } else {
      console.error("Insurance document is required.");
    }

    formData.append("email", user?.email);
    formData.append("firstName", user?.firstName);
    formData.append("lastName", user?.lastName);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      setLoading(true);
      const responseDocuments = await uploadDocuments(formData);

      if (responseDocuments.success) {
        const res = await getUserProfile();
        if (res?.data?.paidMember === true) {
          return;
        }
        if (res?.data?.reviewStatus === "reviewing") {
          return;
        }
        toast.success(
          <CustomToast
            content="Your upload docements request is under review."
            contact="You can contact us at"
            mail="support@trade2trade.co.uk"
          />
        );
        dispatch(setUser(res));
        setIsModalOpen(false);
        setIsModalDocumentsOpen(false);
      } else {
        toast.error(<CustomToast content="Error!" />);
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[url('/home-banner.png')] bg-[length:100%_100%] bg-no-repeat bg-center md:h-screen py-5 flex justify-center items-center">
        <div>
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
                  className="md:w-[20px] w-[17px] h-auto"
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
      </section>
      <ToastContainer position="top-right" />
      <section className="mt-4">
        <h3 className="text-customBlue md:text-[28px] text-center font-semibold">
          Top Brands Associated with Us
        </h3>
        <div className="glide xl:w-[54rem] lg:w-[42rem] md:w-[30rem] sm:w-[18rem] md:px-16 px-6 md:py-8 py-4 bg-white">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides justify-center">
              {brands?.length > 0 ? (
                brands?.map((brand, index) => (
                  <li key={index} className="glide__slide">
                    <Image
                      src={`${Image_base}${brand.logo}`}
                      alt={brand.title}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] rounded-[50%] cursor-pointer "
                      onClick={() => handleClickBrands(brand._id)}
                    />
                  </li>
                ))
              ) : (
                <>
                  {loading ? (
                    <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></span>
                  ) : null}
                </>
                // <p className="text-center text-customBlue ">
                //   No brands available
                // </p>
              )}
            </ul>
          </div>
          {/* Uncomment if you want to enable navigation arrows */}
          {/* <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left left-4" data-glide-dir="<">
          <div className="h-9 w-9 bg- rounded-xl flex justify-center items-center my-auto hover:bg-red-200 duration-300 ease-in-out">
            <i className="fas fa-angle-left text-red-200 text-2xl"></i>
          </div>
        </button>
        <button className="glide__arrow glide__arrow--right right-4" data-glide-dir=">">
          <div className="h-9 w-9 bg- rounded-xl flex justify-center items-center my-auto hover:bg-red-200 duration-300 ease-in-out">
            <i className="fas fa-angle-right text-red-200 text-2xl"></i>
          </div>
        </button>
      </div> */}
        </div>
      </section>
      <section className="mt-4">
        <h3 className="text-customBlue md:text-[28px] text-center font-semibold">
          Best Vehicles For You
        </h3>

        <BrandsCards
          vehicles={vehicles}
          newsFeed={newsFeed}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          handleShowMore={handleShowMore}
          showLoading={showLoading}
        />
      </section>
      {/* modal */}
      {isModalOpen && (
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="img"
                  width={30}
                  height={30}
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <div>
                <Subscription
                  loading={loading}
                  subscriptions={subscriptions}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalDocumentsOpen && (
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="img"
                  className="w-[15px] h-auto cursor-pointer"
                  width={15}
                  height={15}
                  onClick={cloeModalDocuments}
                />
              </div>
              {/* <div>
                <UploadDocuments />
              </div> */}

              <div className="w-full flex flex-col items-center">
                <div className="text-left w-full">
                  <Image
                    src={image.logo}
                    alt="img"
                    className="w-[100px] mx-2 my-2 h-auto"
                    width={140}
                    height={70}
                  />
                </div>
                <div className="max-w-md w-full px-4 md:px-0">
                  <form
                    className="min-h-screen flex flex-col items-center p-4"
                    onSubmit={handleSubmitDocuments}
                  >
                    <h1 className="text-2xl font-semibold mb-4 text-center md:text-[30px] text-[25px] text-customBlue">
                      Upload Documents
                    </h1>
                    <div className="w-full md:w-[400px]">
                      <div className="flex justify-center mb-3">
                        <div className="w-24 h-24 bg-customGray rounded-full relative">
                          {profileImage ? (
                            <Image
                              src={URL.createObjectURL(profileImage)}
                              alt="Profile"
                              className="w-full h-full object-cover rounded-full"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <Image
                              src={image.vector}
                              alt="Avatar"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover rounded-full"
                            />
                          )}
                          <span className="absolute bottom-0 right-0 bg-white rounded-full w-[28px] h-[28px] p-[5px]">
                            <label
                              htmlFor="profileImage"
                              className="cursor-pointer w-[17px] h-full inline-block"
                            >
                              <Image
                                src={image.camera}
                                alt="img"
                                width={30}
                                height={30}
                                className="w-full h-full object-contain"
                              />
                            </label>
                          </span>
                          <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                setProfileImage,
                                setProfilePreview
                              )
                            }
                          />
                        </div>
                      </div>
                      <p className="text-center text-sm font-normal text-customBlue mb-6">
                        Upload Your Driving License/Passport
                      </p>

                      <div className="mb-4">
                        <label className="block text-customBlue font-medium mb-2">
                          Front
                        </label>
                        <div className="border-dashed border-2 border-customGray rounded-lg text-center bg-customLight h-[200px] grid place-items-center">
                          {frontImage ? (
                            <Image
                              src={URL.createObjectURL(frontImage)}
                              alt="Front ID"
                              className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                              width={390}
                              height={190}
                            />
                          ) : (
                            <div className="text-center">
                              <label className="inline-block cursor-pointer">
                                <Image
                                  src={image.plas}
                                  alt="img"
                                  width={25}
                                  height={25}
                                  className="w-[25px] h-[25px] object-contain"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      setFrontImage,
                                      setFrontPreview
                                    )
                                  }
                                />
                              </label>
                              <p className="text-customDarkGray">
                                Upload front side of your ID
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-customBlue font-medium mb-2">
                          Back
                        </label>
                        <div className="border-dashed border-2 border-customGray rounded-lg text-center bg-customLight h-[200px] flex items-center justify-center">
                          {backImage ? (
                            <Image
                              src={URL.createObjectURL(backImage)}
                              alt="Back ID"
                              className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                              width={390}
                              height={190}
                            />
                          ) : (
                            <div>
                              <label className="w-[25px] h-[25px] inline-block cursor-pointer">
                                <Image
                                  src={image.plas}
                                  alt="img"
                                  className="w-full h-full object-contain"
                                  width={25}
                                  height={25}
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      e,
                                      setBackImage,
                                      setBackPreview
                                    )
                                  }
                                />
                              </label>
                              <p className="text-customDarkGray">
                                Upload back side of your ID
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-6 mt-4">
                        <label className="block text-customBlue font-medium">
                          Insurance Documents
                        </label>
                        <p className="text-customDarkGray text-[14px]">
                          Attachments
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="mt-2"
                          onChange={(e) =>
                            handleImageUpload(
                              e,
                              setInsurance,
                              setInsurancePreview
                            )
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full py-3 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-4 ${
                          loading ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                        ) : null}
                        {loading ? "Loading..." : "Upload Documents"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReviewingModal && (
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="img"
                  className="w-[15px] h-auto cursor-pointer"
                  width={15}
                  height={15}
                />
              </div>
              <div className="text-center">
                <p className="text-customBlackLight text-[14px] mx-6 mt-5">
                  Your account registration request is under review. you can
                  contact us at{" "}
                  <span className="text-customBlue cursor-pointer font-medium ">
                    support@trade2trade.co.uk
                  </span>
                </p>
                <button className="my-4 px-4 py-1 capitalize w-[120px] text-white bg-customBlue rounded-[15px] border-none outline-none  ">
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
