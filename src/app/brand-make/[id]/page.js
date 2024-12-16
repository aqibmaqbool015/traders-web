"use client";

import { getSearchByBrandApi, getVehicleByMakeApi } from "../api";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Image_base } from "@/networking/network";

const image = {
  vehicle: "/vehicle-profile.png",
  search: "/search-1.svg",
};

const BrandMake = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isBrandsMake, setIsBrandsMake] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const id = pathname.split("/")[2];
    if (id) {
      fetchGetVehicleDetail(id);
    }
  }, [pathname]);

  // Fetch vehicle details
  const fetchGetVehicleDetail = async (id) => {
    setIsLoading(true);
    try {
      const response = await getVehicleByMakeApi(id, {
        page: currentPage,
        limit: rowsPerPage,
      });
      setIsBrandsMake((prev) =>
        currentPage === 1 ? response?.data : [...prev, ...response?.data]
      );
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Vehicles API Error:", error);
      setIsBrandsMake([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchApi = async (id) => {
    setIsLoading(true);
    try {
      const response = await getSearchByBrandApi(id, searchTerm, {
        page: currentPage,
        limit: rowsPerPage,
      });
      setIsBrandsMake((prev) =>
        currentPage === 1 ? response?.data : [...prev, ...response?.data]
      );
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Search API Error:", error);
      setIsBrandsMake([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input changes
  const handleSearch = () => {
    const id = pathname.split("/")[2];
    setIsBrandsMake([]);
    setCurrentPage(1);
    const fetchFunction = searchTerm ? fetchSearchApi : fetchGetVehicleDetail;
    fetchFunction(id);
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const id = pathname.split("/")[2];
      const fetchFunction = searchTerm ? fetchSearchApi : fetchGetVehicleDetail;
      fetchFunction(id);
    }
  };



  const handleClick = (id) => {
    router.push(`/detail/${id}`);
  };

  return (
    <>
      <div className="md:mx-24 my-10">
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
        {isLoading ? (
          <>
            <div className="w-full text-center my-5 flex justify-center">
              <p className="text-center  animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
            </div>
          </>
        ) : isBrandsMake?.length === 0 ? (
          <p className="text-center text-customBlue">No Brands available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isBrandsMake?.map((brand, index) => (
              <div
                key={index}
                className="rounded overflow-hidden gap-2 my-3 cursor-pointer"
              >
                <div>
                  <Image
                    className="w-full h-[250px] object-[initial] rounded-[8px]"
                    src={
                      brand?.pictures?.length > 0
                        ? `${Image_base}${brand?.pictures[0]}`
                        : image.vehicle
                    }
                    alt="Vehicle"
                    width={200}
                    height={280}
                    onClick={() => handleClick(brand._id)}
                  />
                </div>
                <div className="px-2 py-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-customOrange md:text-[22px] text-[18px] ">
                      £ {brand?.price}
                    </h4>
                  </div>
                  <p className="text-customBlackLight md:text-[18px] text-[16px] ">
                    {brand?.model_id?.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-customDarkGray text-[15px]">
                      {brand?.year || "2014"} - {brand?.mileage || "167,453"} Km
                    </p>
                    <p className="text-customDarkGray text-[14px]">
                      {brand?.make_id?.createdAt
                        ? new Date(
                            brand?.make_id?.createdAt
                          ).toLocaleDateString("en-GB")
                        : "7 days ago"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </>
  );
};

export default BrandMake;
