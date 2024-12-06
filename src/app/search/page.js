"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VehicleCard } from "../components/VehicleCard";
import { allVehicles } from "../home/api";
import { searchTraderApi } from "./api";
import { Image_base } from "@/networking/network";

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
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchSearchApi = async (termsType) => {
    try {
      const response = await searchTraderApi(termsType, searchTerm, {
        page: currentPage,
        limit: rowsPerPage,
      });
      setVehicles((prev) => [...prev, ...(response?.data || [])]);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Search API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await allVehicles({
        page: currentPage,
        limit: rowsPerPage,
      });
      setVehicles((prev) => [...prev, ...(response?.data || [])]);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Vehicles API Error:", error);
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setVehicles([]);
    setCurrentPage(1);
    const termsType = openTab === 1 ? "vehicle" : "trader";
    setIsLoading(true);
    const fetchFunction = searchTerm ? fetchSearchApi : fetchVehicles;
    fetchFunction(termsType);
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const termsType = openTab === 1 ? "vehicle" : "trader";
      // setIsLoading(true);
      const fetchFunction = searchTerm ? fetchSearchApi : fetchVehicles;
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
    setDropdownOpen(false);
  };

  // function openModal() {
  //   document.getElementById("myModal").classList.remove("hidden");
  // }

  // function closeModal() {
  //   document.getElementById("myModal").classList.add("hidden");
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };

  return (
    <>
      <div className=" px-8">
        <section className="mt-4">
          <div className="md:flex sm:flex items-center space-x-2 p-2 mt-3 relative">
            <div className="relative flex items-center flex-1 rounded-[6px] border-2 border-customGray">
              <div className="md:flex sm:flex items-center space-x-2 p-2 relative w-full ">
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
            {/* <button
              className="bg-customBlue text-white py-2.5 px-4 rounded-md inline-flex mt-4 md:mt-0 sm:mt-0  md:flex items-center space-x-1"
              onClick={openModal}
            >
              <span>Filter</span>
              <Image src={image.filter} alt="img" className="w-[20px] h-auto" />
            </button> */}

            <button
              onClick={toggleDropdown}
              className="cursor-pointer relative appearance-none block px-8 pl-5 py-2.5 shadow-sm focus:outline-none bg-customBlue rounded-[8px] text-white"
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
            <div className={openTab === 1 ? "block" : "hidden"}>
              {isLoading ? (
                <p className="text-center">Loading...</p>
              ) : vehicles?.length === 0 ? (
                <p className="text-center">No data found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className={openTab === 2 ? "block" : "hidden"}>
              {isLoading ? (
                <p className="text-center">Loading...</p>
              ) : vehicles?.length === 0 ? (
                <p className="text-center">No data found</p>
              ) : (
                <div className="grid grid-cols-1bs gap-4 mt-4">
                  {vehicles.map((trader, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-customGrayLine pb-5 mb-3"
                    >
                      <Image
                        src={`${Image_base}${trader?.user_id?.profilePicture}`}
                        alt="img"
                        width={47}
                        height={47}
                        className="w-[47px] h-[47px] rounded-full object-cover"
                      />
                      <div className="mx-3">
                        <h5 className="text-[18px] font-medium text-black capitalize">
                          {trader?.user_id?.firstName}{" "}
                          {trader?.user_id?.lastName}
                        </h5>
                        <p className="text-[12px] font-medium text-customDarkGray capitalize">
                          {trader?.user_id?.companyName}
                        </p>
                        <p className="text-[12px] font-medium text-customDarkGray">
                          {trader?.user_id?.phone}
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
