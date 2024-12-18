"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import CustomToast from "../components/toast";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supportFormApi } from "./api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(" Name is required"),
  email: Yup.string().required("Email is required"),
  description: Yup.string().required("Description is required"),
});

const ContactUs = () => {
  const [contactData, setContactData] = useState();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);

      const params = {
        name: values.name,
        email: values.email,
        description: values.description,
      };
      try {
        const response = await supportFormApi(params);
        if (response?.success) {
          toast.success(<CustomToast content={response?.message} />);
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
  });
  return (
    <>
      <section className="p-2 md:mx-28 mx-4 my-7">
        <h2 className="text-2xl text-customBlue font-semibold mb-4 text-center">
          Contact Us
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="mt-[12px]">
              <label
                htmlFor="name"
                className="text-[17px] font-medium text-customBlue"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-customRed">{formik.errors.name}</div>
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
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                border border-[#CFCFCF] rounded-[25px]"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-customRed">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-[12px]">
            <label
              htmlFor="description"
              className="text-[17px] font-medium text-customBlue"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter Description"
              rows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <div className="text-customRed">{formik.errors.description}</div>
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
      </section>
    </>
  );
};

export default ContactUs;
