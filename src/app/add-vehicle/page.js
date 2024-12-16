"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddVehicle() {
  const router = useRouter();
  const handleCLick = () => {
    router.push("/home");
  };
  const handleClickVehicle = () => {
    localStorage.setItem("vehicleType", JSON.stringify({ auction: false }));
    router.push("/list-vehicle");
  };
  const handleClickAuction = () => {
    localStorage.setItem("vehicleType", JSON.stringify({ auction: true }));
    router.push("/list-vehicle");
  };
  const image = {
    logo: "/logo-trade.svg",
    image: "/auth-forgot.png",
    car: "/car.svg",
    carVendor: "/car-2.svg",
  };

  return (
    <div className=" min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Add Vehicle</title>
      </Head>
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <div className="text-left w-full">
            <span>
              <Image
                src={image.logo}
                alt="1"
                className="w-[140px] h-auto cursor-pointer"
                width={140}
                height={50}
                onClick={handleCLick}
              />
            </span>
          </div>
          <div className="max-w-md w-full px-4 md:px-0">
            <div className="min-h-screen flex flex-col items-center md:p-4">
              <h1
                className="text-2xl font-semibold mb-4 text-center text-[26px]
                    text-customBlue"
              >
                Add Vehicle
              </h1>
              <div className="w-full md:w-[500px]">
                <div className="mb-4">
                  <div
                    className="shadow-custom rounded-lg text-center bg-transparent h-[200px] grid place-items-center
                    cursor-pointer"
                    onClick={handleClickVehicle}
                  >
                    <div className="text-center">
                      <label className="inline-block cursor-pointer">
                        <Image
                          src={image.car}
                          alt=""
                          className="w-[70px] h-auto inline-block object-contain mb-1"
                          width={70}
                          height={40}
                        />
                        <p className="text-[18px] text-customBlue font-semibold capitalize">
                          + Add Vehicle
                        </p>
                      </label>
                      <p className="text-customDarkGray">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse nec justo elit. Maecenas euismod luctus
                        aliquet. Sed mauris est, congue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div
                    className="shadow-custom rounded-lg text-center bg-transparent h-[200px] grid place-items-center
                    cursor-pointer"
                    onClick={handleClickAuction}
                  >
                    <div className="">
                      <label className=" inline-block cursor-pointer">
                        <Image
                          src={image.carVendor}
                          alt=""
                          className="w-[70px] h-auto inline-block object-contain mb-1"
                          width={70}
                          height={45}
                        />
                        <p className="text-[18px] text-customBlue font-semibold capitalize">
                          +Add Vehicle For Auction
                        </p>
                      </label>
                      <p className="text-customDarkGray">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse nec justo elit. Maecenas euismod luctus
                        aliquet. Sed mauris est, congue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[45%]">
        <Image
          src={image.image}
          fill
          alt="img"
          className="h-full w-full !relative"
        />
      </div>
    </div>
  );
}
