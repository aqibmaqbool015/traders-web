import Link from "next/link";
import React from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialSkype } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";


function Footer() {
    const image = {
        logo: '/logo-trade.svg',
        social: '/social-1.svg',
        social1: '/social-2.svg',
        social2: '/social-3.svg',
    }
    return (
        <>
            <div className="  bg-customBlue
             bottom-0 w-full">
                <div className="container md:py-8 md:px-14 py-4 px-4">
                    <div className="bg-white rounded-[20px] md:px-4 md:py-8 md:mx-6 px-2 py-2">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12 sm:col-span-6">
                                <div className="mx-5">
                                    <img src={image.logo} alt="" className="md:w-[140px] w-[110px] h-auto" />
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-3">
                                <h6 className="text-customBlue text-[17px] font-medium">
                                    Support
                                </h6>
                                <div className="">
                                    <Link href="/" className="text-customBlackLight text-[15px] font-normal block my-2">Returns </Link>
                                    <Link href="/" className="text-customBlackLight text-[15px] font-normal block my-2">F.A.Qs</Link>
                                    <Link href="/" className="text-customBlackLight text-[15px] font-normal block my-2">Privacy Policy</Link>
                                    <Link href="/" className="text-customBlackLight text-[15px] font-normal block my-2">Contact Us</Link>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-3">
                                <h6 className="text-customBlue text-[17px] font-medium">
                                    How to Reach Us:
                                </h6>
                                <div className="">
                                    <div className="text-customBlackLight text-[15px] font-normal block my-2">
                                        (315) 257 7729 </div>
                                    <div className="text-customBlackLight text-[15px] font-normal block my-2">
                                        922 Washington Ave, Albany, NY 12203, United States</div>
                                    <div className="text-customBlackLight text-[15px] font-normal block my-2">
                                        Support@Trade2Trade.co.uk</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex justify-end gap-4 mx-4">
                        <img src={image.social} className="md:w-[40px] w-[40px] h-auto" alt="" />
                        <img src={image.social1} className="md:w-[40px] w-[40px] h-auto" alt="" />
                        <img src={image.social2} className="md:w-[40px] w-[40px] h-auto" alt="" />
                    </div>
                    <div className="flex md:flex-row flex-col justify-between items-center mt-8">
                        <div className=" lg:flex gap-2">
                            <div className="text-white text-[14px] cursor-pointer hover:text-red-400">
                                @2024 trade2trade. All Rights Reserved
                            </div>

                        </div>

                        <div className=" lg:flex gap-2">
                            <Link href='' className="text-white text-[14px] cursor-pointer font-normal mx-3 ">
                                Copy Right
                            </Link>
                            <Link href='' className="text-white text-[14px] cursor-pointer font-normal mx-3 ">
                                Terms Of Use
                            </Link>
                            <Link href='' className="text-white text-[14px] cursor-pointer font-normal mx-3 ">
                                Privacy Policy
                            </Link>
                            <Link href='' className="text-white text-[14px] cursor-pointer font-normal mx-3 ">
                                Code of Conduct
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Footer;