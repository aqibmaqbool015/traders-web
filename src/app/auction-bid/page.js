"use client";

import { Image_base } from "@/networking/network";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { bidAmount } from "../constant";
import { vehicleById } from "../detail/api";

const image = {
  auto: "/auto.svg",
  clock: "/clock.svg",
  cross: "/cross-custom.svg",
  tick: "/tick.svg",
  bid: "bid-confirm.svg",
  line: "line.svg",
};

const SOCKET_SERVER_URL = "https://trade2trade.co.uk:5050/";

const Detail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVehicleDetail, setIsVehicleDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(250);
  const [customBid, setCustomBid] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [traderData, setTraderData] = useState([]);
  const [currentBidValue, setCurrentBidValue] = useState(0);
  const [totalBidArray, setTotalBidArray] = useState([]);

  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const socketSend = socketRef.current;
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.emit("getExistingBiddingData", [traderData._id]);
    socket.on("existingBiddingData", (data) => {
      if (data.success.toString() !== "false") {
        const listData = data?.data[0]?.bidding;
        setTotalBidArray(listData??[]);
        setCurrentBidValue(data?.data[0]?.currentBidPrice);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    });
    socket.on("bidEvent", (data) => {
      if (data.success.toString() !== "false") {
        const listData = data?.data?.data?.bidding;
        setTotalBidArray(listData??[]);
        setCurrentBidValue(data?.data?.data?.currentBidPrice);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [traderData?._id]);

  const bidEventAuction = async () => {
    socketSend.emit(
      "emitBid",
      traderData?.user_id?._id,
      traderData?._id,
      parseInt(selectedValue)
    );

    setCurrentBidValue(
      (prev) => parseFloat(prev) + parseInt(selectedValue, 10)
    );
    const params = {
      bidPrice: parseInt(selectedValue, 10),
    };
    setTotalBidArray((prev) => [...prev, params]);
    closeCommentModal();
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
    const data = localStorage.getItem("traderData");
    const JSONData = JSON.parse(data);
    if (data) {
      setTraderData(JSONData);
    }
  }, []);

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchGetVehicleDetail(id);
    }
  }, [pathname]);

  const handleButtonClick = (value) => {
    if (value === "Use custom bid") {
      setCustomBid(true);
      setSelectedValue();
    } else {
      setSelectedValue(value);
      setCustomBid(false);
    }
  };

  const handleCustomValueSubmit = () => {
    if (customValue) {
      setSelectedValue(parseInt(customValue));
      setCustomBid(false);
    }
  };

  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);

  return (
    <>
      <div className="md:px-8">
        <section className="mt-5 px-2 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-6">
              <Image
                src={
                  traderData?.pictures?.length > 0
                    ? `${Image_base}${traderData.pictures}`
                    : image.auto
                }
                width={100}
                height={100}
                alt=""
                className="w-full h-auto rounded-[8px] "
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="col-span-12 md:col-span-6">
                <div className="px-2 py-1">
                  <p className="md:text-[28px] text-[22px] text-customBlue font-medium ">
                    Mercedes X Class
                  </p>
                  <div className="flex justify-center items-start mt-5">
                    <div className="md:mx-10 mx-1">
                      <p className="md:text-[18px] text-[15px] text-customBlue font-medium ">
                        Starting Price
                      </p>
                      <h4 className="font-normal  text-customBlue text-[16px] my-2">
                        £ {traderData?.price}
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
                          {new Date(traderData?.auc_start_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                          {" - "}
                          {new Date(traderData?.auc_end_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="md:mx-10 mx-1">
                      <Image
                        src={image.line}
                        width={2}
                        height={2}
                        className="w-1 h-[100px] "
                        alt=""
                      />
                    </div>
                    <div className="md:mx-10 mx-1">
                      <p className="md:text-[18px] text-[15px] text-customBlue font-medium ">
                        Current Bid Price
                      </p>
                      <p className="text-customOrange text-[18px] my-2">
                        £ {currentBidValue}
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
                          {new Date(traderData?.auc_end_time).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="mt-1">
                  <div className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3">
                    <h5
                      className="text-[20px] text-black capitalize font-medium
                      relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2.5 before:h-2.5 before:bg-customOrange before:rounded-full before:transform before:-translate-y-1/2 pl-5"
                    >
                      Live Auction
                    </h5>
                    <h5 className="text-[16px] text-customBlackLight font-normal">
                      {totalBidArray?.length ?? 0} Bids made
                    </h5>
                  </div>
                  <div className="h-[180px] px-2 overflow-y-auto">
                    {totalBidArray?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between cursor-pointer items-center border-b border-b-customGray py-3"
                        >
                          <h5 className="text-[16px] text-customBlackLight capitalize font-normal">
                            Bidder#{index + 1}
                          </h5>
                          <h5 className="text-[16px] text-customDarkGray font-normal">
                            £ {item?.bidPrice}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center col-span-12">
            <div className=" my-10  ">
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
          </div>

          {isCommentModalOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
              <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
                <div className="p-4 relative text-center">
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
                    You have placed a bit for {selectedValue}. Should we place
                    this as your Bid?
                  </p>
                  <div className="">
                    <button
                      onClick={bidEventAuction}
                      className=" w-full py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-2"
                    >
                      Yes, Place My Bid
                    </button>
                    <button
                      className=" w-full py-2.5 px-12 rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent
                        border border-customBlue !mt-2"
                    >
                      Cancel
                    </button>
                  </div>
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

// "use client"
// import { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// // Replace with your actual environment variable
// const SOCKET_URL = "https://trade2trade.co.uk:5050/";
// // Define the structure of your BidData if needed
// const BidData = (data) => {
//   // Transform your data as required
//   return {
//     // Example fields
//     id: data.id,
//     amount: data.amount,
//     // Add other fields...
//   };
// };
// const BidComponent = () => {
//   const [allBidList, setAllBidList] = useState([]);
//   const [currentBidPrice, setCurrentBidPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef(null);
//   const socketRef = useRef(null);
//   const [traderData, setTraderData] = useState([]);

//   useEffect(() => {
//     const data = localStorage.getItem("traderData");
//     const JSONData = JSON.parse(data);
//     if (data) {
//       setTraderData(JSONData);
//     }
//   }, []);

//   useEffect(() => {
//     socketRef.current = io(SOCKET_URL, {
//       autoConnect: false,
//       transports: ['websocket'],
//     });
//     const socket = socketRef.current;
//     socket.on('connect', () => {
//       console.log('Connected to socket server');
//       setLoading(false);
//     });
//     socket.emit('getExistingBiddingData', [traderData._id]);
//     socket.on('existingBiddingData', (data) => {
//       if (data.success.toString() !== 'false') {
//         const listData = data.data[0].bidding;
//         setCurrentBidPrice(data.data[0].currentBidPrice);
//         const parsingList = listData.map((m) => BidData(m));
//         setAllBidList(parsingList);
//         setLoading(false);
//         setTimeout(() => {
//           if (scrollRef.current) {
//             scrollRef.current.scrollTo({
//               top: scrollRef.current.scrollHeight,
//               behavior: 'smooth',
//             });
//           }
//         }, 100);
//       }
//     });
//     socket.on('bidEvent', (data) => {
//       if (data.success.toString() !== 'false') {
//         const listData = data.data.data.bidding;
//         setCurrentBidPrice(data.data.data.currentBidPrice);
//         const parsingList = listData.map((m) => BidData(m));
//         setAllBidList(parsingList);
//         setLoading(false);
//         setTimeout(() => {
//           if (scrollRef.current) {
//             scrollRef.current.scrollTo({
//               top: scrollRef.current.scrollHeight,
//               behavior: 'smooth',
//             });
//           }
//         }, 100);
//       }
//     });
//     socket.on('disconnect', () => {
//       console.log('Disconnected from socket server');
//     });
//     socket.on('connect_error', (err) => {
//       console.error('Connection error:', err);
//     });
//     socket.on('error', (err) => {
//       console.error('Socket error:', err);
//     });
//     socket.connect();
//     return () => {
//       socket.disconnect();
//     };
//   }, [traderData?._id]);
//   return (
//     <div>
//       <div>
//         <h2>Current Bid Price: ${currentBidPrice}</h2>
//       </div>
//       <div
//         ref={scrollRef}
//         style={{
//           maxHeight: '400px',
//           overflowY: 'auto',
//           border: '1px solid #ccc',
//           padding: '10px',
//         }}
//       >
//         {allBidList.length === 0 ? (
//           <p>No bids yet.</p>
//         ) : (
//           allBidList.map((bid, index) => (
//             <div key={index} className="bid-item">
//               <p>
//                 <strong>Bidder:</strong> {bid.id}
//               </p>
//               <p>
//                 <strong>Amount:</strong> ${bid.bidPrice}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };
// export default BidComponent;
