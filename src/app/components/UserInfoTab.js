"use client";
import { useEffect, useState } from "react";
import { inputProfile, yourProfileList } from "../constant";
import PersonalInfo from "./personalInfo";
import Leaderboard from "./leaderBoard";
import Wishlist from "./wishlist";
import Subscription from "./subscription";
import Image from "next/image";
import MyPost from "./myPost";
import SnagList from "./snagList";
import WantedList from "./wantedList";
import ManageLocation from "./manageLocation";
import Feedback from "./feedback";
import ChangePassword from "./changePassword";
import TermsCondition from "./termsCondition";
import PrivacyPolicy from "./privacyPolicy";
import { useRouter } from "next/navigation";
import RetailCheck from "./retailCheck";

const image = {
  logout: "/info-14.svg",
  delete: "/info-15.svg",
  crossBlue: "/cross.svg",
};

const UserInfoTab = ({
  isLeaderBoard,
  userProfile,
  setUserProfile,
  isWishlist,
  isVehcilesPost,
  isAllWanted,
  handleModalOpen,
  rowsPerPage,
  handleShowMore,
  showLoading,
  totalPages,
}) => {
  const router = useRouter();
  const { query } = router;
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab("Personal Information");
    }
  }, []);

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
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalOpenLogout = () => setIsLogoutModal(true);
  const handleModalCloseLogout = () => setIsLogoutModal(false);

  const handleLogout = () => {
    localStorage.removeItem("");
    sessionStorage.clear();
    router.push("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Information":
        return (
          <PersonalInfo
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            handleImageUpload={handleImageUpload}
            inputProfile={inputProfile}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      case "Leaderboard":
        return (
          <Leaderboard
            isLeaderBoard={isLeaderBoard}
            handleModalOpen={handleModalOpen}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            handleShowMore={handleShowMore}
            showLoading={showLoading}
          />
        );
      case "Wishlist":
        return (
          <>
            <h2
              className="text-2xl text-customBlue font-semibold mb-4
    capitalize"
            >
              Wishlist
            </h2>
            {isWishlist?.length === 0 ? (
              <>
                <p className="text-center text-customBlue">
                  No Wishlists available
                </p>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {isWishlist?.map((wishlists, index) => (
                  <Wishlist key={index} wishlists={wishlists} />
                ))}
              </div>
            )}
          </>
        );
      case "Subscription":
        return <Subscription />;
      case "My Post":
        return (
          <>
            <h2
              className="text-2xl text-customBlue font-semibold mb-4
      capitalize"
            >
              my post
            </h2>
            {isVehcilesPost?.length === 0 ? (
              <>
                <div className="flex justify-center">
                  <p className="text-center animate-spin rounded-full h-12 w-12 border-t-2 border-customBlue border-opacity-50 mr-2 my-5 "></p>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {isVehcilesPost?.map((vehicle, index) => (
                  <MyPost key={index} vehicle={vehicle} />
                ))}
              </div>
            )}
          </>
        );

      case "Snag List":
        return <SnagList />;
      case "Wanted Section":
        return (
          <>
            <h2
              className="text-2xl text-customBlue font-semibold mb-4
  capitalize"
            >
              Wanted list
            </h2>
            {isAllWanted?.length === 0 ? (
              <>
                <p className="text-center text-customBlue">
                  No wanted list available
                </p>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {isAllWanted?.map((wanted, index) => (
                  <WantedList key={index} wanted={wanted} />
                ))}
              </div>
            )}
          </>
        );

      case "Retail Check":
        return <RetailCheck />;
      case "Manage Location":
        return <ManageLocation />;
      case "Feedback":
        return <Feedback />;
      case "Change Password":
        return <ChangePassword />;
      case "Terms & Conditions":
        return <TermsCondition />;
      case "Privacy Policy":
        return <PrivacyPolicy />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   const id = pathname.split("/")[2];
  //   if (id) {
  //     fetchGetVehicleDetail(id);
  //   }
  // }, [pathname]);

  return (
    <div className="min-h-screen md:flex">
      <div
        className="md:w-1/4 px-4 md:px-0 bg-white shadow-lg border-r border-r-customBg
      md:sticky md:top-0 md:h-fit
      "
      >
        <div>
          <h2 className="text-xl text-customBlue font-bold mb-4 px-4 pt-5">
            Your Profile
          </h2>
          <ul className="space-y-4 h-[550px] overflow-y-auto ">
            {yourProfileList.map((item, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 md:px-5 cursor-pointer border-b border-b-customBg pb-4 ${
                  activeTab === item.name
                    ? "text-customBlue font-medium"
                    : "text-customDarkGray font-normal"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <span className="">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 mx-2"
                    width={20}
                    height={20}
                  />
                </span>
                <span className="text-lg">{item.name}</span>
              </li>
            ))}
            <li
              className="flex items-center space-x-2 md:px-5 cursor-pointer border-b border-b-customBg pb-4 "
              onClick={handleModalOpenLogout}
            >
              <span className="">
                <Image
                  src={image.logout}
                  width={30}
                  height={30}
                  alt=""
                  className="w-5 h-5 mx-2"
                />
              </span>
              <span className="text-lg capitalize text-customRed">logout</span>
            </li>
            <li
              className="flex items-center space-x-2 md:px-5 cursor-pointer border-b border-b-customBg pb-4 "
              onClick={handleModalOpen}
            >
              <span className="">
                <Image
                  src={image.delete}
                  width={30}
                  height={30}
                  alt=""
                  className="w-5 h-5 mx-2"
                />
              </span>
              <span className="text-lg capitalize text-customRed ">
                Delete Account
              </span>
            </li>
          </ul>
        </div>
      </div>

      {isLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="Close"
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={handleModalCloseLogout}
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <div className="my-4 px-4">
              <p className="text-[15px] text-customBlackLight text-center ">
                Do you really want to logout your account.
              </p>
              <div className="my-3 text-center">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-white capitalize mx-2 bg-customRed border border-transparent rounded-[20px] px-3 min-w-[100px] py-1 "
                >
                  {loading ? "Loading..." : "Logout"}
                </button>
                <span
                  onClick={handleModalCloseLogout}
                  className="text-customBlue inline-block capitalize mx-2 bg-transparent border border-customBlue rounded-[20px] px-3 min-w-[100px] py-1
                        cursor-pointer "
                >
                  cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:w-3/4 bg-white md:p-6 p-3">{renderContent()}</div>
    </div>
  );
};

export default UserInfoTab;
