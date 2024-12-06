"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddVehicle() {
  const router = useRouter();
  const handleCLick = () => {
    router.push("/");
  };
  // 
  const image = {
    logo: "/logo-trade.svg",
    image: "/auth-forgot.png",
    car: "/car.svg",
    carVendor: "/car-2.svg",
  };

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Add Vehicle</title>
      </Head>
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <div className="text-left w-full">
            <span className="cursor-pointer" onClick={handleCLick}>
              <Image
                src={image.logo}
                alt="1"
                className="w-[140px] h-auto"
                width={140}
                height={50}
              />
            </span>
          </div>
          <div className="max-w-md w-full px-4 md:px-0">
            <div className="min-h-screen flex flex-col items-center p-4">
              <h1
                className="text-2xl font-semibold mb-4 text-center text-[26px]
                    text-customBlue"
              >
                Add Vehicle
              </h1>
              <div className="w-full md:w-[500px]">
                <div className="mb-4">
                  <div className="shadow-custom rounded-lg text-center bg-transparent h-[200px] grid place-items-center">
                    <div>
                      {frontImage ? (
                        <Image
                          src={frontImage}
                          alt="Front ID"
                          className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                        />
                      ) : (
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
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpload(e, setFrontImage)
                              }
                            />
                          </label>
                          <p className="text-customDarkGray">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse nec justo elit. Maecenas euismod
                            luctus aliquet. Sed mauris est, congue.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="shadow-custom rounded-lg text-center bg-transparent h-[200px] grid place-items-center">
                    <div>
                      {backImage ? (
                        <Image
                          src={backImage}
                          alt="Back ID"
                          className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                        />
                      ) : (
                        <div>
                          <label className=" inline-block cursor-pointer">
                            <Image
                              src={image.carVendor}
                              alt=""
                              className="w-[70px] h-auto inline-block object-contain mb-1"
                            />
                            <p className="text-[18px] text-customBlue font-semibold capitalize">
                              +Add Vehicle For Auction
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpload(e, setBackImage)
                              }
                            />
                          </label>
                          <p className="text-customDarkGray">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse nec justo elit. Maecenas euismod
                            luctus aliquet. Sed mauris est, congue.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Link
                    href="/"
                    className="md:w-[200px] flex justify-center py-2.5 px-10 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7"
                  >
                    Back
                  </Link>
                  <Link
                    href="/list-vehicle"
                    className="md:w-[200px] flex justify-center py-2.5 px-10 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[45%]">
        <Image
          src={image.image}
          fill={true}
          alt="img"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
