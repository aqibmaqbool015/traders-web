"use client";

import { useRouter } from "next/navigation";
import { CarouselCar } from "../components/carouselCar";
import CustomInput from "../components/input";
import MapComponent from "../components/mapComponent";
import { RatingStar } from "../components/ratingStar";
import {
  auto,
  contact,
  contactList,
  inputField,
  participateForm,
  products,
  userListing,
  userListingDetail,
} from "../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { vehicleById } from "./api";

function openModal() {
  document?.getElementById("myModal").classList.remove("hidden");
}

function closeModal() {
  document?.getElementById("myModal").classList.add("hidden");
}

function openModals() {
  document?.getElementById("myModals").classList.remove("hidden");
}

function closeModals() {
  docum;
  ent.getElementById("myModals").classList.add("hidden");
}
function openModalForm() {
  document?.getElementById("myModalForm").classList.remove("hidden");
}

function closeModalForm() {
  document?.getElementById("myModalForm").classList.add("hidden");
}

const image = {
  heart: "/heart.svg",
  auto: "/auto.svg",
  user: "/reviewer.png",
  star: "/star.svg",
  cross: "/cross-custom.svg",
};

const text = {
  item: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. ",
};

const Detail = () => {
  const router = useRouter();
  const [getVehicle, SetGetVehicle] = useState();
  const user = useSelector((state) => state?.User?.data);
  console.log(user, ".........user...........");

  useEffect(() => {
    fetchGetVehicleDetail();
  }, []);

  const fetchGetVehicleDetail = async () => {
    const data = await vehicleById();
    console.log(data, "...........data..........");
    try {
    } catch (err) {}
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/payment-method");
  };
  const handleClickBid = (e) => {
    e.preventDefault();
    router.push("/start-bid");
  };

  return (
    <>
      <div className="md:px-8">
        <section className="mt-5 px-2 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-6">
              <CarouselCar />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="px-2 py-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium  text-customBlackLight text-[26px]">
                    Mercedes X Class
                  </h4>
                  <img
                    className="w-[22px] h-[22px] object-[initial]"
                    src={image.heart}
                    alt="Sample image"
                  />
                </div>
                <p className="text-customOrange text-[18px]">£12,000.00</p>
                <div className="flex justify-between items-center">
                  <p className="text-customDarkGray text-[15px]">
                    2014-167,453 km
                  </p>
                  <p className="text-customDarkGray text-[14px]">8 days ago</p>
                </div>
              </div>
              <div
                className="grid md:grid-cols-2 gap-4 my-4
                            md:py-0 md:pr-10"
              >
                {contact.map((item, index) => {
                  return (
                    <div className="inline-block md:w-full sm:w-[200px] w-[200px] mx-2">
                      <div
                        className="flex md:w-full sm:w-[200px] w-[200px] sm:px-3 px-5 py-3 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
                                            items-center"
                      >
                        <img
                          className="w-[20px] h-[20px]"
                          src={item.image}
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
              <div className="grid md:grid-cols-2 gap-0 my-5">
                {products.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center border-b border-b-customGray py-3"
                    >
                      <img
                        className="w-[20px] h-[20px]"
                        src={item.image}
                        alt=""
                      />
                      <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                        {item.title}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-12 md:col-span-12">
              <div className="text-center ">
                <button
                  className="py-2.5 px-8 border border-transparent rounded-[12px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                  onClick={handleClickBid}
                >
                  Start You Bid
                </button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="mt-10">
                <img
                  src={image.auto}
                  alt=""
                  className="md:w-[200px] w-[180px] h-full object-[initial]
                                inline-block"
                />
                {auto.map((item, index) => {
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
                })}
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
                    26,000 Miles
                  </span>
                </p>
              </div>
              <h5 className="text-[20px] text-customBlue font-normal mt-3">
                Decsription{" "}
              </h5>
              <p className="text-[16px] font-normal text-customDarkGray ">
                {text.item}
              </p>
            </div>
          </div>
          <div className="my-3">
            <h4 className="font-normal  text-customBlue  text-[24px] mb-5">
              Comments (3){" "}
            </h4>
            {userListingDetail.map((item, index) => {
              return (
                <div key={index} className="flex items-center mb-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[47px] h-[47px] inline-block object-contain"
                  />
                  <div className="mx-3">
                    <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                      {item.title}
                    </h5>
                    <p className="text-[13px] font-normal text-customDarkGray capitalize ">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between mt-3">
              <button
                type="submit"
                onClick={openModal}
                className=" flex justify-center md:py-2.5 md:px-10 py-2 px-5 rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
              >
                Write a comment
              </button>
              <button
                type="submit"
                onClick={openModals}
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
                <img
                  src={image.user}
                  alt=""
                  className="w-[47px] h-[47px] inline-block object-contain"
                />
                <div className="mx-3">
                  <h5 className="text-[16px] font-medium text-customBlue capitalize mb-1">
                    David Beckham
                  </h5>
                  <p className="text-[13px] font-normal text-customDarkGray capitalize ">
                    <img
                      className="w-[16px] h-[16px] inline-block object-contain mr-1 align-text-top"
                      src={image.star}
                      alt=""
                    />{" "}
                    4.9 (32 reviews)
                  </p>
                </div>
              </div>
              <div className="md:flex sm:flex inline-block">
                {contactList.map((item, index) => {
                  return (
                    <div
                      className="inline-block w-[140px] mx-2 "
                      onClick={openModalForm}
                    >
                      <div
                        key={index}
                        className="flex md:w-[140px] sm:w-[140px] w-[130px] mx-2 my-2 px-4 py-2 border cursor-pointer border-customGray rounded-[8px] bg-customBgButton
                                            items-center"
                      >
                        <img
                          className="w-[20px] h-[20px]"
                          src={item.image}
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
              We have been supplying the trade for over 35 years building many
              relationship on trust and integrity.
            </p>
            <div className="my-3 md:mx-10">
              <MapComponent />
            </div>
          </div>
        </section>
        {/* modal */}
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden
                z-10"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/2 max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                filters
              </h2>
              <div className="absolute right-3 top-4">
                <img
                  src={image.cross}
                  alt=""
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <form className="space-y-4">
                <label className="text-[16px] font-medium text-customDarkGray">
                  Your Rating
                </label>
                <RatingStar />
                {inputField?.map((field) => (
                  <CustomInput
                    key={field.id}
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
                    className=" flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          id="myModals"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden
                z-10"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/2 max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                Write a Comment
              </h2>
              <div className="absolute right-3 top-4">
                <img
                  src={image.cross}
                  alt=""
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={closeModals}
                />
              </div>
              <form className="space-y-4">
                <label
                  htmlFor="message"
                  className="text-[16px] font-medium text-customDarkGray"
                >
                  Comment
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                 border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Write a comment"
                ></textarea>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className=" flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          id="myModalForm"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden
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
                <img
                  src={image.cross}
                  alt=""
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={closeModalForm}
                />
              </div>
              <form className="space-y-4">
                {participateForm?.map((field) => (
                  <CustomInput
                    key={field.id}
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
                    onClick={handleClick}
                  >
                    Submit and Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
