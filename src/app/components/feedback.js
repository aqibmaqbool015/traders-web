"use client";

import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { addFeedbackApi } from "../user-profile/api";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "./toast";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  feedback: Yup.string().required("Feedback is required"),
});

const Feedback = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("feedback", values.feedback);
      const response = await addFeedbackApi(formData);
      try {
        if (response?.success) {
          toast.success(<CustomToast content="Your Feedback is submitted." />);
        } else {
          console.error(
            "Error submiting feedback:",
            response?.message || "Unknown error"
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <h2
        className="text-2xl text-customBlue font-semibold mb-4
      capitalize"
      >
        Feedback
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="mt-[12px]">
            <label
              htmlFor="feedback"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              Feedback
            </label>
            <textarea
              type="text"
              id="feedback"
              name="feedback"
              placeholder="Write feedback"
              value={formik?.values?.feedback}
              rows={5}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
            {formik.errors.feedback ? (
              <div className="text-customRed">{formik.errors.feedback}</div>
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

export default Feedback;
