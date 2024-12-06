"use client";
import { useState } from "react";
import { inputProfile, yourProfileList } from "../constant";
import PersonalInfo from "./personalInfo";
import Leaderboard from "./leaderBoard";
import Wishlist from "./wishlist";
import Subscription from "./subscription";
import Image from "next/image";

const UserInfoTab = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [profileImage, setProfileImage] = useState(null);

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

  const image = {
    logout: "/info-14.svg",
    delete: "/info-15.svg",
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
          />
        );
      case "Leaderboard":
        return <Leaderboard />;
      case "Wishlist":
        return <Wishlist />;
      case "Subscription":
        return <Subscription />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <div className="md:w-1/4 px-4 md:px-0 bg-white shadow-lg border-r border-r-customBg">
        <div>
          <h2 className="text-xl text-customBlue font-bold mb-4 px-4 pt-5">
            Your Profile
          </h2>
          <ul className="space-y-4">
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
                  />
                </span>
                <span className="text-lg">{item.name}</span>
              </li>
            ))}
            <li className="flex items-center space-x-2 md:px-5 cursor-pointer border-b border-b-customBg pb-4 ">
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
            <li className="flex items-center space-x-2 md:px-5 cursor-pointer border-b border-b-customBg pb-4 ">
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

      {/* Main Content */}
      <div className="md:w-3/4 bg-white p-6">{renderContent()}</div>
    </div>
  );
};

export default UserInfoTab;
