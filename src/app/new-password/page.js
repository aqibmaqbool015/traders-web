"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword } from "./api";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import CustomInput from "../components/input";
import { setUser } from "@/redux/slice";
import Image from "next/image";

export default function NewPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.slices?.User);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = new URLSearchParams(window.location.search).get("email");
    if (queryEmail) setEmail(queryEmail);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formValues,isSubmitted]);

  const validateForm = () => {
    let validationErrors = {};
    const { password, confirmPassword } = formValues;

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirming the password is required.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    validateForm();
    if (isFormValid) {
      const params = {
        email: email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      };
      try {
        setLoading(true);
        const response = await changePassword(params);
        console.log('response------',response);
        
        if (response.success) {
          router.push("/login");
        } else {
          setErrors(
            response.message || "Verification failed. Please try again."
          );
        }
      } catch (error) {
        console.error("API error:", error);
        setErrors("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Create Password</title>
      </Head>

      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="text-left w-full">
          <Image
            src="/logo-trade.svg"
            alt="img"
            width={140}
            height={70}
            className="w-[100px] mx-2 my-2 h-auto"
          />
        </div>
        <div className="max-w-md w-full py-8 md:py-16 px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            Create New Password
          </h1>
          <h6 className="text-2xl font-normal mb-8 text-center text-[14px] text-customBlue leading-normal">
            Your new password must be different from previously used passwords{" "}
            {email} .
          </h6>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleInputChange}
              labelClass="text-[17px] text-customBlue"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}

            <CustomInput
              label="Re-type Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              labelClass="text-[17px] text-customBlue"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword}</span>
            )}
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
          </form>
        </div>
      </div>

      <div className="w-full md:w-[45%]">
        <Image
          src="/auth-create.png"
          alt="img"
          fill
          className="h-full w-full !relative"
        />
      </div>
    </div>
  );
}
