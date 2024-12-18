import Image from "next/image";
import { Image_base } from "@/networking/network";
import { useRouter } from "next/navigation";

const image = {
  avatar: "/user-vactor.png",
  star: "/star-fill.svg",
};

const Leaderboard = ({
  isLeaderBoard,
  rowsPerPage,
  handleShowMore,
  showLoading,
  totalPages,
}) => {
  const router = useRouter();

  const handleClickHistory = (traderData, selected) => {
    const param = {
      user_id: traderData?.user?._id,
      sold: selected === "sold" ? true : false,
    };
    const userJsonParams = JSON.stringify(param);
    localStorage.setItem("traderVehicleId", userJsonParams);
    router.push("/my-post");
  };
  const onClickTrader = (trader) => {
    const data = JSON.stringify(trader?.user);
    localStorage.setItem("traderData", data);
    router.push(`/trader-detail/${trader?.user?._id}`);
  };
  return (
    <>
      <h2 className="text-2xl text-customBlue font-semibold mb-4">
        Leaderboard
      </h2>
      {!isLeaderBoard?.length ? (
        <div className="flex justify-center ">
          <p className="text-center my-5 animate-spin rounded-full h-10 w-10 border-t-2 border-customBlue border-opacity-50 mr-2"></p>
        </div>
      ) : isLeaderBoard?.length === 0 ? (
        <p className="text-center text-customBlue my-5">
          Leaderboards not found.
        </p>
      ) : (
        <div className="md:mx-2">
          {isLeaderBoard?.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-end space-x-3 border-b border-b-customBg pb-3 mb-3"
            >
              <div
                className="flex cursor-pointer"
                onClick={() => onClickTrader(user)}
              >
                <Image
                  src={
                    `${Image_base}${user?.user?.profilePicture}` || image.avatar
                  }
                  alt=""
                  className="md:w-[50px] md:h-[50px] h-[40px] w-[40px] inline-block rounded-full "
                  width={50}
                  height={50}
                />
                <div className="flex-1 ml-2">
                  <p className="font-normal md:text-[20px] text-[17px] text-customBlue ">
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
              </div>
              <div className="flex">
                <div
                  className="mx-2 cursor-pointer"
                  onClick={() => handleClickHistory(user, "sold")}
                >
                  <p className="md:text-[18px] text-[15px] text-customDarkGray font-normal  text-center">
                    Sold
                  </p>
                  <div className="w-[50px] flex justify-center items-center text-center md:h-[50px] h-[40px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange">
                    {user?.userSoldVehicles}
                  </div>
                </div>

                <div
                  className="mx-2 cursor-pointer"
                  onClick={() => handleClickHistory(user, "sale")}
                >
                  <p className="md:text-[18px] text-[15px] text-customDarkGray font-normal  text-center">
                    Sales
                  </p>
                  <div className="w-[50px] flex justify-center items-center text-center md:h-[50px] h-[40px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange">
                    {user.userVehicles}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLeaderBoard?.length < totalPages * rowsPerPage && (
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
    </>
  );
};

export default Leaderboard;

{
  /* <div className="flex justify-between items-center">
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
      </div> */
}
