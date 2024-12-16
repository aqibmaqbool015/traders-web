"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CarouselCar } from "../components/carouselCar";
import { bidAmount, bidButton, contact } from "../constant";
import { vehicleById } from "../detail/api";

const image = {
  auto: "/auto.svg",
  clock: "/clock.svg",
  cross: "/cross-custom.svg",
  tick: "/tick.svg",
  bid: "bid-confirm.svg",
};

const Detail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVehicleDetail, setIsVehicleDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("£250k");
  const [customBid, setCustomBid] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

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

  const handleButtonClick = (value) => {
    if (value === "Use custom bid") {
      setCustomBid(true);
      setSelectedValue("");
    } else {
      setSelectedValue(value);
      setCustomBid(false);
    }
  };

  const handleCustomValueSubmit = () => {
    if (customValue) {
      setSelectedValue(`£${customValue}`);
      setCustomBid(false);
    }
  };

  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);


  return (
    <>
      <div className="md:px-8">
        <section className="mt-5 px-2 py-6">
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
              <div className="col-span-12 md:col-span-6">
                <CarouselCar isVehicleDetail={isVehicleDetail} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="col-span-12 md:col-span-6">
                  <div className="px-2 py-1">
                    <p className="text-[28px] text-customBlue font-medium ">
                      Mercedes X Class
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[18px] text-customBlue font-normal ">
                          Starting Price
                        </p>
                        <h4 className="font-medium  text-customBlue text-[26px] my-3">
                          {isVehicleDetail?.model_id?.name}
                          {isVehicleDetail?.make_id?.title}
                        </h4>
                        <div className="flex items-center">
                          <Image
                            src={image.clock}
                            alt="img"
                            className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                            width={14}
                            height={14}
                          />
                          <p className="text-customSmallGray text-[13px] mx-2">
                            {/* {new Date(vehicle?.auc_start_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                          {"-"}
                          {new Date(vehicle?.auc_end_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )} */}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[18px] text-customBlue font-normal ">
                          Current Bid Price
                        </p>
                        <p className="text-customOrange text-[18px] my-3">
                          {isVehicleDetail?.price}
                        </p>
                        <div className="flex items-center">
                          <Image
                            src={image.clock}
                            alt="img"
                            className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                            width={14}
                            height={14}
                          />
                          <p className="text-customSmallGray text-[13px] mx-2">
                            {/* {new Date(vehicle?.auc_start_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                          {"-"}
                          {new Date(vehicle?.auc_end_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="mt-10">
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5
                        className="text-[20px] text-black capitalize font-medium
                      relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2.5 before:h-2.5 before:bg-customOrange before:rounded-full before:transform before:-translate-y-1/2 pl-5"
                      >
                        Live Auction
                      </h5>
                      <h5 className="text-[16px] text-customDarkGray font-normal">
                        £ {isVehicleDetail?.vehicle_status}
                      </h5>
                    </div>
                    <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                      <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                        Live Auction
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
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center col-span-12">
              <div className=" my-10">
                {bidAmount.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`inline-block min-w-[130px] py-2 px-3 border cursor-pointer rounded-[12px] shadow-sm text-sm font-normal mx-2 mt-5 lg:w-[180px] ${
                        selectedValue === item.text && !customBid
                          ? "bg-customOrange text-white"
                          : item.class
                      } ${
                        customBid && item.text !== "Use custom bid"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleButtonClick(item.text)}
                      disabled={customBid && item.text !== "Use custom bid"}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
              {customBid && (
                <div className="flex justify-center mt-6">
                  <input
                    type="number"
                    placeholder="£300k"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className="py-2.5 px-6 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent mx-3 w-[140px]"
                  />
                  <button
                    className="flex justify-center py-2.5 px-6 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue mx-3"
                    onClick={handleCustomValueSubmit}
                  >
                    <Image
                      src={image.tick}
                      alt="tick"
                      width={30}
                      height={30}
                      className="w-[20px] h-[20px] object-contain mx-2"
                    />
                  </button>
                  <button
                    className="flex justify-center py-2.5 px-6 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent mx-3"
                    onClick={() => {
                      setCustomBid(false);
                      setCustomValue("");
                    }}
                  >
                    <Image
                      src={image.cross}
                      alt="cross"
                      width={30}
                      height={30}
                      className="w-[20px] h-[20px] object-contain mx-2"
                    />
                  </button>
                </div>
              )}

              <button
                onClick={openCommentModal}
                className="text-center bg-customBlue rounded-[20px] text-white text-[16px] min-w-[180px] p-2 mt-6"
              >
                Place bid for {selectedValue}
              </button>

              {/* <div className="flex justify-center mt-6">
                <input
                  type="number"
                  placeholder="£300k"
                  className="py-2.5 px-6 border border-customBlue rounded-[25px] md:min-w-[140px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-2 mx-3
                  w-[140px]"
                />
                <button className="flex justify-center py-2.5 px-6 border border-transparent rounded-[25px] md:min-w-[140px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-2 mx-3">
                  <Image
                    src={image.tick}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[20px] h-[20px] object-contain mx-2 "
                  />
                </button>
                <button className="flex justify-center py-2.5 px-6 border border-customBlue rounded-[25px] md:min-w-[140px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-2 mx-3">
                  <Image
                    src={image.cross}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[20px] h-[20px] object-contain mx-2 "
                  />
                </button>
              </div> */}
            </div>
          </>
          {/* ) : (
            <p>No vehicle details available</p>
          )} */}

          {isCommentModalOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
              <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
                <div className="p-4 relative">
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
                  <form className="space-y-4 text-center mt-8">
                    <Image
                      src={image.bid}
                      alt=""
                      width={70}
                      height={70}
                      className="w-[80px] h-[auto] object-contain my-1 inline-block "
                    />
                    <p className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                      Confirm Bid
                    </p>
                    <p className="my-1 text-[16px] text-customDarkGray font-normal">
                      You have placed a bit for {selectedValue}. Should we place this as
                      your Bid?
                    </p>
                    <div className="">
                      <button
                        type="submit"
                        className=" w-full py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-2"
                      >
                        Yes, Place My Bid
                        {/* {loading ? "Submitting..." : "Submit"} */}
                      </button>
                      <button
                        className=" w-full py-2.5 px-12 rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent
                        border border-customBlue !mt-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Detail;
