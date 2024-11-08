"use client";
import Link from 'next/link';
import { AuctionsCardLive, AuctionsCardTabs } from '../components/VehicleCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Auctions = () => {
    const router = useRouter();
    const [openTab, setOpenTab] = useState(1);


    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;

        if (selectedOption === 'Trader') {
            router.push('/trader');
        }
    };


    const image = {
        search: '/search-alert.svg',
        filter: '/filter.svg',
        arrow: '/down-arrow.png',
        cross: '/cross.svg',
        crossBlue: '/cross-custom.svg',

    };


    return (
        <>
            <div className=' px-8'>
                <section className="mt-4">
                    <div className="md:flex sm:flex items-center space-x-2 p-2 mt-3 ">
                        <div className="relative flex items-center flex-1 py-1 rounded-[6px] border-2 border-customGray">
                            <Link href='#' className='w-[100%] rounded-[6px]'>
                                <input type="text" placeholder="Find your car" className="px-10 pr-4 py-2 border-none focus:outline-none active:outline-none w-[100%] rounded-[10px] " />
                            </Link>

                            <div className="absolute left-3 ">
                                <img src={image.search} alt="" className="w-[18px] h-auto cursor-pointer" />
                            </div>
                        </div>
                    </div>

                </section>
                <section className='mt-4 md:mx-10'>
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center"
                        role="tablist"
                    >
                        <li className="-mb-px last:mr-0 text-center mx-2 my-2">
                            <a
                                className={
                                    "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] relative  " +
                                    (openTab === 1
                                        ? " text-white bg-customRed relative before:content-[''] before:absolute before:left-9 before:top-[19px] before:w-2 before:h-2 before:bg-white before:rounded-full before:transform before:-translate-y-1/2 pl-5"
                                        : "text-customRed bg-transparent border border-customRed relative before:content-[''] before:absolute before:left-9 before:top-[19px] before:w-2 before:h-2 before:bg-customRed before:rounded-full before:transform before:-translate-y-1/2 pl-5")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Live
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center mx-2 my-2">
                            <a
                                className={
                                    "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                                    (openTab === 2
                                        ? " text-customBlue bg-transparent border border-customBlue"
                                        : "text-customDarkGray bg-transparent border border-customDarkGray")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Interested
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center mx-2 my-2">
                            <a
                                className={
                                    "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                                    (openTab === 3
                                        ? " text-customBlue bg-transparent border border-customBlue"
                                        : "text-customDarkGray bg-transparent border border-customDarkGray")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                My Bids
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center mx-2 my-2">
                            <a
                                className={
                                    "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                                    (openTab === 4
                                        ? " text-customBlue bg-transparent border border-customBlue"
                                        : "text-customDarkGray bg-transparent border border-customDarkGray")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link4"
                                role="tablist"
                            >
                                Won
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center mx-2 my-2">
                            <a
                                className={
                                    "text-[14px] font-medium px-5 py-2 rounded-[30px] block leading-normal w-[140px] " +
                                    (openTab === 5
                                        ? " text-customBlue bg-transparent border border-customBlue"
                                        : "text-customDarkGray bg-transparent border border-customDarkGray")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(5);
                                }}
                                data-toggle="tab"
                                href="#link5"
                                role="tablist"
                            >
                                My Vehicle
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <AuctionsCardLive />
                                    </div>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <AuctionsCardTabs />
                                    </div>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link1">
                                    3
                                </div>
                                <div className={openTab === 4 ? "block" : "hidden"} id="link1">
                                    4
                                </div>
                                <div className={openTab === 5 ? "block" : "hidden"} id="link1">
                                    5
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center my-5">
                        <button className="bg-customLightColor text-customDarkGray rounded-[20px] px-5 py-2 capitalize text-[16px] font-medium">
                            show more
                        </button>
                    </div>
                </section>
            </div>

        </>
    );
};

export default Auctions;
