import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
    const router = useRouter();
    const handleCLick = () => {
        router.push('/')
    }
    const [isOpen, setIsOpen] = useState(false);

    const image = {
        logo: '/logo-trade.svg',
        bell: '/bell.svg',
        user: '/user.svg',
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center ">
                    <div className="flex items-center">
                        <span className='cursor-pointer' onClick={handleCLick}>
                            <Image src={image.logo} width={140} height={50} alt="Logo" className="md:w-[140px] w-[110px] h-auto" />
                        </span>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="px-2 text-customColorNav text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8">HOME</Link>
                        <Link href="/auctions" className="px-2 text-customColorNav text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8">AUCTION</Link>
                        <Link href="/chats" className="px-2 text-customColorNav text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8">CHATS</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <span>
                            <Image src={image.bell} height={10} width={18} alt="Bell" className="w-[18px] h-auto" />
                        </span>
                        <Link href="/add-vehicle" className="bg-customBlue text-white py-2 px-5 rounded-[25px] font-medium">+ SELL</Link>
                        <div className="flex items-center">

                            <Link href="/user-profile" className="text-customColorNav text-[16px] cursor-pointer font-medium mx-4">Profile </Link>
                            <span>
                                <Image src={image.user} width={22} height={10} alt="User" className="w-[22px] h-auto" />
                            </span>
                            <Link href="/login" className="text-customColorNav text-[16px] cursor-pointer font-medium mx-2">Login / </Link>
                            <Link href="/signup" className="text-customColorNav text-[16px] cursor-pointer font-medium">Sign Up</Link>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                </div>
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link href="/" className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8">HOME</Link>
                        <Link href="/auction" className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8">AUCTION</Link>
                        <Link href="/chats" className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8">CHATS</Link>
                        <div className="flex items-center">
                            <span>
                                <Image src={image.user} alt="User" width={22} height={10}
                                 className="w-[22px] h-auto" />
                            </span>
                            <Link href="/login" className="text-customColorNav text-[16px] font-medium mx-2">Login / </Link>
                            <Link href="/signup" className="text-customColorNav text-[16px] font-medium">Sign Up</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
