"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VehicleCard } from "../components/VehicleCard";
import { allVehicles } from "../home/api";
import { searchTraderApi } from "./api";
import { Image_base } from "@/networking/network";
import { useRouter } from "next/navigation";

const image = {
  search: "/search-1.svg",
  filter: "/filter.svg",
  arrow: "/down-arrow.png",
  cross: "/cross.svg",
  crossBlue: "/cross-custom.svg",
  user1: "/user1.png",
};

// const inputFields = [
//   {
//     label: "Search Terms",
//     type: "text",
//     id: "search",
//     name: "search",
//     placeholder: "Search description keywords",
//     labelClass: "text-[17px] text-customDarkGray",
//   },
//   {
//     label: "Make",
//     type: "text",
//     id: "make",
//     name: "make",
//     placeholder: "Make",
//     labelClass: "text-[17px] text-customDarkGray",
//   },
// ];

const SearchPage = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [trader, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   fetchVehicles();
  // }, []);

  // const fetchVehicles = async () => {
  //   try {
  //     const response = await allVehicles({
  //       page: currentPage,
  //       limit: rowsPerPage,
  //     });
  //     setVehicles(response?.data);
  //     setTotalPages(response?.totalPages || 1);
  //   } catch (error) {
  //     console.error("Vehicles API Error:", error);
  //     setVehicles([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchSearchApi = async (termsType) => {
    try {
      const response = await searchTraderApi(termsType, searchTerm, {
        page: currentPage,
        limit: rowsPerPage,
      });
      if (termsType === "vehicle") {
        setVehicles(response?.data);
        setTotalPages(response?.totalPages || 1);
        return;
      }
      setTraders(response?.data);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Search API Error:", error);
    } finally {
      setIsLoading(false);
      // setLoading(false);
    }
  };

  const handleSearch = () => {
    setVehicles([]);
    setCurrentPage(1);
    const termsType = openTab === 1 ? "vehicle" : "trader";
    setIsLoading(true);
    const fetchFunction = fetchSearchApi;
    fetchFunction(termsType);
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const termsType = openTab === 1 ? "vehicle" : "trader";
      const fetchFunction = fetchSearchApi;
      fetchFunction(termsType);
    }
  };

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTabSelect = (tab) => {
    setOpenTab(tab);
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleCLickDetail = (trader) => {
    const data = JSON.stringify(trader);
    localStorage.setItem("traderData", data);
    router.push(`/trader-detail/${trader._id}`);
  };

  return (
    <>
      <div className=" px-4 md:px-8">
        <section className="mt-4">
          <div className="flex items-center space-x-2 p-2 mt-3 relative">
            <div className="relative flex items-center flex-1 rounded-[6px] border-2 border-customGray">
              <div className="flex items-center space-x-2 p-2 relative w-full ">
                <div className="relative flex items-center flex-1 ">
                  <input
                    type="search"
                    placeholder="Enter trader's first name"
                    value={searchTerm}
                    onChange={handleChangeInput}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-1 border-none shadow-none outline-none w-[100%] rounded-[10px]"
                  />
                </div>
                <Image
                  src={image.search}
                  className=" inline-block object-contain w-[20px] h-[20px] cursor-pointer "
                  alt=""
                  width={40}
                  height={40}
                  onClick={handleSearch}
                />
              </div>
            </div>
            <button
              onClick={toggleDropdown}
              className="cursor-pointer relative appearance-none block md:px-8 px-6 pl-5 py-2.5 shadow-sm focus:outline-none bg-customBlue rounded-[8px] text-white"
            >
              {openTab === 1 ? "Vehicle" : "Traders"}
              <span className="absolute top-4 right-0 flex items-center z-20 px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            {dropdownOpen && (
              <ul
                className="absolute z-10 mt-32 bg-white shadow-lg rounded-md right-4"
                role="tablist"
              >
                <li
                  className="text-center cursor-pointer px-4 py-2 hover:bg-customBg"
                  onClick={() => handleTabSelect(1)}
                >
                  Vehicle
                </li>
                <li
                  className="text-center cursor-pointer px-4 py-2 hover:bg-customBg"
                  onClick={() => handleTabSelect(2)}
                >
                  Traders
                </li>
              </ul>
            )}
          </div>
        </section>
        <section className="mt-4 md:mx-10">
          <div className="tab-content tab-space">
            <div
              className={
                openTab === 1 ? " text-center flex justify-center" : "hidden"
              }
            >
              {isLoading ? (
                <>
                  <p className="text-center my-5 flex justify-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
                  {/* {isLoading ? (
                    <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></span>
                  ) : null} */}
                </>
              ) : vehicles?.length === 0 ? (
                <p className="text-center">{/* No data found */}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {vehicles?.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} />
                  ))}
                </div>
              )}
              <div className="text-center my-5">
                {currentPage < totalPages && (
                  <button
                    onClick={handleShowMore}
                    className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
            <div
              className={
                openTab === 2 ? " flex text-center justify-center" : " hidden"
              }
            >
              {isLoading ? (
                <p className="text-center my-5 flex justify-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
              ) : trader?.length === 0 ? (
                <p className="text-center">{/* No data found */}</p>
              ) : (
                <div className="grid grid-cols-1bs gap-4 mt-4 text-left w-full ">
                  {trader?.map((trader, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-customGrayLine pb-5 mb-3 cursor-pointer "
                      onClick={() => handleCLickDetail(trader)}
                    >
                      <Image
                        src={`${Image_base}${trader?.profilePicture}`}
                        alt="img"
                        width={47}
                        height={47}
                        className="w-[47px] h-[47px] rounded-full object-cover"
                      />
                      <div className="mx-3">
                        <h5 className="text-[18px] font-medium text-black capitalize">
                          {trader?.firstName} {trader?.lastName}
                        </h5>
                        <p className="text-[12px] font-medium text-customDarkGray capitalize">
                          {trader?.companyName}
                        </p>
                        <p className="text-[12px] font-medium text-customDarkGray">
                          {trader?.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center my-5">
                {currentPage < totalPages && (
                  <button
                    onClick={handleShowMore}
                    className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchPage;
