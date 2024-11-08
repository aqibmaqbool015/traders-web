"use client";

import { useRouter } from "next/navigation";
import { CarouselCar } from "../components/carouselCar";
import CustomInput from "../components/input";
import MapComponent from "../components/mapComponent";
import { RatingStar } from "../components/ratingStar";
import { bidAmount, bidButton, bidderAuction, contact, inputField, products } from "../constant";
const StartBidPage = () => {
    const router = useRouter();

    const image = {
        heart: '/heart.svg',
        auto: '/auto.svg',
        user: '/reviewer.png',
        star: '/star.svg',
        cross: '/cross-custom.svg',
        devider: '/devider.svg',
        clock: '/clock.svg',
        bid: '/bid-confirm.svg',
    }
    const text = {
        item: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. ',
    }
    function openModal() {
        document?.getElementById('myModal').classList.remove('hidden');
    }

    function closeModal() {
        document?.getElementById('myModal').classList.add('hidden');
    }


    return (
        <>
            <div className='md:px-8'>

                <section className='mt-5 px-2 py-6'>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
                        <div className="col-span-12 md:col-span-6">
                            <CarouselCar />

                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="px-2 py-1">
                                <h4 className="font-medium  text-customBlackLight text-[26px]">
                                    Mercedes X Class
                                </h4>
                                <div className='flex md:justify-center items-start mt-4'>
                                    <div className='lg:mx-7 mx-2'>
                                        <h4 className="text-customBlackLight font-medium md:text-[20px]">Starting Price</h4>
                                        <h4 className="text-customBlue font-medium md:text-[18px]">£12,000.00</h4>
                                        <div className='flex items-center'>
                                            <img src={image.clock} alt='' className='w-[14px] h-[14px] inline-block object-contain align-text-top ' />
                                            <p className="text-customSmallGray text-[13px] mx-2">
                                                09:30 PM-12:30 AM
                                            </p>
                                        </div>
                                    </div>
                                    <img src={image.devider} alt className='w-[2px] h-auto md:inline-block object-contain lg:mx-7 mx-2 ' />
                                    <div className='md:mx-7 sm:mx-2 mx-2'>
                                        <h4 className="text-customBlackLight font-medium md:text-[20px]">Current Bid Price</h4>
                                        <h4 className="text-customOrange font-medium md:text-[18px]">£24,500.00</h4>
                                        <div className='flex items-center'>
                                            <img src={image.clock} alt='' className='w-[14px] h-[14px] inline-block object-contain align-text-top ' />
                                            <p className="text-customSmallGray text-[13px] mx-2">
                                                2:23s remining
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-between items-center my-3 px-2'>
                                <h4 className="font-medium text-black text-[22px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-3 before:h-3 before:bg-customOrange before:rounded-full before:transform before:-translate-y-1/2
                            pl-5">
                                    Live Auction
                                </h4>
                                <p className='text-black md:text-[18px]'>
                                    14 Bids made
                                </p>
                            </div>
                            <div className="grid md:grid-cols-1  gap-0 my-5 h-[230px] overflow-y-auto px-2 ">

                                {bidderAuction.map((item, index) => {
                                    return (
                                        <div key={index} className="flex justify-between cursor-pointer items-start border-b border-b-customGray py-1">
                                            <div className=''>
                                                <h4 className="text-customBlackLight font-normal md:text-[18px]">{item.title}</h4>
                                                <h4 className="text-customGrayA font-normal md:text-[18px]">{item.text}</h4>

                                            </div>
                                            <h4 className="text-customBlackLight font-normal md:text-[18px]">{item.amount}</h4>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                    <div>
                        <div className='lg:flex block justify-between lg:px-10 px-4 items-center'>
                            {
                                bidAmount.map((item, index) => {
                                    return (
                                        <div key={index} className={item.class}>
                                            {item.text}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='text-center'>
                            <button
                                onClick={openModal}
                                className=" md:py-2.5 md:px-10 py-2 px-5 rounded-[25px] shadow-sm text-sm font-normal text-white bg-customBlue !mt-7"
                            >
                                Place bid for £250k
                            </button>
                        </div>
                    </div>
                    {/* <div className='mt-6'>
                        <div className='lg:flex block justify-between lg:px-10 px-4 items-center'>
                            {
                                bidAmount.map((item, index) => {
                                    return (
                                        <div key={index} className="inline-block min-w-[130px] py-2 text-center px-3 border cursor-pointer rounded-[12px] shadow-sm text-sm text-customGray bg-transparent border-customGray !mt-2 lg:w-[230px] lg:mx-4 mx-2 font-normal">
                                            {item.text}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='text-center'>
                            <div className='flex justify-center mt-5'>
                                {
                                    bidButton.map((item, index) => {
                                        return (
                                            <button key={index} className={item.class}>
                                                {item.text.endsWith('.svg') ? (
                                                    <img src={item.text} alt="icon" className="h-5 w-4" />
                                                ) : (
                                                    item.text
                                                )}
                                            </button>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div> */}
                </section>
                {/* modal */}
                <div id="myModal" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden
                z-10">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
                        <div className="p-4 relative text-center">
                            <div className="absolute right-3 top-4">
                                <img src={image.cross} alt="" className="w-[15px] h-auto cursor-pointer"
                                    onClick={closeModal} />
                            </div>
                            <form className="space-y-4">
                                <img src={image.bid} alt className='inline-block w-[100px] h-auto object-contain my-3' />
                                <h4 className='text-[22px] font-medium text-customBlackLight'>
                                    Confirm Bid
                                </h4>
                                <p className='text-[16px] font-normal text-customDarkGray my-2 md:px-4 '>
                                    You have placed a bit for 25,000.
                                    Should we place this as your Bid?
                                </p>
                                <div className='text-center md:mx-6'>
                                    <button
                                        className="block w-full md:py-2.5 md:px-10 py-2 px-5 rounded-[25px] shadow-sm text-sm font-normal text-white bg-customBlue !mt-7"
                                    >
                                        Yes, Place My Bid
                                    </button>
                                    <button
                                        className="block w-full md:py-2.5 md:px-10 py-2 px-5 rounded-[25px] shadow-sm text-sm font-normal text-customBlue border border-customBlue bg-transparent !mt-3"
                                    >
                                        Cencel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default StartBidPage;
