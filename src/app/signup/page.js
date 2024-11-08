"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { signUpApi } from "./api";

const CustomToast = ({ closeToast }) => (
  <div>
    <h6 className="text-customBlue font-normal text-[13px]">
      Your account registration request is under review. You can contact us at
    </h6>
    <h6>
      <a
        href="mailto:support@trade2trade.co.uk"
        className="text-customOrange font-normal text-[13px]"
      >
        support@trade2trade.co.uk
      </a>
    </h6>
    <div className="text-center">
      <button
        onClick={closeToast}
        className="text-center inline-block bg-customBlue text-white px-1 py-2 
        rounded-[25px] shadow-sm text-sm w-[80px] !mt-3"
      >
        OK
      </button>
    </div>
  </div>
);

export default function SignUpPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.slices?.User);

  const [formValues, setFormValues] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    rPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      validate();
    }
  }, [formValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validate({ [name]: value });
  };

  const validate = (fieldValue = formValues) => {
    const temp = { ...errors };

    if ("fName" in fieldValue) {
      temp.fName = fieldValue.fName ? "" : "First name is required";
    }

    if ("lName" in fieldValue) {
      temp.lName = fieldValue.lName ? "" : "Last name is required";
    }

    if ("email" in fieldValue) {
      temp.email = fieldValue.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue.email)
          ? ""
          : "Invalid email format"
        : "Email is required";
    }

    if ("phone" in fieldValue) {
      temp.phone = fieldValue.phone
        ? /^[0-9]{10}$/.test(fieldValue.phone)
          ? ""
          : "Phone must be a valid 10-digit number"
        : "Phone number is required";
    }
    

    if ("company" in fieldValue) {
      temp.company = fieldValue.company ? "" : "Company name is required";
    }

    if ("password" in fieldValue) {
      temp.password = fieldValue.password
        ? fieldValue.password.length >= 6
          ? ""
          : "Password must be at least 6 characters"
        : "Password is required";
    }

    if ("rPassword" in fieldValue) {
      temp.rPassword = fieldValue.rPassword
        ? fieldValue.rPassword === fieldValue.password
          ? ""
          : "Passwords do not match"
        : "Confirm Password is required";
    }

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!validate(formValues)) {
      toast.error("Please fix the validation errors");
      return;
    }

    const params = {
      firstName: formValues.fName,
      lastName: formValues.lName,
      email: formValues.email,
      phone: formValues.phone,
      companyName: formValues.company,
      password: formValues.password,
      confirmPassword: formValues.rPassword,
    };

    try {
      setLoading(true);
      const response = await signUpApi(params);
      console.log("Full API Response:", response);

      if (response && response.success) {
        const email = formValues.email;
        if (typeof email === "string" && email) {
          console.log("Navigating to OTP page with email:", email);

          const otpPagePath = `/otp?email=${encodeURIComponent(email)}`;
          await router.push(otpPagePath);
          toast.success(<CustomToast />);
        } else {
          console.error("Invalid email value:", email);
          toast.error("Invalid email. Please try again.");
        }
      } else {
        console.error("Unexpected response structure:", response);
        throw new Error(response.message || "Invalid response from API");
      }
    } catch (error) {
      console.error("Signup API error:", error);
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    router.push("/login");
  };

  const image = {
    image: "/auth.png",
    logo: "/logo-trade.svg",
    google: "/google.svg",
    facebook: "/fb.svg",
    apple: "/apple.svg",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Signup Page</title>
      </Head>

      <div className="w-full flex flex-col items-center">
        <div className="text-left w-full">
          <img
            src={image.logo}
            alt="Car Dealership"
            className="w-[140px] h-auto"
          />
        </div>
        <div className="max-w-md w-full px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            Sign Up
          </h1>
          <h6 className="text-2xl font-normal mb-8 text-center text-[14px] leading-normal text-customBlue">
            Register your valid email address
          </h6>

          <form className="space-y-4" onSubmit={handleSignUp}>
            {[
              "fName",
              "lName",
              "email",
              "phone",
              "company",
              "password",
              "rPassword",
            ].map((field, index) => (
              <div key={index}>
                <label htmlFor={field} className="text-[17px] text-customBlue">
                  {field === "fName"
                    ? "First Name"
                    : field === "lName"
                    ? "Last Name"
                    : field === "rPassword"
                    ? "Re-type Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  id={field}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={formValues[field]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 shadow-sm border border-[#CFCFCF] rounded-[25px]"
                />
                {errors[field] && (
                  <div className="text-customRed text-sm mt-1">
                    {errors[field]}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className={`w-full py-3 text-white bg-customBlue rounded-[25px] hover:bg-blue-700" ${
                loading ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
              ) : null}
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <h6 className="text-2xl font-normal mb-8 text-center text-[15px] text-customText">
              Already have an account?{" "}
              <span
                className="text-customOrange font-medium cursor-pointer"
                onClick={handleSignInClick}
              ></span>
            </h6>
            <ToastContainer position="top-center" />
          </form>

          <div className="mt-6 flex justify-center grid-cols-3 gap-3 mb-4">
            {["google", "facebook", "apple"].map((provider, index) => (
              <div
                key={index}
                className="w-[90px] md:w-[120px] text-center bg-customBg py-2 px-2 rounded-[25px]"
              >
                <a href="#">
                  <img
                    src={image[provider]}
                    alt={provider}
                    className="w-[21px] inline-block h-auto"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
