"use client";

import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import * as Yup from "yup";
import { updateProfileApi } from "../user-profile/api";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "./toast";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
});

const image = {
  pin: "/pin.svg",
  arrow: "/arrow.svg",
  cross: "/cross.svg",
};

const ManageLocation = () => {
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("location", values.location);
      try {
        const response = await updateProfileApi(formData);
        if (response?.success) {
          toast.success(
            <CustomToast
              content="Your profile is updated."
            />
          );
        } else {
          console.error(
            "Error updating profile:",
            response?.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error during API call:", error);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const openLocationModal = () => setIsLocationModal(true);
  const closeLocationModal = () => setIsLocationModal(false);

  return (
    <>
      <h2 className="text-2xl text-customBlue font-semibold mb-4 capitalize">
        Manage Location
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="mb-4 relative">
            <label
              htmlFor="location"
              className="text-[17px] font-medium text-customOrange capitalize"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                border border-[#CFCFCF] rounded-[25px]"
              placeholder="Location"
              disabled
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedLocation(e.target.value);
              }}
              value={selectedLocation || formik.values?.location}
            />
            {formik.errors.location ? (
              <div className="text-customRed">{formik.errors.location}</div>
            ) : null}
            <span
              className="absolute right-2 top-10 cursor-pointer"
              onClick={openLocationModal}
            >
              <Image
                src={image.arrow}
                alt=""
                width={20}
                height={20}
                className="w-[18px] h-[18px] object-contain"
              />
            </span>
            {isLocationModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
                  <div className="p-4 relative">
                    <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                      Select Location
                    </h2>
                    <div className="absolute right-3 top-4">
                      <Image
                        src={image.cross}
                        alt="Close"
                        className="w-[15px] h-auto cursor-pointer"
                        width={15}
                        height={15}
                        onClick={closeLocationModal}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <form className="mx-6">
                      <Autocomplete
                        apiKey="AIzaSyD_KJynrQba_jgW-fo3F4ItmLiy58jD0es"
                        onPlaceSelected={(place) => {
                          const address = place?.formatted_address || "";
                          setSelectedLocation(address);
                          formik.setFieldValue("location", address);
                          closeLocationModal();
                        }}
                        options={{
                          types: ["(regions)"],
                          componentRestrictions: { country: "ru" },
                        }}
                        defaultValue=""
                        className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                          border border-[#CFCFCF] rounded-[25px]"
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || formik.isSubmitting}
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

export default ManageLocation;
