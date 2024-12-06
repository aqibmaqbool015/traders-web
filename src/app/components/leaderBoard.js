import Image from "next/image";
import { userLeader } from "../constant";
import { Image_base } from "@/networking/network";

const image = {
  avatar: "/user-vactor.png",
  star: "/star-fill.svg",
};

const Leaderboard = ({ isLeaderBoard }) => {
  return (
    <>
      <h2 className="text-2xl text-customBlue font-semibold mb-4">
        Leaderboard
      </h2>
      {isLeaderBoard?.map((user, index) => (
        <div
          key={index}
          className="flex items-end space-x-3 border-b border-b-customBg pb-3 mb-3"
        >
          <Image
            src={`${Image_base}${user?.user?.profilePicture}` || image.avatar}
            alt=""
            className="w-[50px] h-[50px] inline-block rounded-full "
            width={50}
            height={50}
          />
          <div className="flex-1">
            <p className="font-normal text-[20px] text-customBlue ">
              {user?.user?.firstName}
            </p>
            <div className="flex items-center">
              <Image
                src={image.star}
                alt=""
                className="w-[16px] h-[16px] mr-2 object-contain inline-block "
                width={16}
                height={16}
              />
              <h3 className="text-sm text-customDarkGray">
                {user?.averageRating} ( {user?.reviews} )
              </h3>
            </div>
          </div>
          <div className="flex">
            <div className="mx-2">
              <p className="text-[18px] text-customDarkGray font-normal  text-center">
                Sold
              </p>
              <div className="w-[50px] flex justify-center items-center text-center h-[50px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange">
                {user?.userSoldVehicles}
              </div>
            </div>
            <div className="mx-2">
              <p className="text-[18px] text-customDarkGray font-normal  text-center">
                Sales
              </p>
              <div className="w-[50px] flex justify-center items-center text-center h-[50px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange">
                {user.count1 || '0'} 
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <p className="font-medium text-[16px] text-customBlue capitalize cursor-pointer">
          previous
        </p>
        <div className="cursor-pointer mt-3">
          <p className="font-normal text-[15px] mx-1 inline-block text-white bg-customBlue rounded-full w-[23px] h-[23px] text-center  capitalize ">
            1
          </p>
          <p className="font-normal text-[15px] mx-1 inline-block text-customBlue bg-transparent rounded-full w-[23px] h-[23px] text-center  capitalize ">
            2
          </p>
          <p className="font-normal text-[15px] mx-1 inline-block text-customBlue bg-transparent rounded-full w-[23px] h-[23px] text-center  capitalize ">
            3
          </p>
        </div>
        <p className="font-medium text-[16px] text-customBlue capitalize  cursor-pointer">
          next
        </p>
      </div>
    </>
  );
};

export default Leaderboard;
