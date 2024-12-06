"use client";
import Head from "next/head";
import { otpApi, resendOtp } from "./api";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import Image from "next/image";

const OtpPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const user = useSelector((state) => state?.slices?.User);
  const [formValues, setFormValues] = useState({ OTP: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [time, setTime] = useState(90);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = new URLSearchParams(window.location.search).get("email");
    if (queryEmail) setEmail(queryEmail);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    const updatedOTP = formValues.OTP.split("");
    updatedOTP[index] = value;
    setFormValues({ ...formValues, OTP: updatedOTP.join("") });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleNewClick = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (formValues.OTP.length !== 6) {
      setError("Please enter a 6-digit OTP code.");
      return;
    }

    setError("");
    const params = { email, OTP: formValues.OTP };

    try {
      setLoading(true);
      const response = await otpApi(params);

      // if (response.success) {
      //   dispatch(setUser(response.data));
      //   router.push("/new-password");
      if (response.success) {
        const url = `/new-password?email=${encodeURIComponent(params.email)}`;
        router.push(url);
      }
      // }
      else {
        setError(response.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const params = { email };
    try {
      const response = await resendOtp(params);
      if (response.success) {
        setError("");
        setTime(90);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("API error while resending OTP:", error);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const image = { image: "/auth-otp.png", logo: "/logo-trade.svg" };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>OTP Page</title>
      </Head>

      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="text-left w-full">
          <Image
            src={image.logo}
            alt="img"
            width={140}
            height={70}
            className="w-[140px] h-auto"
          />
        </div>
        <div className="max-w-md w-full py-8 md:py-16 px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            OTP Verification
          </h1>
          <form className="space-y-4" onSubmit={handleNewClick}>
            <h6 className="text-2xl font-normal mb-8 text-center text-[14px] leading-normal text-customBlue">
              Please enter the 6-digit code sent to {email}
            </h6>

            <div className="flex flex-col items-center space-y-4">
              <label htmlFor="otp" className="text-lg font-medium mt-4">
                OTP Code
              </label>
              <div className="flex space-x-4">
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-10 h-10 text-center text-lg border border-customBlue rounded-full focus:outline-none focus:border-black appearance-none placeholder-customBlue"
                      onInput={(e) => handleInput(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={formValues.OTP[index] || ""}
                    />
                  ))}
              </div>
              {error && (
                <p className="text-customRed mt-2 text-left">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7" ${
                loading ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
              ) : null}
              {loading ? "Loading..." : "Save"}
            </button>

            <div className="flex justify-between items-center w-full mt-4">
              <button
                className="text-customOrange cursor-pointer"
                onClick={handleResendOtp}
              >
                Resend code to {email}
              </button>
              <span className="text-customOrange">{formatTime(time)}</span>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-[45%]">
        <Image src={image.image} alt="img" className="h-full w-full" />
      </div>
    </div>
  );
};

export default OtpPage;
