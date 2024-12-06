"use client";

import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { createSnagApi } from "../user-profile/api";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  image: Yup.mixed().required("File is required"),
});

const SnagList = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      // formData.append("file", values.file);
      if (values.image) {
        formData.append("image", values.image);
      }
      try {
        const response = await createSnagApi(formData);
        if (response?.success) {
          console.log("Profile updated successfully.");
          window.location.reload();
        } else {
          console.error(
            "Error updating profile:",
            response?.message || "Unknown error"
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      formik.setFieldValue("image", image);
    }
  };
  return (
    <>
      <h2
        className="text-2xl text-customBlue font-semibold mb-4
      capitalize"
      >
        Personal Information
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="mt-[12px]">
            <label
              htmlFor="title"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your first name"
              value={formik?.values?.title}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            />
            {formik.errors.title ? (
              <div className="text-customRed">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mt-[12px]">
            <label
              htmlFor="description"
              className="text-[17px] font-medium text-customBlue"
            >
              description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter description"
              value={formik?.values?.description}
              rows={5}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
            {formik.errors.description ? (
              <div className="text-customRed">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-6 mt-4">
            <label
              htmlFor="image"
              className="block text-customBlue font-medium"
            >
              Attachments
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              id="image"
              onChange={handleImageUpload}
            />
            {formik.errors.image && (
              <div className="text-customRed">{formik.errors.image}</div>
            )}
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

export default SnagList;
