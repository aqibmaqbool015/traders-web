"use client";
import Link from "next/link";
import { VehicleCard } from "../components/VehicleCard";
import CustomInput from "../components/input";
import { useEffect, useState } from "react";
import { SelectInput } from "../components/select";
import { allVehicles } from "../home/api";
import { searchTraderApi } from "./api";

const BASE_URL = "https://t2tcorebucket.s3.eu-west-2.amazonaws.com";

const image = {
  search: "/search-1.svg",
  filter: "/filter.svg",
  arrow: "/down-arrow.png",
  cross: "/cross.svg",
  crossBlue: "/cross-custom.svg",
  user1: "/user1.png",
};

const inputFields = [
  {
    label: "Search Terms",
    type: "text",
    id: "search",
    name: "search",
    placeholder: "Search description keywords",
    labelClass: "text-[17px] text-customDarkGray",
  },
  {
    label: "Make",
    type: "text",
    id: "make",
    name: "make",
    placeholder: "Make",
    labelClass: "text-[17px] text-customDarkGray",
  },
];

const SearchPage = () => {
  // const fuelOptions = ["Petrol", "Diesel", "Electric"];
  // const transmissionOptions = ["Manual", "Automatic"];
  // const bodyTypeOptions = ["Hatchback", "Sedan", "SUV"];
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      const termsType = openTab === 1 ? "vehicle" : "trader";
      setIsLoading(true);
      const fetchFunction = searchTerm ? fetchSearchApi : fetchVehicles;
      fetchFunction(termsType);
    }, 300);
    return () => clearTimeout(fetchData);
  }, [searchTerm, currentPage, openTab]);

  const fetchSearchApi = async (termsType) => {
    try {
      const response = await searchTraderApi(termsType, searchTerm, {
        page: currentPage,
        limit: rowsPerPage,
      });
      setVehicles(response?.data || []);
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
      setVehicles(response?.data || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Vehicles API Error:", error);
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
            <div className="relative flex items-center flex-1 py-1 rounded-[6px] border-2 border-customGray">
              <div className="w-[100%] rounded-[6px]">
                <input
                  type="text"
                  placeholder="Enter trader's first name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // onChange={handleChangeInput}
                  className="pl-4 pr-4 py-2 border-none shadow-none !outline-none active:outline-none border-transparent focus:outline-none w-[100%] rounded-[10px]"
                />
              </div>
              <div className="absolute right-12 ">
                <img
                  src={image.search}
                  alt=""
                  className="w-[18px] h-auto cursor-pointer"
                />
              </div>
              <div className="absolute right-3 ">
                <img
                  src={image.cross}
                  alt=""
                  className="w-[18px] h-auto cursor-pointer"
                />
              </div>
            </div>
            {/* <button
              className="bg-customBlue text-white py-2.5 px-4 rounded-md inline-flex mt-4 md:mt-0 sm:mt-0  md:flex items-center space-x-1"
              onClick={openModal}
            >
              <span>Filter</span>
              <img src={image.filter} alt="" className="w-[20px] h-auto" />
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
                {currentPage < totalPages && !isLoading && (
                  <button
                    onClick={handleShowMore}
                    className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium"
                  >
                    show more
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
                      <img
                        src={`${BASE_URL}${trader?.user_id?.profilePicture}`}
                        alt=""
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
                {currentPage < totalPages && !isLoading && (
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

      {/* modal */}
      {/* <div
        id="myModal"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/2 max-h-[90vh] overflow-y-auto">
          <div className="p-4 relative">
            <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
              filters
            </h2>
            <div className="absolute right-3 top-4">
              <img
                src={image.crossBlue}
                alt=""
                className="w-[15px] h-auto cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <form className="space-y-4 md:px-4">
              {inputFields.map((field) => (
                <CustomInput
                  key={field.id}
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formValues[field.name]}
                  labelClass={field.labelClass}
                  onChange={handleInputChange}
                />
              ))}
              <SelectInput
                label="Model"
                placeholder="Model"
                option="Model"
                option1="two"
                labelClass="text-[17px] text-customDarkGray"
                options={fuelOptions}
              />
              <SelectInput
                label="Type"
                placeholder="Type"
                option="Type"
                option1="two"
                labelClass="text-[17px] text-customDarkGray"
                options={transmissionOptions}
              />

              <div className="grid grid-cols-2 gap-2 !mt-0">
                <CustomInput
                  label="Year"
                  type="text"
                  name="year"
                  placeholder="Enter Year"
                  labelClass="text-[17px] text-customDarkGray"
                  onChange={handleInputChange}
                />

                <SelectInput
                  label="Fuel"
                  placeholder="Fuel Type"
                  option="Fuel Type"
                  option1="two"
                  className="col-span-12 sm:col-span-6"
                  labelClass="text-[17px] text-customDarkGray"
                  options={bodyTypeOptions}
                />
                <CustomInput
                  label="Min Price"
                  type="text"
                  name="price"
                  placeholder="Enter Min Price"
                  labelClass="text-[17px] text-customDarkGray"
                  onChange={handleInputChange}
                />
                <CustomInput
                  label="Mileage"
                  type="text"
                  name="milega"
                  placeholder="Enter Mileage"
                  labelClass="text-[17px] text-customDarkGray"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className=" flex justify-center py-2.5 px-10 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className=" flex justify-center py-2.5 px-10 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
                >
                  Filter
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" flex justify-center py-2.5 px-12 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customOrange !mt-2"
                >
                  Save as Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SearchPage;
