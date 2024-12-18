import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const image = {
  logo: "/logo-trade.svg",
  social: "/social-1.svg",
  social1: "/social-2.svg",
  social2: "/social-3.svg",
};

function Footer() {
  const router = useRouter();

  const handleCLick = () => {
    router.push("/home");
  };

  return (
    <>
      <div
        className="  bg-customBlue
             bottom-0 w-full"
      >
        <div className="container md:py-8 md:px-14 py-4 px-4">
          <div className="bg-white rounded-[20px] md:px-4 md:py-8 md:mx-6 px-2 py-2">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 sm:col-span-6">
                <div className="mx-5">
                  <Image
                    src={image.logo}
                    width={140}
                    height={50}
                    alt="img"
                    className="md:w-[100px] mx-2 my-2 w-[110px] h-auto cursor-pointer "
                    onClick={handleCLick}
                  />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-3">
                <h6 className="text-customBlue text-[17px] font-medium">
                  Support
                </h6>
                <div className="">
                  <Link
                    href="/privacy-policy"
                    className="text-customBlackLight text-[15px] font-normal block my-2"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-condition"
                    className="text-customBlackLight text-[15px] font-normal block my-2"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-customBlackLight text-[15px] font-normal block my-2"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-3">
                <h6 className="text-customBlue text-[17px] font-medium">
                  How to Reach Us:
                </h6>
                <div className="">
                  {/* <div className="text-customBlackLight text-[15px] font-normal block my-2">
                    (315) 257 7729{" "}
                  </div> */}
                  <div className="text-customBlackLight text-[15px] font-normal block my-2">
                    C3 100 Fitzwalter Road, Sheffield, England, S2 2SP
                  </div>
                  <div className="text-customBlackLight text-[15px] font-normal block my-2">
                    Support@Trade2Trade.co.uk
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 flex justify-end gap-4 mx-4">
            <Image
              src={image.social}
              width={40}
              height={40}
              className="md:w-[40px] w-[40px] h-auto"
              alt="img"
            />
            <Image
              src={image.social1}
              width={40}
              height={40}
              className="md:w-[40px] w-[40px] h-auto"
              alt="img"
            />
            <Image
              src={image.social2}
              width={40}
              height={40}
              className="md:w-[40px] w-[40px] h-auto"
              alt="img"
            />
          </div>
          <div className="my-3 text-center">
            <div className="text-white text-[14px]">
              @2024 trade2trade. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
