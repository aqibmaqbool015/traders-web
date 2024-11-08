"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userListing } from "../constant";
import { searchTraderApi } from "../search/api";
import { useEffect, useState } from "react";

const BASE_URL = "https://t2tcorebucket.s3.eu-west-2.amazonaws.com";

const TraderPage = ({ trader }) => {
  const router = useRouter();
  const [searchTrader, setSearchTrader] = useState();

  useEffect(() => {
    // fetchTraderSearch();
  }, []);

  const fetchTraderSearch = async () => {
    try {
      const data = await searchTraderApi();
      console.log(data, "ooooooooo");
    } catch (err) {
      console.error("Error fetching Trader:", err);
      setSearchTrader([]);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Vehicle") {
      router.push("/search");
    }
  };

  const image = {
    search: "/search-1.svg",
    filter: "/filter.svg",
    arrow: "/down-arrow.png",
    cross: "/cross.svg",
    crossBlue: "/cross-custom.svg",
    user1: "/user1.png",
    user2: "/user2.png",
    user3: "/user3.png",
    user4: "/user4.png",
    user5: "/user5.png",
  };

  return (
    <>
      <div className=" px-8">
        <section className="mt-4">
          <div className="md:flex sm:flex items-center space-x-2 p-2 mt-3 ">
            <div className="relative flex items-center flex-1 py-1 rounded-[6px] border-2 border-customGray">
              <Link href="#" className="w-[100%] rounded-[6px]">
                <input
                  type="text"
                  placeholder="Toyota model 2019"
                  className="pl-4 pr-4 py-2 border-none focus:outline-none w-[100%] rounded-[10px] "
                />
              </Link>

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
            <div className="flex mt-4 md:mt-0 sm:mt-0">
              <button
                className="bg-customBlue text-white py-2.5 px-4 rounded-md inline-flex mt-0 md:mt-0 sm:mt-0  md:flex items-center space-x-1
                            mx-4 md:mx-2"
              >
                <span>Filter</span>
                <img src={image.filter} alt="" className="w-[20px] h-auto" />
              </button>
              {/* <button className="bg-customBlue text-white py-2.5 px-4 rounded-md inline-flex mt-4 md:mt-0 sm:mt-0 md:flex items-center space-x-1">
                            <span>Vehicle</span>
                            <img src={image.arrow} alt="" className="w-[20px] h-auto" />
                        </button> */}
              <div className="relative md:mx-0 mx-2">
                <select
                  className="cursor-pointer appearance-none block px-8 pl-5 py-2.5 shadow-sm focus:outline-none bg-customBlue rounded-[8px] text-white"
                  id="grid-state"
                  onChange={handleSelectChange}
                >
                  <option value="Trader">Trader</option>
                  <option value="Vehicle">Vehicle</option>
                </select>
                <div className="absolute ml-5 inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 px-2">
          {/* {userListing.map((item, index) => {
            return ( */}
          <div className="flex items-center border-b border-customGrayLine pb-5 mb-3">
            <img
              src={
                `${BASE_URL}${trader?.user_id?.profilePicture}` || image.user1
              }
              alt=""
              className="w-[47px] h-[47px] inline-block object-contain"
            />
            <div className="mx-3">
              <h5 className="text-[18px] font-medium text-black capitalize ">
                {trader?.user_id?.firstName || "John"}

                {trader?.user_id?.lastName || "Doe"}
              </h5>
              <p className="text-[12px] font-medium text-customDarkGray capitalize ">
                {trader?.user_id?.companyName || "Caru Automotive"}
              </p>
            </div>
          </div>
          {/* );
          })} */}
          <div className="text-center my-5">
            <button
              className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize
                                                text-[16px] font-medium "
            >
              show more
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TraderPage;
