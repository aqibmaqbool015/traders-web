"use client";
import Head from "next/head";
import CustomInput from "../components/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotApi } from "./api";
import { useSelector } from "react-redux";

export default function ForgotPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.slices?.User);

  const handleOtpClick = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formValues.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const params = { email: formValues.email };
    try {
      setLoading(true);
      const response = await forgotApi(params);
      console.log(response, "Forgot password API response");

      if (response.success) {
        const url = `/forgot-otp?email=${encodeURIComponent(formValues.email)}`;
        router.push(url);
      } else {
        setError(
          response.message ||
            "Failed to send verification code. Please try again."
        );
      }
    } catch (error) {
      console.error("API error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      label: "Email",
      type: "email",
      id: "email",
      name: "email",
      placeholder: "Enter your email",
      labelClass: "text-[17px] text-customBlue",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setError("");
  };

  const image = {
    image: "/auth-forgot.png",
    logo: "/logo-trade.svg",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Forgot Page</title>
      </Head>
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="text-left w-full">
          <img
            src={image.logo}
            alt="Car Dealership"
            className="w-[140px] h-auto"
          />
        </div>
        <div className="max-w-md w-full py-8 md:py-16 px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            Forgot Password
          </h1>
          <h6 className="text-2xl font-normal mb-8 text-center text-[14px] text-customBlue leading-normal">
            Please enter your email address to receive a verification code.
          </h6>

          <form className="space-y-4" onSubmit={handleOtpClick}>
            {inputFields.map((field) => (
              <CustomInput
                key={field.id}
                label={field.label}
                type={field.type}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                value={formValues[field.name]}
                labelClass={field.labelClass}
                onChange={handleInputChange}
              />
            ))}

            {error && <p className="text-customRed mt-2 text-left">{error}</p>}

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7  ${
                loading ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
              ) : null}
              {loading ? "Loading..." : "Send"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-[45%]">
        <img src={image.image} alt="Car Dealership" className="h-full w-full" />
      </div>
    </div>
  );
}
