import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getUserProfile } from "../login/api";
import { Image_base } from "@/networking/network";
import { getUserNotificationApi } from "../user-profile/api";
import { formatDistance, formatDistanceToNow } from "date-fns";

const image = {
  logo: "/logo-trade.svg",
  bell: "/bell.svg",
  user: "/user.svg",
  profile: "user2.png",
  menu: "/menu.png",
  bellIcon: "/bell-icon.svg",
};

const Header = () => {
  // const handleCLick = () => {
  //   router.push("/home");
  // };
  // const handleCLickAuctions = () => {
  //   router.push("/auctions");
  // };

  const handleCLick = () => {
    router.push("/home");
  };
  const handleCLickAuctions = () => {
    router.push("/auctions");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    fetchAllNotification();
  }, []);

  const fetchAllNotification = async () => {
    try {
      const response = await getUserNotificationApi();

      if (response?.data) {
        setAllNotifications(response?.data);
      }
    } catch (error) {
      console.error("Error fetching Wanted List", error);
      setAllNotifications([]);
    }
  };

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
    localStorage.removeItem("");
    sessionStorage.clear(); 
    router.push("/login");
  };

  // const onClickChat = () => {
  //   localStorage.setItem("senderId", null);
  //   router.push("/chats");
  // };

  // const handleClick = (route) => {
  //   router.push(route);
  // };

  const onClickChat = () => {
    localStorage.setItem("senderId", null);
    router.push("/chats");
  };

  const router = useRouter();
  const { query } = router;

  const onClickLeaderboard = () => {
    localStorage.setItem("activeTab", "Leaderboard");
    router.push("/user-profile?tab=Leaderboard");
  };

  const currentTab =
    query?.tab || localStorage.getItem("activeTab") || "Personal Information";

  const handleSettingsClick = () => {
    localStorage.setItem("activeTab", "Personal Information");
    router.push("/user-profile");
  };
  const handleProfileClick = () => {
    localStorage.setItem("activeTab", "Personal Information");
    router.push("/user-profile?tab=Personal+Information");
  };
  const handleRetailClick = () => {
    localStorage.setItem("activeTab", "Retail Check");
    router.push("/user-profile?tab=Retail+Check");
  };
  // const getLinkClass = (linkPath) => {
  //   return pathname === linkPath ? "text-customOrange" : "text-customColorNav";
  // };

  // const [currentPath, setCurrentPath] = useState("");
  // useEffect(() => {
  //   if (router.isReady) {
  //     setCurrentPath(router.pathname);
  //   }
  // }, [router.isReady, router.pathname]);

  const handleClick = (path) => {
    router.push(path);
  };

  const pathname =
    router?.pathname ||
    (typeof window !== "undefined" ? window.location.pathname : "");

  const getLinkClass = (linkPath) => {
    const currentPath = router?.pathname || "";
    if (linkPath.includes("?")) {
      const [basePath] = linkPath.split("?");
      return currentPath === basePath
        ? "text-customOrange hover:text-customOrange"
        : "text-customColorNav hover:text-customOrange";
    }
    return currentPath === linkPath
      ? "text-customOrange hover:text-customOrange"
      : "text-customColorNav hover:text-customOrange";
  };

  // const getLinkClass = (linkPath) => {
  //   const isActive = pathname === linkPath;
  //   return isActive
  //     ? "text-customOrange hover:text-customOrange"
  //     : "text-customColorNav hover:text-customOrange";
  // };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <span
              className="cursor-pointer"
              onClick={() => handleClick("/home")}
            >
              <Image
                src={image.logo}
                width={140}
                height={50}
                alt="Logo"
                className="md:w-[100px] mx-2 my-2 w-[110px] h-auto"
              />
            </span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <div
              onClick={() => handleClick("/home")}
              className={`px-2 text-[15px] font-medium cursor-pointer hover:underline underline-offset-8 ${getLinkClass(
                "/home"
              )}`}
            >
              HOME
            </div>
            <div
              onClick={() => handleClick("/auctions")}
              className={`px-2 text-[15px] font-medium cursor-pointer hover:underline underline-offset-8 ${getLinkClass(
                "/auctions"
              )}`}
            >
              AUCTION
            </div>
            <div
              onClick={onClickChat}
              className={`px-2 text-[15px] font-medium cursor-pointer hover:underline underline-offset-8 ${getLinkClass(
                "/chats"
              )}`}
            >
              CHATS
            </div>
            <div
              onClick={onClickLeaderboard}
              className={`px-2 text-[15px] font-medium cursor-pointer hover:underline underline-offset-8 uppercase ${getLinkClass(
                "/user-profile?tab=Leaderboard"
              )}`}
            >
              LEADERBOARD
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <span className=" cursor-pointer" onClick={toggleDropdown}>
              {allNotifications ? (
                <Image
                  src={image.bell}
                  height={10}
                  width={18}
                  alt="Bell"
                  className="w-[18px] h-auto "
                />
              ) : (
                <Image
                  src={image.bellIcon}
                  height={10}
                  width={18}
                  alt="Bell"
                  className="w-[18px] h-auto "
                />
              )}

              {isDropdownOpen && (
                <div
                  className="absolute right-24 mt-6 z-50 md:w-[350px] p-1 px-2 bg-white border border-customGray rounded shadow-lg
                h-[300px] overflow-auto "
                >
                  {allNotifications?.length === 0 ? (
                    <p className="text-left text-customBlue my-5">
                      Notifications not found.
                    </p>
                  ) : (
                    <div className="md:mx-2">
                      {allNotifications?.map((item, index) => (
                        <div
                          className="px-2 py-1 my-2 bg-customBg border border-customBlue rounded-[5px] "
                          key={index}
                        >
                          <div className="w-full">
                            <p className="text-customBlue font-medium text-[16px] ">
                              {item?.title}
                            </p>
                            <p className="text-customColorNav text-[14px] font-normal">
                              {item?.body}
                            </p>
                            <p className="text-customColorNav text-[14px] font-normal text-right">
                              {item?.createdAt
                                ? `${formatDistance(
                                    new Date(item.createdAt),
                                    new Date(),
                                    { addSuffix: true }
                                  )}`.replace("about ", "")
                                : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
              <span className="flex items-center cursor-pointer relative group">
                <Image
                  src={
                    `${Image_base}${userProfile?.profilePicture}` ||
                    image.profile
                  }
                  width={22}
                  height={10}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
                <span className="text-customBlue mx-2 text-[14px] inline-block">
                  {userProfile?.firstName}
                </span>

                <div
                  className="absolute right-1 mt-36 w-32 p-1 bg-white border border-customGray rounded shadow-lg hidden group-hover:block
                z-50 "
                >
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <div
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Profile
                  </div>
                  {/* <div
                    onClick={handleRetailClick}
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Retail Check
                  </div> */}
                  <div
                    onClick={handleSettingsClick}
                    className="block w-full text-left px-4 py-2 text-sm text-customDarkGray hover:bg-gray-100"
                  >
                    Settings
                  </div>
                </div>
              </span>

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
              <span className="material-icons">
                <Image
                  src={image.menu}
                  alt=""
                  width={30}
                  height={30}
                  className="inline-block w-[25px] h-auto object-contain "
                />
              </span>
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
              href="/home"
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
