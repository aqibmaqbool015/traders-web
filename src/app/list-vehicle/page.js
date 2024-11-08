"use client";
import Head from 'next/head';
import CustomInput from '../components/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ListVehicle() {
    const router = useRouter();
    const handleCLick = () => {
        router.push('/')
    }

    const handleOtpClick = (e) => {
        e.preventDefault();
        router.push('/otp');
    };

    const image = {
        image: '/auth-forgot.png',
        logo: '/logo-trade.svg',
        search: '/search-alert.svg',
    };



    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            <Head>
                <title>List Vehicle</title>
            </Head>
            <div className="w-full md:w-[65%] flex flex-col items-center">
                <div className='text-left w-full'>
                    <span className='cursor-pointer' onClick={handleCLick}>
                        <img src={image.logo} alt="Car Dealership"
                            className='w-[140px] h-auto' />
                    </span>
                </div>
                <div className="max-w-md w-full py-8 md:py-16 px-4 md:px-0">
                    <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
                        List your Vehicle
                    </h1>
                    <form className="space-y-4 mt-10" onSubmit={handleOtpClick}>
                        <div className="mt-[12px]">
                            <label htmlFor='' className='text-[17px] text-customBlue font-medium mb-3'>
                                Vehicle Registration No.
                            </label>
                            <div className='relative mt-3'>
                                <input
                                    type='text'
                                    id=''
                                    name=''
                                    placeholder='Enter vehicle registration no.'
                                    value=''
                                    className="mt-1 block w-full px-3 py-3 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"

                                />
                                <img src={image.search} alt='' className='absolute w-[20px] h-[20px] inline-block right-4 top-4 ' />
                            </div>

                        </div>

                        <div className='flex justify-between'>
                            <Link
                                href='/add-vehicle'
                                className="md:w-[200px] flex justify-center py-2.5 px-10 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7"
                            >
                                Back
                            </Link>
                            <Link
                                href='/vehicle-detail'
                                className="md:w-[200px] flex justify-center py-2.5 px-10 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
                            >
                                Lookup
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full md:w-[45%]">
                <img src={image.image} alt="Car Dealership" className='h-full w-full' />
            </div>
        </div>
    );
}
