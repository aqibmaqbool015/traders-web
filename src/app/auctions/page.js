"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AuctionsCardAll,
  AuctionsCardTabs,
  AuctionsCardWon,
  VehicleCard,
} from "../components/VehicleCard";
import {
  allVehicles,
  getAllAuctionApi,
  getAllInterestedApi,
  getAllUserBidApi,
  getAllUserWonApi,
  getAuctionSearchApi,
  getLiveAuctionApi,
} from "./api";
import { getUserPostsApi } from "../user-profile/api";

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
  const [showLoading, setShowLoading] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGetAllAuctions();
  }, []);

  const fetchGetAllAuctions = async (page) => {
    setIsLoading(true);
    try {
      const data = await getAllAuctionApi({
        page: page ?? 1,
        limit: rowsPerPage ?? newPage,
      });
      setShowLoading(false);
      if (data?.data) {
        setAllAuction(data?.data);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.error("Auctions API Error:", error);
      setAllAuction([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchMore = async (page) => {
    setIsLoading(true);
    try {
      const data = await getAllAuctionApi({
        page,
        limit: rowsPerPage ?? newPage,
      });
      setShowLoading(false);
      if (data?.data) {
        setAllAuction((prevVehicles) => [...prevVehicles, ...data?.data]);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.error("Auctions API Error:", error);
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
    setAllAuction([]);
    setCurrentPage(1);
    setOpenTab(1);
    searchTerm ? fetchSearchApi() : fetchGetAllAuctions(1);
  };

  const handleShowMore = () => {
    setShowLoading(true);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      searchTerm ? fetchSearchApi() : onSearchMore(currentPage + 1);
    }
    setShowLoading(false);
  };

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchGetAllAuctions(id);
    }
  }, [pathname]);

  const onPressTab2 = async () => {
    setTabLoading(true);
    try {
      const data = await getLiveAuctionApi();

      if (data?.data) {
        setAuctionLive(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Auction:", err);
      setAuctionLive([]);
    }
    setTabLoading(false);
  };

  const onPressTab3 = async () => {
    try {
      const data = await getAllInterestedApi();
      if (data?.data) {
        setAuctionInterested(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionInterested([]);
    }
  };

  const onPressTab4 = async () => {
    try {
      const data = await getAllUserBidApi();
      if (data?.data) {
        setAuctionBid(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionBid([]);
    }
  };

  const onPressTab5 = async () => {
    try {
      const data = await getAllUserWonApi();
      if (data?.data) {
        setAuctionWon(data?.data);
      }
    } catch (err) {
      console.error("Error fetching Interested:", err);
      setAuctionWon([]);
    }
  };

  const onPressTab6 = async () => {
    try {
      const data = await getUserPostsApi();
      if (data?.data) {
        setVehicles(data?.data);
      }
    } catch (err) {
      setVehicles([]);
    }
  };

  const onHandleTabChange = (tab) => {
    setOpenTab(tab);
    if (tab === 1) {
      setAllAuction([]);
      fetchGetAllAuctions(1);
    }
    if (tab === 2) {
      onPressTab2();
    }
    if (tab === 3) {
      onPressTab3();
    }
    if (tab === 4) {
      onPressTab4();
    }
    if (tab === 5) {
      onPressTab5();
    }
    if (tab === 6) {
      onPressTab6();
    }
  };

  return (
    <>
      <div className=" md:px-8 px-4 ">
        <section className="mt-4">
          <div className="md:flex sm:flex items-center space-x-2 p-2 mt-3 ">
            <div className="relative flex items-center flex-1 rounded-[6px] border-2 border-customGray my-8">
              <div className="md:flex sm:flex items-center space-x-2 p-2 relative w-full">
                <input
                  type="search"
                  placeholder="Search Auctions List"
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
                  onHandleTabChange(1);
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
                  onHandleTabChange(2);
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
                  onHandleTabChange(3);
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
                  onHandleTabChange(4);
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
                  onHandleTabChange(5);
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
                  onHandleTabChange(6);
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
                <div
                  className={
                    openTab === 1 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link1"
                >
                  {allAuction?.length === 0 ? (
                    <>
                      <p className="text-center my-5 flex justify-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                    </>
                  ) : (
                    <div className="md:mx-6 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {allAuction?.map((auction, index) => (
                          <AuctionsCardAll key={index} auction={auction} />
                        ))}
                      </div>
                      {allAuction?.length < totalPages * rowsPerPage && (
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
                    openTab === 2 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link2"
                >
                  {tabLoading && !auctionLive?.length ? (
                    <p className="text-center my-5 animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                  ) : auctionLive?.length === 0 ? (
                    <p className="text-center text-customBlue my-5">
                      Live vehicles not found.
                    </p>
                  ) : (
                    <div className="md:mx-6 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {auctionLive?.map((auction, index) => (
                          <AuctionsCardAll key={index} auction={auction} />
                        ))}
                      </div>
                      {auctionLive?.length < totalPages * rowsPerPage && (
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
                    openTab === 3 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link3"
                >
                  {tabLoading && !auctionInterested.length ? (
                    <p className="text-center my-5 animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 "></p>
                  ) : auctionInterested?.length === 0 ? (
                    <p className="text-center text-customBlue my-5">
                      Interested vehicles not found.
                    </p>
                  ) : (
                    <div className="md:mx-6 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {auctionInterested?.map((auction, index) => (
                          <AuctionsCardTabs key={index} auction={auction} />
                        ))}
                      </div>
                      {auctionInterested?.length < totalPages * rowsPerPage && (
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
                    openTab === 4 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link4"
                >
                  {tabLoading && !auctionBid?.length ? (
                    <p className="text-center my-5  animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                  ) : auctionBid?.length === 0 ? (
                    <p className="text-center text-customBlue my-5">
                      Bid vehicles not found.
                    </p>
                  ) : (
                    <div className="md:mx-6 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {auctionBid?.map((auction, index) => (
                          <AuctionsCardTabs key={index} auction={auction} />
                        ))}
                      </div>
                      {auctionBid?.length < totalPages * rowsPerPage && (
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
                    openTab === 5 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link5"
                >
                  {tabLoading && !auctionWon?.length ? (
                    <p className="text-center my-5  animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                  ) : auctionWon?.length === 0 ? (
                    <p className="text-center text-customBlue my-5">
                      Won vehicles not found.
                    </p>
                  ) : (
                    <div className="md:mx-6 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {auctionWon?.map((auction, index) => (
                          <AuctionsCardWon key={index} auction={auction} />
                        ))}
                      </div>
                      {auctionWon?.length < totalPages * rowsPerPage && (
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
                    openTab === 6 ? "text-center flex justify-center" : "hidden"
                  }
                  id="link6"
                >
                  {tabLoading && !vehicles?.length ? (
                    <p className="text-center my-5 animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                  ) : vehicles?.length === 0 ? (
                    <p className="text-center text-customBlue my-5">
                      My vehicles not found.
                    </p>
                  ) : (
                    <div className="md:mx-6 w-full">
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Auctions;
