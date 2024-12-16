"use client";

import { Image_base } from "@/networking/network";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserPostsApi } from "../user-profile/api";
import { useEffect, useState } from "react";
import { getUserVehicleHistoryApi } from "../detail/api";

const image = {
  car: "post-car.png",
  calendar: "/calendar.svg",
};
const MyPost = () => {
  const router = useRouter();
  const [isVehcilesPost, setIsVehcilesPost] = useState([]);
  const [User, setUserId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("traderVehicleId");
    const JSONData = JSON.parse(data);
    if (data) {
      setUserId(JSONData);
    }
  }, []);

  useEffect(() => {
    if (User?.user_id) {
      fetchVehilesPost();
    }
  }, [User?.user_id]);

  const fetchVehilesPost = async () => {
    try {
      const response = await getUserVehicleHistoryApi(User?.user_id);
      if (response?.data) {
        const filteredVehicles = response?.data?.filter(
          (vehicle) => vehicle.is_sold === User?.sold
        );
        setIsVehcilesPost(filteredVehicles);
      }
    } catch (error) {
      console.error("Error fetching Vehicles Post", error);
      setIsVehcilesPost([]);
    }
  };

  const handleClick = () => {
    // router.push(`/detail/${isVehcilesPost}`);
  };
  return (
    <>
      <div className="md:mx-12 my-8 ">
        {isVehcilesPost?.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 my-5 "></p>
          </div>
        ) : (
          <>
            {isVehcilesPost?.map((vehicle, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={handleClick}
                    className="rounded-[12px] cursor-pointer p-2 overflow-hidden gap-2 flex justify-between items-baseline my-3 border border-customGray"
                  >
                    <div className="flex">
                      <div>
                        <Image
                          className="w-[150px] object-[initial] cursor-pointer h-[110px] rounded-[8px] "
                          src={
                            vehicle?.pictures?.length > 0
                              ? `${Image_base}${vehicle?.pictures[0]}`
                              : image.car
                          }
                          alt="allAuction"
                          width={150}
                          height={110}
                        />
                      </div>

                      <div className="px-2 py-1">
                        <div>
                          <h4 className="font-medium  text-customOrange text-[20px] md:text-[15px]">
                            £{vehicle?.price}
                          </h4>
                          <p className="text-customBlackLight text-[14px] md:text-[17px] capitalize ">
                            {vehicle?.make_id?.title} {""}
                            {vehicle?.model_id?.name}
                          </p>
                          <p className="text-customDarkGray text-[15px] md:text-[16px]">
                            {vehicle?.year} - {vehicle?.mileage} Km
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Image
                                src={image.calendar}
                                alt="img"
                                className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                                width={14}
                                height={14}
                              />
                              <p className="text-customSmallGray text-[13px] mx-2">
                                {vehicle?.createdAt
                                  ? new Date(
                                      vehicle?.createdAt
                                    ).toLocaleDateString("en-GB")
                                  : "12 June 2024"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-customDarkGray text-[14px]">
                      {vehicle?.createdAt
                        ? new Date(vehicle?.createdAt).toLocaleDateString(
                            "en-GB"
                          )
                        : "7 days ago"}
                    </p>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default MyPost;
