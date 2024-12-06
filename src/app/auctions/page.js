"use client";
import Link from "next/link";
import {
  AuctionsCardAll,
  AuctionsCardLive,
  AuctionsCardTabs,
  AuctionsCardWon,
  VehicleCard,
} from "../components/VehicleCard";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  allVehicles,
  getAllAuctionApi,
  getAllInterestedApi,
  getAllUserBidApi,
  getAllUserWonApi,
  getAuctionSearchApi,
  getLiveAuctionApi,
} from "./api";

const image = {
  search: "/search-alert.svg",
  filter: "/filter.svg",
  arrow: "/down-arrow.png",
  cross: "/cross.svg",
  crossBlue: "/cross-custom.svg",
};

const Auctions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openTab, setOpenTab] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [auctionLive, setAuctionLive] = useState([]);
  const [auctionInterested, setAuctionInterested] = useState([]);
  const [auctionBid, setAuctionBid] = useState([]);
  const [auctionWon, setAuctionWon] = useState([]);
  const [allAuction, setAllAuction] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   const id = pathname.split("/")[2];
  //   if (id) {
  //     fetchGetAllAuctions();
  //   }
  // }, [pathname]);
  useEffect(() => {
    fetchGetAllAuctions();
  }, []);

  const fetchGetAllAuctions = async () => {
    setIsLoading(true);
    try {
      const response = await getAllAuctionApi();
      // {
      //   page: currentPage,
      //   limit: rowsPerPage,
      // }
      setAllAuction((prev) =>
        currentPage === 1 ? response?.data : [...prev, ...response?.data]
      );
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Vehicles API Error:", error);
      setAllAuction([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchApi = async () => {
    setIsLoading(true);
    try {
      const response = await getAuctionSearchApi(searchTerm, {
        term: searchTerm,
        search: currentPage,
      });
      console.log("search---------", response);

      setAllAuction((prev) =>
        currentPage === 1 ? response?.data : [...prev, ...response?.data]
      );
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Search API Error:", error);
      setAllAuction([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const id = pathname.split("/")[2];
    setAllAuction([]);
    setCurrentPage(1);
    const fetchFunction = searchTerm ? fetchSearchApi : fetchGetAllAuctions;
    fetchFunction(id);
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const id = pathname.split("/")[2];
      const fetchFunction = searchTerm ? fetchSearchApi : fetchGetAllAuctions;
      fetchFunction(id);
    }
  };

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchGetAllAuctions(id);
    }
  }, [pathname]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await allVehicles();
      if (data?.data) {
        setVehicles(data?.data);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setVehicles([]);
    }
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
  useEffect(() => {
    fetchAuctionsLive();
  }, []);

  const fetchAuctionsLive = async () => {
    try {
      const data = await getLiveAuctionApi();
      console.log("auctions----------------", data);

      if (data?.data) {
        setAuctionLive(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Auction:", err);
      setAuctionLive([]);
    }
  };
  useEffect(() => {
    fetchAuctionsInterested();
  }, []);
  const fetchAuctionsInterested = async () => {
    try {
      const data = await getAllInterestedApi();
      console.log("Interested----------------", data);

      if (data?.data) {
        setAuctionInterested(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionInterested([]);
    }
  };

  useEffect(() => {
    fetchAuctionsBid();
  }, []);
  const fetchAuctionsBid = async () => {
    try {
      const data = await getAllUserBidApi();
      console.log("Bid----------------", data);
      //

      if (data?.data) {
        setAuctionBid(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionBid([]);
    }
  };

  useEffect(() => {
    fetchAuctionsWon();
  }, []);
  const fetchAuctionsWon = async () => {
    try {
      const data = await getAllUserWonApi();
      console.log("Won----------------", data);

      if (data?.data) {
        setAuctionWon(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionWon([]);
    }
  };
  // const handleShowMoreVehicle = () => {
  //   setVisibleVehicle((prev) => prev + 15);
  // };
  // const handleShowLessVehicle = () => {
  //   setVisibleVehicle(15);
  // };
  // const handleSelectChange = (event) => {
  //   const selectedOption = event.target.value;

  //   if (selectedOption === "Trader") {
  //     router.push("/trader");
  //   }
  // };

  return (
    <>
      <div className=" px-8">
        <section className="mt-4">
          <div className="md:flex sm:flex items-center space-x-2 p-2 mt-3 ">
            <div className="relative flex items-center flex-1 rounded-[6px] border-2 border-customGray my-8">
              <div className="md:flex sm:flex items-center space-x-2 p-2 relative w-full">
                <input
                  type="search"
                  placeholder="Enter trader's first name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1 border-none shadow-none outline-none w-[100%] rounded-[10px]"
                />
                <Image
                  src={image.search}
                  className="inline-block object-contain w-[20px] h-[20px] cursor-pointer"
                  alt="Search"
                  width={40}
                  height={40}
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-4 md:mx-10">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] relative  " +
                  (openTab === 1
                    ? " text-customBlue bg-transparent border border-customBlue"
                    : "text-customDarkGray bg-transparent border border-customDarkGray")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                All
              </a>
            </li>
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] relative  " +
                  (openTab === 2
                    ? " text-white bg-customRed relative before:content-[''] before:absolute before:left-9 before:top-[19px] before:w-2 before:h-2 before:bg-white before:rounded-full before:transform before:-translate-y-1/2 pl-5"
                    : "text-customRed bg-transparent border border-customRed relative before:content-[''] before:absolute before:left-9 before:top-[19px] before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2 pl-5")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Live
              </a>
            </li>
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                  (openTab === 3
                    ? " text-customBlue bg-transparent border border-customBlue"
                    : "text-customDarkGray bg-transparent border border-customDarkGray")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Interested
              </a>
            </li>
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                  (openTab === 4
                    ? " text-customBlue bg-transparent border border-customBlue"
                    : "text-customDarkGray bg-transparent border border-customDarkGray")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                My Bids
              </a>
            </li>
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                  (openTab === 5
                    ? " text-customBlue bg-transparent border border-customBlue"
                    : "text-customDarkGray bg-transparent border border-customDarkGray")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                Won
              </a>
            </li>
            <li className="-mb-px last:mr-0 text-center mx-2 my-2">
              <a
                className={
                  "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                  (openTab === 6
                    ? " text-customBlue bg-transparent border border-customBlue"
                    : "text-customDarkGray bg-transparent border border-customDarkGray")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
                data-toggle="tab"
                href="#link6"
                role="tablist"
              >
                My Vehicle
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allAuction?.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No Auctions available
                      </p>
                    ) : (
                      <>
                        {allAuction?.map((auction, index) => (
                          <AuctionsCardAll key={index} auction={auction} />
                        ))}
                      </>
                    )}
                  </div>
                  <div className="text-center my-5">
                    {currentPage < totalPages && (
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
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auctionLive?.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No Live Auctions available
                      </p>
                    ) : (
                      auctionLive?.map((auction, index) => (
                        <AuctionsCardAll key={index} auction={auction} />
                      ))
                    )}
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auctionInterested?.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No Interested Auctions available
                      </p>
                    ) : (
                      auctionInterested?.map((vehcile, index) => (
                        <AuctionsCardTabs key={index} vehcile={vehcile} />
                      ))
                    )}
                  </div>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auctionBid?.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No Bid Auctions available
                      </p>
                    ) : (
                      auctionBid?.map((vehcile, index) => (
                        <AuctionsCardTabs key={index} vehcile={vehcile} />
                      ))
                    )}
                  </div>
                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auctionWon?.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No Won Auctions available
                      </p>
                    ) : (
                      auctionWon?.map((vehcile, index) => (
                        <AuctionsCardWon key={index} vehcile={vehcile} />
                      ))
                    )}
                  </div>
                </div>
                <div className={openTab === 6 ? "block" : "hidden"} id="link6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicles.length === 0 ? (
                      <p className="text-center text-customBlue">
                        No vehicles available
                      </p>
                    ) : (
                      <>
                        {vehicles?.map((vehicle, index) => (
                          <VehicleCard key={index} vehicle={vehicle} />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="text-center my-5">
            <button className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium">
              show more
            </button>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default Auctions;
