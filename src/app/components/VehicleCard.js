import { Image_base } from "@/networking/network";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { wishlistPost } from "../home/api";

const image = {
  heart: "/heart.svg",
  vehicle: "/vehicle-profile.png",
  clock: "/clock.svg",
  calendar: "/calendar.svg",
  won: "/won.svg",
};

export const VehicleCard = ({ vehicle }) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);
  const [visibleFeed, setVisibleFeed] = useState(5);

  const handleClick = () => {
    router.push(`/detail/${vehicle?._id}`);
  };

  const handleClickFavourite = async () => {
    const params = {
      vehicleId: vehicle?._id,
    };
    try {
      const response = await wishlistPost(params);
      if (response) {
        setIsFavourite(!isFavourite);
      }
    } catch (error) {
      console.error("Wishlist API Error:", error);
    }
  };

  const imageSrc =
    vehicle?.pictures && vehicle.pictures.length > 0
      ? `${Image_base}${vehicle.pictures[0]}`
      : image.vehicle;

  return (
    <div className="rounded overflow-hidden gap-2 my-3 cursor-pointer ">
      <ToastContainer position="top-right" />
      <div className="w-full h-[250px] inline-block " onClick={handleClick}>
        <Image
          className="w-full h-full object-[initial] rounded-[8px] "
          src={imageSrc}
          alt="Vehicle"
          width={200}
          height={280}
        />
      </div>
      <div className="px-2 py-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-customOrange md:text-[22px] text-[18px] ">
            £ {vehicle?.price || "Vehicle Title"}
          </h4>
          {isFavourite ? (
            <svg
              onClick={handleClickFavourite}
              width="25"
              height="25"
              viewBox="0 0 35 32"
              fill="#F53535"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
            >
              <path
                d="M24.5487 0.814148C29.5477 0.814148 33.6001 4.89137 33.6001 10.5995C33.6001 22.0157 21.2573 28.5392 17.143 30.9856C13.0287 28.5392 0.685852 22.0157 0.685852 10.5995C0.685852 4.89137 4.80014 0.814148 9.73728 0.814148C12.7983 0.814148 15.4973 2.44504 17.143 4.07592C18.7887 2.44504 21.4877 0.814148 24.5487 0.814148Z"
                fill="#F53535"
              />
            </svg>
          ) : (
            <svg
              onClick={handleClickFavourite}
              width="25"
              height="25"
              viewBox="0 0 35 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
            >
              <path
                d="M24.5487 0.814148C29.5477 0.814148 33.6001 4.89137 33.6001 10.5995C33.6001 22.0157 21.2573 28.5392 17.143 30.9856C13.0287 28.5392 0.685852 22.0157 0.685852 10.5995C0.685852 4.89137 4.80014 0.814148 9.73728 0.814148C12.7983 0.814148 15.4973 2.44504 17.143 4.07592C18.7887 2.44504 21.4877 0.814148 24.5487 0.814148Z"
                stroke="#7C7C7C"
              />
            </svg>
          )}
        </div>
        <p className="text-customBlackLight md:text-[18px] text-[16px] ">
          {vehicle?.model_id?.name || vehicle?.regno}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-customDarkGray text-[15px]">
            {vehicle?.year || "2014"} - {vehicle?.mileage || "167,453"} Km
          </p>
          <p className="text-customDarkGray text-[14px]">
            {vehicle?.make_id?.createdAt
              ? new Date(vehicle?.make_id?.createdAt).toLocaleDateString(
                  "en-GB"
                )
              : "7 days ago"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AuctionsCardAll = ({ auction }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${auction?._id}`);
  };
  const pictures = auction?.pictures || [];
  const imageSrc =
    pictures && pictures?.length > 0
      ? `${Image_base}${pictures[0]}`
      : image.vehicle;

  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-1 gap-4">
        <div className="rounded overflow-hidden gap-2 my-3">
          <div onClick={handleClick}>
            <Image
              className="w-full object-[initial] cursor-pointer
                    h-[250px] 
                     rounded-[8px] "
              src={imageSrc}
              alt="allAuction"
              width={200}
              height={280}
            />
          </div>

          <div className="px-2 py-1">
            <div className="flex justify-between items-center">
              <h4 className="font-medium  text-customOrange text-[22px]">
                £ {auction?.price}
              </h4>
              {auction.isLive && (
                <p className="font-medium text-customRed text-[16px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2 pl-5">
                  Live
                </p>
              )}
            </div>

            <p className="text-customBlackLight text-[17px]">
              {auction?.make_id?.title} 
              {"  "}
              {auction?.model_id?.name}
            </p>
            <p className="text-customDarkGray text-[15px]">
              {auction?.year || "2014"} - {auction?.mileage || "167,453"} Km
            </p>
            <div className="flex items-center">
              <Image
                src={image.clock}
                alt="img"
                className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                width={14}
                height={14}
              />
              <p className="text-customSmallGray text-[13px] mx-2">
                {/* {new Date(auction?.auc_start_time)
                  .toUTCString()
                  .split(" ")[4]
                  .replace(/^(\d{2}):(\d{2}):\d{2}$/, (_, hh, mm) => {
                    const hours = Number(hh) % 12 || 12;
                    const period = Number(hh) >= 12 ? "pm" : "am";
                    return `${hours}:${mm} ${period}`;
                  })} */}

                {new Date(auction?.auc_start_time).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}

                {"-"}
                {new Date(auction?.auc_end_time).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
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
                  {auction?.auction_date
                    ? new Date(auction?.auction_date)
                        .toUTCString()
                        .split(" ")
                        .slice(1, 4)
                        .join(" ")
                    : "7 days ago"}
                </p>
              </div>
              <p className="text-customDarkGray text-[14px]">
                {auction?.auction_date
                  ? new Date(auction?.auction_date)
                      .toUTCString()
                      .split(" ")
                      .slice(1, 4)
                      .join(" ")
                  : "7 days ago"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AuctionsCardTabs = ({ vehcile }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${vehcile?._id}`);
  };

  const imageSrc =
    vehcile?.pictures && vehcile?.pictures?.length > 0
      ? `${Image_base}${vehcile?.pictures[0]}`
      : image.vehicle;
  return (
    <>
      <div className="rounded overflow-hidden gap-2 my-3">
        <div onClick={handleClick}>
          <Image
            className="w-full object-[initial] cursor-pointer
                h-[250px] "
            src={
              vehcile?.pictures?.length > 0
                ? `${Image_base}${vehcile.pictures[0]}`
                : image.vehicle
            }
            alt="Sample image"
            width={200}
            height={200}
          />
        </div>

        <div className="px-2 py-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium  text-customOrange text-[22px]">
              £ {vehcile?.price || "vehcile Title"}
            </h4>
            {vehcile.isLive && (
              <p className="font-medium text-customRed text-[16px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2 pl-5">
                Live
              </p>
            )}
          </div>

          <p className="text-customBlackLight text-[17px]">
            {vehcile?.model_id?.name || vehcile?.regno}
          </p>
          <p className="text-customDarkGray text-[15px]">
            {vehcile?.year || "2014"} - {vehcile?.mileage || "167,453"} Km
          </p>
          <div className="flex items-center">
            <Image
              src={image.clock}
              alt="img"
              className="w-[14px] h-[14px] inline-block object-contain align-text-top "
              width={14}
              height={14}
            />
            <p className="text-customSmallGray text-[13px] mx-2">
              {new Date(vehcile?.auc_start_time).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {"-"}
              {new Date(vehcile?.auc_end_time).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
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
                {vehcile?.make_id?.createdAt
                  ? new Date(vehcile?.make_id?.createdAt).toLocaleDateString(
                      "en-GB"
                    )
                  : "7 days ago"}
              </p>
            </div>
            <p className="text-customDarkGray text-[14px]">
              {vehcile?.make_id?.createdAt
                ? new Date(vehcile?.make_id?.createdAt).toLocaleDateString(
                    "en-GB"
                  )
                : "7 days ago"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const AuctionsCardBid = ({ auctionBid }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${auctionBid?._id}`);
  };

  const imageSrc =
    auctionBid?.pictures && auctionBid?.pictures?.length > 0
      ? `${Image_base}${auctionBid?.pictures[0]}`
      : image.vehicle;
  return (
    <>
      {auctionBid?.map((vehicle, index) => (
        <div key={index} className="grid grid-cols-1  lg:grid-cols-1 gap-4">
          <div className="rounded overflow-hidden gap-2 my-3">
            <div onClick={handleClick}>
              <Image
                className="w-full object-[initial] cursor-pointer
                h-[250px] "
                src={
                  vehicle?.pictures?.length > 0
                    ? `${Image_base}${vehicle.pictures[0]}`
                    : image.vehicle
                }
                alt="Sample image"
                width={200}
                height={200}
              />
            </div>

            <div className="px-2 py-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium  text-customOrange text-[22px]">
                  £ {vehicle?.price || "Vehicle Title"}
                </h4>
                {vehicle.isLive && (
                  <p className="font-medium text-customRed text-[16px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2 pl-5">
                    Live
                  </p>
                )}
              </div>

              <p className="text-customBlackLight text-[17px]">
                {vehicle?.model_id?.name || vehicle?.regno}
              </p>
              <p className="text-customDarkGray text-[15px]">
                {vehicle?.year || "2014"} - {vehicle?.mileage || "167,453"} Km
              </p>
              <div className="flex items-center">
                <Image
                  src={image.clock}
                  alt="img"
                  className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                  width={14}
                  height={14}
                />
                <p className="text-customSmallGray text-[13px] mx-2">
                  {new Date(vehicle?.auc_start_time).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {"-"}
                  {new Date(vehicle?.auc_end_time).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
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
                    {vehicle?.make_id?.createdAt
                      ? new Date(
                          vehicle?.make_id?.createdAt
                        ).toLocaleDateString("en-GB")
                      : "7 days ago"}
                  </p>
                </div>
                <p className="text-customDarkGray text-[14px]">
                  {vehicle?.make_id?.createdAt
                    ? new Date(vehicle?.make_id?.createdAt).toLocaleDateString(
                        "en-GB"
                      )
                    : "7 days ago"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const AuctionsCardWon = ({ vehcile }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${vehcile?._id}`);
  };

  const imageSrc =
    vehcile?.pictures && vehcile?.pictures?.length > 0
      ? `${Image_base}${vehcile?.pictures[0]}`
      : image.vehicle;
  return (
    <>
      <div className="rounded overflow-hidden gap-2 my-3">
        <div onClick={handleClick}>
          <Image
            className="w-full object-[initial] cursor-pointer
                h-[250px] "
            src={
              vehcile?.pictures?.length > 0
                ? `${Image_base}${vehcile.pictures[0]}`
                : image.vehicle
            }
            alt="Sample image"
            width={200}
            height={200}
          />
        </div>

        <div className="px-2 py-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium  text-customOrange text-[22px]">
              £ {vehcile?.price || "vehcile Title"}
            </h4>

            <span className="">
              <Image
                alt=""
                src={image.won}
                width={40}
                height={40}
                className="w-[40px] h-auto object-contain "
              />
            </span>
          </div>

          <p className="text-customBlackLight text-[17px]">
            {vehcile?.model_id?.name || vehcile?.regno}
          </p>
          <p className="text-customDarkGray text-[15px]">
            {vehcile?.year || "2014"} - {vehcile?.mileage || "167,453"} Km
          </p>
          <div className="flex items-center">
            <Image
              src={image.clock}
              alt="img"
              className="w-[14px] h-[14px] inline-block object-contain align-text-top "
              width={14}
              height={14}
            />
            <p className="text-customSmallGray text-[13px] mx-2">
              {new Date(vehcile?.auc_start_time).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {"-"}
              {new Date(vehcile?.auc_end_time).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
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
                {vehcile?.make_id?.createdAt
                  ? new Date(vehcile?.make_id?.createdAt).toLocaleDateString(
                      "en-GB"
                    )
                  : "7 days ago"}
              </p>
            </div>
            <p className="text-customDarkGray text-[14px]">
              {vehcile?.make_id?.createdAt
                ? new Date(vehcile?.make_id?.createdAt).toLocaleDateString(
                    "en-GB"
                  )
                : "7 days ago"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
