import Link from "next/link";
import { cards, cardsAuction } from "../constant";
import { useRouter } from "next/navigation";

const BASE_URL = "https://t2tcorebucket.s3.eu-west-2.amazonaws.com";

export const VehicleCard = ({ vehicle }) => {
  const router = useRouter();
  const image = {
    heart: "/heart.svg",
    vehicle: "/vehicle-profile.png",
  };
  const handleClick = () => {
    router.push(`/detail/${vehicle?._id}`);
  };

  return (
    <div className="rounded overflow-hidden gap-2 my-3 cursor-pointer ">
      <div onClick={handleClick}>
        <img
          className="w-full h-[280px] object-[initial] rounded-[8px] "
          src={`${BASE_URL}${vehicle?.pictures}` || image.vehicle}
          alt="Vehicle"
        />
      </div>
      <div className="px-2 py-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-customOrange text-[22px]">
            {vehicle?.price || "Vehicle Title"}
          </h4>
          <img
            className="w-[22px] h-[22px] object-[initial]"
            src={image.heart}
            alt="Heart Icon"
          />
        </div>
        <p className="text-customBlackLight text-[18px]">
          {vehicle?.model_id?.name || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-customDarkGray text-[15px]">
            {vehicle?.mileage || "N/A"}
          </p>
          <p className="text-customDarkGray text-[14px]">
            {vehicle?.year || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AuctionsCardLive = () => {
  return (
    <>
      {cardsAuction.map((item, index) => (
        <div key={index} className="rounded overflow-hidden gap-2 my-3">
          <Link href="/detail">
            <img
              className="w-full object-[initial]"
              src={item.image}
              alt="Sample image"
            />
          </Link>

          <div className="px-2 py-1">
            <div className="flex justify-between items-center">
              <h4 className="font-medium  text-customOrange text-[22px]">
                {item.title}
              </h4>
              <p
                className="font-medium text-customRed text-[16px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2
                            pl-5"
              >
                {item.active}
              </p>
            </div>

            <p className="text-customBlackLight text-[17px]">
              {item.description}
            </p>
            <p className="text-customDarkGray text-[15px]">{item.distance}</p>
            <div className="flex items-center">
              <img
                src={item.clock}
                alt=""
                className="w-[14px] h-[14px] inline-block object-contain align-text-top "
              />
              <p className="text-customSmallGray text-[13px] mx-2">
                {item.time}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.calendar}
                  alt=""
                  className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                />
                <p className="text-customSmallGray text-[13px] mx-2">
                  {item.date}
                </p>
              </div>
              <p className="text-customDarkGray text-[14px]">{item.days}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const AuctionsCardTabs = () => {
  return (
    <>
      {cardsAuction.map((item, index) => (
        <div key={index} className="rounded overflow-hidden gap-2 my-3">
          <Link href="/detail">
            <img
              className="w-full object-[initial]"
              src={item.image}
              alt="Sample image"
            />
          </Link>

          <div className="px-2 py-1">
            {/* <div className="flex justify-between items-center">
                            <h4 className="font-medium  text-customOrange text-[22px]">{item.title}</h4>
                            <p className="font-medium text-customRed text-[16px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2
                            pl-5">
                                {item.active}
                            </p>

                        </div> */}
            <h4 className="font-medium  text-customOrange text-[22px]">
              {item.title}
            </h4>
            <p className="text-customBlackLight text-[17px]">
              {item.description}
            </p>
            <p className="text-customDarkGray text-[15px]">{item.distance}</p>
            <div className="flex items-center">
              <img
                src={item.clock}
                alt=""
                className="w-[14px] h-[14px] inline-block object-contain align-text-top "
              />
              <p className="text-customSmallGray text-[13px] mx-2">
                {item.time}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.calendar}
                  alt=""
                  className="w-[14px] h-[14px] inline-block object-contain align-text-top "
                />
                <p className="text-customSmallGray text-[13px] mx-2">
                  {item.date}
                </p>
              </div>
              <p className="text-customDarkGray text-[14px]">{item.days}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
