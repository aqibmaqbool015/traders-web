import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUserProfile } from "../login/api";
import { Image_base } from "@/networking/network";

const image = {
  logo: "/logo-trade.svg",
  bell: "/bell.svg",
  user: "/user.svg",
  profile: "user2.png",
};

const Header = () => {
  const router = useRouter();
  const handleCLick = () => {
    router.push("/home");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    fetchGetProfile();
  }, []);

  const fetchGetProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.data) {
        setUserProfile(response?.data);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setUserProfile([]);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const onClickChat = () => {
    localStorage.setItem("senderId", null);
    router.push("/chats");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <span className="cursor-pointer" onClick={handleCLick}>
              <Image
                src={image.logo}
                width={140}
                height={50}
                alt="Logo"
                className="md:w-[140px] w-[110px] h-auto"
              />
            </span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/home"
              className="px-2 text-customColorNav text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              HOME
            </Link>
            <Link
              href="/auctions"
              className="px-2 text-customColorNav text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              AUCTION
            </Link>
            <div
              onClick={onClickChat}
              className="px-2 text-customColorNav cursor-pointer text-[15px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              CHATS
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <span>
              <Image
                src={image.bell}
                height={10}
                width={18}
                alt="Bell"
                className="w-[18px] h-auto"
              />
            </span>
            <Link
              href="/add-vehicle"
              className="bg-customBlue text-white py-2 px-5 rounded-[25px] font-medium"
            >
              + SELL
            </Link>
            <div className="flex items-center">
              {/* <Link
                href="/user-profile"
                className="text-customColorNav text-[16px] cursor-pointer font-medium mx-4"
              >
                Profile{" "}
              </Link> */}
              <span className="flex items-center">
                <Image
                  src={
                    `${Image_base}${userProfile?.profilePicture}` ||
                    image.profile
                    // userProfile?.profilePicture?.length > 0
                    //   ? `${Image_base}${userProfile?.profilePicture[0]}`
                    //   : image.profile
                  }
                  onClick={toggleDropdown}
                  width={22}
                  height={10}
                  alt=""
                  className="w-[30px] h-auto cursor-pointer rounded-full "
                />
                <span className="text-customBlue mx-2 text-[14px] inline-block ">
                  {userProfile?.firstName}
                </span>
              </span>
              {isDropdownOpen && (
                <div className="absolute right-4 mt-28 w-24 p-1 bg-white border border-customGray rounded shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <Link
                    href="/user-profile"
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Settings{" "}
                  </Link>
                </div>
              )}
              {/* <span>
                                <Image src={image.user} width={22} height={10} alt="User" className="w-[22px] h-auto" />
                            </span>
                            <Link href="/login" className="text-customColorNav text-[16px] cursor-pointer font-medium mx-2">Login / </Link>
                            <Link href="/signup" className="text-customColorNav text-[16px] cursor-pointer font-medium">Sign Up</Link> */}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } bg-white shadow-lg`}
        >
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              href="/"
              className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              HOME
            </Link>
            <Link
              href="/auction"
              className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              AUCTION
            </Link>
            <Link
              href="/chats"
              className="px-2 text-customColorNav text-[16px] font-medium hover:text-customBlue hover:underline underline-offset-8"
            >
              CHATS
            </Link>
            <div className="flex items-center">
              <span>
                <Image
                  src={image.user}
                  alt="User"
                  width={22}
                  height={10}
                  className="w-[22px] h-auto"
                />
              </span>
              <Link
                href="/login"
                className="text-customColorNav text-[16px] font-medium mx-2"
              >
                Login /{" "}
              </Link>
              <Link
                href="/signup"
                className="text-customColorNav text-[16px] font-medium"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
