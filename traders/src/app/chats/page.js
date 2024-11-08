"use client";
import Link from 'next/link';

const Chats = () => {
    const image = {
        search: '/search-alert.svg',
        sender: '/send.svg',
        avatar: "/chat-user.png",
        camera: '/camera.svg'
    };

    const users = [
        {
            name: "Danny Ayres",
            lastMessage: "No problem, Peter...",
            time: "9:50 pm",
            avatar: "/chat-user.png"
        },
        {
            name: "John Walker",
            lastMessage: "Well howdy, neighbor...",
            time: "1 day ago",
            avatar: "/chat-user2.png"
        }
    ];

    const messages = [
        {
            text: "Hey, great work. I'd love to discuss potential opportunities to have you contract for our creative agency. At times, we need to flex our resources and add someone to the projects. You would be a perfect fit. Would you be interested?",
            time: "6:20 pm",
            sender: "other",
            avatar: "/chat-user.png"
        },
        {
            text: "Hey, great work. I'd love to discuss potential opportunities to have you contract for our creative agency.",
            time: "6:21 pm",
            sender: "self",
            avatar: "/chat-user2.png"
        },
        {
            text: "No problem, Peter. We appreciate it. Keep up the great work!",
            time: "6:22 pm",
            sender: "other",
            avatar: "/chat-user.png"
        }
    ];

    return (
        <>
            <div className=' px-8'>
                <section className="mt-4">
                    <label className='text-[18px] font-normal text-customDarkGray space-x-2 p-2'>
                        Search Traders
                    </label>
                    <div className="md:flex sm:flex items-center space-x-2 p-2 mt-1 ">
                        <div className="relative flex items-center flex-1 py-1 rounded-[6px] border-2 border-customGray">
                            <Link href='#' className='w-[100%] rounded-[6px]'>
                                <input type="text" placeholder="Start typing a trader’s name" className=" pr-4 py-2 text-customGray border-none focus:outline-none active:outline-none w-[100%] rounded-[10px] " />
                            </Link>
                            <div className="absolute right-3 ">
                                <img src={image.search} alt="" className="w-[18px] h-auto cursor-pointer" />
                            </div>
                        </div>
                    </div>

                </section>

                <div className="md:flex my-4">
                    <div className="md:w-1/4 bg-transparent p-4 border-r border-r-customLightBorder">
                        <div className="space-y-6">
                            {users.map((user, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <img src={user.avatar} alt="" className="w-[40px] h-[40px] inline-block object-contain " />
                                    <div className="flex-1">
                                        <p className="font-semibold text-customBlue ">{user.name}</p>
                                        <h3 className='font-sans'>
                                            {user.time}
                                        </h3>
                                        <p className="text-sm text-customDarkGray">{user.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-customDarkGray relative right-0  block text-right mt-1">{user.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-3/4 flex flex-col">
                        <div className="bg-white p-4 border-b border-b-customLightBorder flex">
                            <img src={image.avatar} alt="" className="w-[40px] h-[40px] inline-block object-contain " />
                            <h1 className="font-bold text-lg text-customBlue mx-3">Danny Ayres</h1>
                        </div>
                        <div className="flex-1 md:p-6 space-y-4 overflow-y-auto">
                            <div className='text-center'>
                                <p className="text-sm font-medium text-customDarkGray">Today</p>
                            </div>
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.sender === 'self' ? 'justify-end  items-end' : ' items-end'}`}>
                                    {message.sender === 'other' && (
                                        <img src={message.avatar} alt="User Avatar" className="rounded-full w-[40px] h-[40px] object-contain inline-block " />
                                    )}
                                    <div className={`max-w-xl p-4 ${message.sender === 'self' ? 'bg-customBlue text-white' : 'bg-customCardBg text-customBlackDark'} rounded-lg ml-3`}>
                                        <p>{message.text}</p>
                                        <span className={`text-xs relative right-0 w-full block text-right mt-1 ${message.sender === 'self' ? 'text-white' : 'text-customBlackDark'}`}>{message.time}</span>
                                    </div>
                                    {message.sender === 'self' && (
                                        <img src={message.avatar} alt="User Avatar" className="rounded-full w-[40px] h-[40px] object-contain inline-block  ml-3" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-4 border-t-customLightBorder flex items-center">
                            <div className='relative w-full '>
                                <input className="w-full bg-transparent border-customLightBorder border p-3 rounded-[25px] outline-none placeholder:text-customSmallGray" placeholder="Write a message..." />
                                <span className='absolute right-3 top-3 '>
                                    <img src={image.camera} alt='' className="cursor-pointer w-[25px] h-[25px] object-contain inline-block align-top  " />
                                </span>
                            </div>
                            <img src={image.sender} alt className='inline-block mx-2 w-[50px] h-[50px] object-contain ' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chats;
