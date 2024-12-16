"use client";
import { useState } from "react";
import { uploadDocuments } from "../home/api";
import { getUserProfile } from "../login/api";
import { setUser } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../components/toast";
import Image from "next/image";

const image = {
  logo: "/logo-trade.svg",
  vector: "/person.svg",
  camera: "/camera.svg",
  plas: "/plus.svg",
};

const Profile = ({ setIsModalOpen, setIsModalDocumentsOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.data);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [insurancePreview, setInsurancePreview] = useState(null);

  const [formValues, setFormValues] = useState({
    email: "",
    firstna: "",
    phone: "",
  });

  const handleImageUpload = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleClick = () => {
    router.push("/search");
  };

  const handleSubmitDocuments = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const profileResponse = await getUserProfile();
      const userProfile = profileResponse?.data;

      if (!userProfile) {
        console.error("Failed to retrieve user profile");
        return;
      }

      const { email, firstName, lastName } = userProfile;
      const formData = new FormData();

      if (profileImage) {
        formData.append("selfie", profileImage);
      } else {
        console.error("Profile image is required.");
      }

      if (frontImage) {
        formData.append("drivingLicence", frontImage);
      } else {
        console.error("Front image is required.");
      }

      if (insurance) {
        formData.append("insurance", insurance);
      } else {
        console.error("Insurance document is required.");
      }

      formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      try {
        const responseDocuments = await uploadDocuments(formData);

        if (responseDocuments.success) {
          const res = await getUserProfile();
          const userData = res?.data;

          if (userData?.paidMember === false) {
            router.push("/subscription");
            setIsModalOpen(false);
          } else if (userData?.reviewStatus === "reviewing") {
            toast.success(
              <CustomToast
                content="Your upload documents request is under review."
                contact="you can contact at"
                mail="support@trade2trade.co.uk"
              />
            );
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            // router.push("/home");
            dispatch(setUser(res));
          }
        } else {
        }
      } catch (uploadError) {
        console.error("Error in document upload:", uploadError);
      }
    } catch (error) {
      console.error("Error retrieving user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-left mx-4 my-3">
        <Image
          src={image.logo}
          width={140}
          height={50}
          alt="img"
          className="w-[140px] h-[70px]"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="max-w-md w-full px-4 md:px-0">
          <form
            className="min-h-screen flex flex-col items-center p-4"
            onSubmit={handleSubmitDocuments}
          >
            <h1 className="text-2xl font-semibold mb-4 text-center md:text-[30px] text-[25px] text-customBlue">
              Upload Documents
            </h1>
            <div className="w-full md:w-[400px]">
              <div className="flex justify-center mb-3">
                <div className="w-24 h-24 bg-customGray rounded-full relative">
                  {profileImage ? (
                    <Image
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src={image.vector}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                  <span className="absolute bottom-0 right-0 bg-white rounded-full w-[28px] h-[28px] p-[5px]">
                    <label
                      htmlFor="profileImage"
                      className="cursor-pointer w-[17px] h-full inline-block"
                    >
                      <Image
                        src={image.camera}
                        alt="img"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </label>
                  </span>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, setProfileImage, setProfilePreview)
                    }
                  />
                </div>
              </div>
              <p className="text-center text-sm font-normal text-customBlue mb-6">
                Upload Your Driving License/Passport
              </p>

              <div className="mb-4">
                <label className="block text-customBlue font-medium mb-2">
                  Front
                </label>
                <div className="border-dashed border-2 border-customGray rounded-lg text-center bg-customLight h-[200px] grid place-items-center">
                  {frontImage ? (
                    <Image
                      src={URL.createObjectURL(frontImage)}
                      alt="Front ID"
                      width={390}
                      height={190}
                      className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                    />
                  ) : (
                    <div className="text-center w-full h-full relative flex justify-center items-center ">
                      <div>
                        <label className="block cursor-pointer absolute w-full h-full left-0 top-0 ">
                          <Image
                            src={image.plas}
                            alt="img"
                            width={25}
                            height={25}
                            className="w-[25px] h-[25px] object-contain inline-block mt-14
                             "
                            //  relative top-[30%] left-[48%]
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                setFrontImage,
                                setFrontPreview
                              )
                            }
                          />
                        </label>
                        <p className="text-customDarkGray">
                          Upload front side of your ID
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-customBlue font-medium mb-2">
                  Back
                </label>
                <div className="border-dashed border-2 border-customGray rounded-lg text-center bg-customLight h-[200px] flex items-center justify-center">
                  {backImage ? (
                    <Image
                      src={URL.createObjectURL(backImage)}
                      alt="Back ID"
                      width={390}
                      height={190}
                      className="object-cover rounded-lg h-[190px] md:w-[390px] w-[375px] max-w-full"
                    />
                  ) : (
                    <div className="text-center w-full h-full relative flex justify-center items-center ">
                      <div>
                        <label className="block cursor-pointer absolute w-full h-full left-0 top-0 ">
                          <Image
                            src={image.plas}
                            width={30}
                            height={30}
                            alt="img"
                            className="w-[25px] h-[25px] object-contain inline-block mt-14"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, setBackImage, setBackPreview)
                            }
                          />
                        </label>
                        <p className="text-customDarkGray">
                          Upload back side of your ID
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-6 mt-4">
                <label className="block text-customBlue font-medium">
                  Insurance Documents
                </label>
                <p className="text-customDarkGray text-[14px]">Attachments</p>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2"
                  onChange={(e) =>
                    handleImageUpload(e, setInsurance, setInsurancePreview)
                  }
                />
              </div>
              <ToastContainer position="top-right" />

              <button
                type="submit"
                className={`w-full py-3 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-4 ${
                  loading ? "cursor-not-allowed opacity-75" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                ) : null}
                {loading ? "Loading..." : "Upload Documents"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
