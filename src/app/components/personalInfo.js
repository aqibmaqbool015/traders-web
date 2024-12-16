"use client";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { updateProfileApi } from "../user-profile/api";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "./toast";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.number()
    .required("Phone is required")
    .typeError("Invalid phone number"),
});

const PersonalInfo = ({ userProfile, setUserProfile }) => {
  const [loading, setLoading] = useState(false);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (typeof setUserProfile === "function") {
  //     setUserProfile({ ...userProfile, [name]: value });
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      bio: userProfile?.bio || "",
      profilePicture: userProfile?.profilePicture || "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("bio", values.bio);

      try {
        const response = await updateProfileApi(formData);
        if (response?.success) {
          toast.success(<CustomToast content="Your profile is updated." />);
        } else {
          toast.error(
            <CustomToast
              content={response?.message || "Error updating profile:"}
            />
          );
        }
      } catch (error) {
        toast.error(<CustomToast content={error?.message} />);
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  const handleImageUpload = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles[0]) {
      const previewUrl = URL.createObjectURL(selectedFiles[0]);
      formik.setFieldValue("profilePicture", previewUrl);
    }
  };
  console.log(formik?.values?.profilePicture);

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
                {formik.values.profilePicture ? (
                  <Image
                    src={formik.values.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />
                ) : (
                  <Image
                    src="/user-vactor.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />
                )}
                <span className="absolute bottom-0 right-0 bg-white rounded-full w-[28px] h-[28px] p-[5px]">
                  <label
                    htmlFor="profilePicture"
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
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
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
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
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
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
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
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
    border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.touched.phone && formik.errors.phone ? (
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
              rows={5}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
            {formik.touched.bio && formik.errors.bio ? (
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
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default PersonalInfo;
