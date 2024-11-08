"use client";

import Head from "next/head";
import { useState } from "react";
import VehicleForm from "../components/vehicleForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomToast = ({ closeToast }) => (
    <div>
        <h6 className='text-customBlue font-normal text-[13px]'>Your vehicle has been successfully submitted and is in review.
        </h6>
        <div className='text-center'>
            <button onClick={closeToast} className='text-center inline-block bg-customOrange text-white px-1 py-2 
      rounded-[25px] shadow-sm text-sm w-[80px] !mt-3'>
                OK
            </button>
        </div>
    </div>
);


export default function VehicleDetail() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/')
    }
    const handleSignUp = (event) => {
        console.log('dddddddds');

        event.preventDefault();
        toast(<CustomToast />);
    };
    const image = {
        logo: '/logo-trade.svg',
        vector: '/person.svg',
        camera: '/camera.svg',
        plas: '/plus.svg',
    }

    const [profileImage, setProfileImage] = useState(null);
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
                <title>Vehicle Detail</title>
            </Head>

            <div className="w-full flex flex-col items-center">
                <div className='text-left w-full'>
                    <span className='cursor-pointer' onClick={handleClick}>
                        <img src={image.logo} alt="Car Dealership"
                            className='w-[140px] h-auto' />
                    </span>
                </div>

                <div className='w-full '>
                    <form onSubmit={handleSignUp}>
                        <div className=" w-full px-4 md:px-0">

                            <div className="flex flex-col justify-center items-center p-4">
                                <h1 className="text-2xl font-semibold mb-4 text-center text-[30px]
text-customBlue">
                                    Add Vehicle Details
                                </h1>
                                <div className="w-full md:w-[400px]">
                                    <div className="mb-4 mt-4">
                                        <div className='flex justify-between items-center'>
                                            <label className="block text-customBlue text-[14px] font-normal mb-2">Upload Up To 16 Photos</label>
                                            <p className='text-customOrange text-[14px] font-normal mb-2'>
                                                Video Required*
                                            </p>
                                        </div>
                                        <div className="border-dashed border-2 border-customGray rounded-lg text-center bg-customLight h-[200px] grid place-items-center">
                                            <div>
                                                {frontImage ? (
                                                    <img
                                                        src={frontImage}
                                                        alt="Front ID"
                                                        className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <label className="inline-block cursor-pointer">
                                                            <img src={image.plas} alt="" className="w-[25px] h-[25px] object-contain" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleImageUpload(e, setFrontImage)}
                                                            />
                                                        </label>
                                                        <p className="text-customDarkGray">Upload front side of your ID</p>
                                                        <p className='text-customSmallGray text-[12px] '>
                                                            (png.jpg.pdf)
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                        <VehicleForm />
                        <div className='flex justify-center mb-5'>
                            <Link
                                href='/'
                                className="md:w-[200px] flex justify-center py-2.5 px-10 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7
                            mx-3"
                            >
                                Back
                            </Link>
                            <button
                                type='submit'
                                className="md:w-[200px] flex justify-center py-2.5 px-10 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7
                            mx-3"
                            >
                                Post
                            </button>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}
