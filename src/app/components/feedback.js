"use client";

import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});

const Feedback = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", values.description);
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
              htmlFor="description"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              Feedback
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Write feedback"
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

export default Feedback;
