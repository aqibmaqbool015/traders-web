import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { updateProfileApi } from "../user-profile/api";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),

  phone: Yup.number()
    .required("Phone is required")
    .typeError("Invalid phone number"),
  bio: Yup.string().required("Bio is required"),
});

const PersonalInfo = ({
  profileImage,
  handleImageUpload,
  setProfileImage,
  inputProfile,
  userProfile,
  setUserProfile,
}) => {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (typeof setUserProfile === "function") {
      setUserProfile({ ...userProfile, [name]: value });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      // profileImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("bio", values.bio);
      // if (values.profileImage) {
      //   formData.append("profileImage", values.profileImage);
      // }

      try {
        const response = await updateProfileApi(formData);
        console.log("API Response:", response);

        if (response?.success) {
          window.location.reload();
          console.log("Profile updated successfully.");
        } else {
          console.error(
            "Error updating profile:",
            response?.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h2 className="text-2xl text-customBlue font-semibold mb-4">
        Personal Information
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="mb-4">
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 bg-customGray rounded-full relative">
                {formik.values.profileImage ? (
                  <Image
                    src={URL.createObjectURL(formik.values.profileImage)}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />
                ) : (
                  <Image
                    src="/user-vactor.png"
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />
                )}
                <span className="absolute bottom-0 right-0 bg-white rounded-full w-[28px] h-[28px] p-[5px]">
                  <label
                    htmlFor="profileImage"
                    className="cursor-pointer w-[17px] h-full inline-block"
                  >
                    <Image
                      src="/camera.svg"
                      alt="Camera"
                      className="w-full h-full object-contain"
                      width={30}
                      height={30}
                    />
                  </label>
                </span>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "profileImage",
                      e.currentTarget.files[0]
                    )
                  }
                />
              </div>
            </div>

            <p className="my-3 text-center text-customBlackLight text-[16px] font-medium ">
              {userProfile?.firstName} {""}
              {userProfile?.lastName}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="mt-[12px]">
              <label
                htmlFor="firstName"
                className="text-[17px] font-medium text-customBlue"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                // value={formik?.values?.firstName}
                // onChange={handleInputChange}
                value={formik?.values?.firstName || userProfile?.firstName}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.errors.firstName ? (
                <div className="text-customRed">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="mt-[12px]">
              <label
                htmlFor="lastName"
                className="text-[17px] font-medium text-customBlue"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formik?.values?.lastName || userProfile?.lastName}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.errors.lastName ? (
                <div className="text-customRed">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="mt-[12px]">
              <label
                htmlFor="email"
                className="text-[17px] font-medium text-customBlue"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={userProfile?.email}
                onChange={formik.handleChange}
                disabled
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {/* {formik.errors.email ? (
                <div className="text-customRed">{formik.errors.email}</div>
              ) : null} */}
            </div>
            <div className="mt-[12px]">
              <label
                htmlFor="phone"
                className="text-[17px] font-medium text-customBlue"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                value={formik?.values?.phone || userProfile?.phone}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.errors.phone ? (
                <div className="text-customRed">{formik.errors.phone}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-[12px]">
            <label
              htmlFor="bio"
              className="text-[17px] font-medium text-customBlue"
            >
              Bio
            </label>
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Enter Description"
              value={formik?.values?.bio || userProfile?.bio}
              rows={5}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
            {formik.errors.bio ? (
              <div className="text-customRed">{formik.errors.bio}</div>
            ) : null}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="md:w-[200px] w-[130px] inline-block py-2.5 md:px-10 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-4 mx-3"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
