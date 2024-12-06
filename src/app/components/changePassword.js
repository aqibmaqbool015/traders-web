"use client";

import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { changePasswordApi } from "../user-profile/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      retypePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("newPassword", values.newPassword);
      formData.append("retypePassword", values.retypePassword);
      try {
        const response = await changePasswordApi(formData);
        if (response?.success) {
          console.log("Password Change successfully.");
          router.push("/login");
        } else {
          console.error(
            "Error updating Password:",
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
        Change Password
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
          <div className="mt-[12px]">
            <label
              htmlFor="password"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              Old Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik?.values?.password}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            />
            {formik.errors.password ? (
              <div className="text-customRed">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mt-[12px]">
            <label
              htmlFor="newPassword"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your password"
              value={formik?.values?.newPassword}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            />
            {formik.errors.newPassword ? (
              <div className="text-customRed">{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div className="mt-[12px]">
            <label
              htmlFor="retypePassword"
              className="text-[17px] font-medium text-customBlue capitalize"
            >
              Retype Password
            </label>
            <input
              type="password"
              id="retypePassword"
              name="retypePassword"
              placeholder="Enter your password"
              value={formik?.values?.retypePassword}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
            />
            {formik.errors.retypePassword ? (
              <div className="text-customRed">
                {formik.errors.retypePassword}
              </div>
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

export default ChangePassword;
