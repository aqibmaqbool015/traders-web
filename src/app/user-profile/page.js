"use client";
import Image from "next/image";
import UserInfoTab from "../components/UserInfoTab";
import { getUserProfile } from "../login/api";
import { useEffect, useState } from "react";
import { Image_base } from "@/networking/network";
import {
  deleteUserApi,
  getAllWantedApi,
  getLeaderboardAPi,
  getUserPostsApi,
  getWishlistApi,
} from "./api";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const image = {
  avatar: "/chat-user.png",
  crossBlue: "/cross.svg",
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    // firstName: "",
    // lastName: "",
    // email: "",
    // phone: "",
    // companyName: "",
    // bio: "",
  });
  const [isLeaderBoard, setIsLeaderBoard] = useState([]);
  const [isWishlist, setIsWishlist] = useState([]);
  const [isVehcilesPost, setIsVehcilesPost] = useState([]);
  const [isAllWanted, setIsAllWanted] = useState([]);
  const [feedback, setFeedback] = useState();
  const user = useSelector((state) => state?.User);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalOpen = () => setIsDeleteModal(true);
  const handleModalClose = () => setIsDeleteModal(false);
  const userId = user?.data?._id;
  const [showLoading, setShowLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;
  const router = useRouter();
  
 

  useEffect(() => {
    fetchAllWanted();
  }, []);

  const fetchAllWanted = async () => {
    try {
      const response = await getAllWantedApi();
      if (response?.data) {
        setIsAllWanted(response?.data);
      }
    } catch (error) {
      console.error("Error fetching Wanted List", error);
      setIsVehcilesPost([]);
    }
  };

  useEffect(() => {
    fetchVehilesPost();
  }, []);

  const fetchVehilesPost = async () => {
    try {
      const response = await getUserPostsApi();
      if (response?.data) {
        setIsVehcilesPost(response?.data);
      }
    } catch (error) {
      console.error("Error fetching Vehicles Post", error);
      setIsVehcilesPost([]);
    }
  };

  useEffect(() => {
    fetchGetWIshlist();
  }, []);

  const fetchGetWIshlist = async () => {
    try {
      const response = await getWishlistApi();
      if (response?.data) {
        setIsWishlist(response?.data);
      }
    } catch (error) {
      console.error("Error fetching User Leaderboard", error);
      setIsWishlist([]);
    }
  };
  
  useEffect(() => {
    fetchLeaderBoard(currentPage);
  }, [currentPage]);

  const fetchLeaderBoard = async (page) => {
    try {
      const data = await getLeaderboardAPi({ page, limit: rowsPerPage });
      // if (data?.data) {
      //   setIsLeaderBoard(data?.data);
      // }
      if (data?.data) {
        setIsLeaderBoard((prevLeaderBoard) => [
          ...prevLeaderBoard,
          ...data?.data,
        ]);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.error("Error fetching User Leaderboard", error);
      setIsLeaderBoard([]);
    }
  };

  const handleShowMore = () => {
    setShowLoading(true);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
      console.error("Error fetching User Profile:", err);
      setUserProfile([]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const params = {
      userId: userId,
    };
    const response = await deleteUserApi(params);
    if (response) {
      router.push("/");
      handleModalClose();
    }

    setLoading(false);
  };

  return (
    <>
      <div className="">
        <div className="bg-white p-4 border-b border-b-customLightBorder flex items-center">
          <Image
            src={`${Image_base}${userProfile?.profilePicture}` || image.avatar}
            alt=""
            className="w-[40px] h-[40px] inline-block object-contain rounded-full "
            width={40}
            height={40}
          />
          <div>
            <h1 className="font-bold text-lg text-customBlue mx-3">
              {userProfile?.firstName} {""}
              {userProfile?.lastName}
            </h1>
            <p className="font-normal text-[13px] text-customMessage mx-3">
              {userProfile?.email}
            </p>
          </div>
        </div>
      </div>
      <UserInfoTab
        isLeaderBoard={isLeaderBoard}
        setIsLeaderBoard={setIsLeaderBoard}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        isWishlist={isWishlist}
        isVehcilesPost={isVehcilesPost}
        isAllWanted={isAllWanted}
        handleModalOpen={handleModalOpen}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handleShowMore={handleShowMore}
        showLoading={showLoading}
      />
      {isDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="Close"
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={handleModalClose}
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <div className="my-4 px-4">
              <p className="text-[15px] text-customBlackLight text-center ">
                Do you really want to delete your account. All your details will
                be removed from our site.
              </p>
              <div className="my-3 text-center">
                <span
                  onClick={handleModalClose}
                  className="text-customBlue inline-block capitalize mx-2 bg-transparent border border-customBlue rounded-[20px] px-3 min-w-[100px] py-1
                  cursor-pointer "
                >
                  cancel
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="text-white capitalize mx-2 bg-customRed border border-transparent rounded-[20px] px-3 min-w-[100px] py-1 "
                >
                  {loading ? "Loading..." : "delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
