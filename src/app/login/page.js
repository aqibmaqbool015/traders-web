"use client";
import Head from "next/head";
import CustomInput from "../components/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { getUserProfile, LoginApi } from "./api";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorageItem } from "@/utils/localStorage";
import Image from "next/image";
import CustomToast from "../components/toast";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.slices?.User);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formValues.email, formValues.password, isSubmitted]);

  const validateForm = () => {
    let validationErrors = {};

    const { email, password } = formValues;

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  const handleForgotClick = (e) => {
    e.preventDefault();
    router.push("/forgot");
  };

  const image = {
    image: "/auth.png",
    logo: "/logo-trade.svg",
    google: "/google.svg",
    facebook: "/fb.svg",
    apple: "/apple.svg",
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
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      labelClass: "text-[17px] text-customBlue",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSubmitted) return;
    setIsSubmitted(true);
    validateForm(true);
    // if (!isFormValid) {
    //   setIsSubmitted(false);
    //   return;
    // }
    const params = {
      email: formValues.email,
      password: formValues.password,
    };
    try {
      const response = await LoginApi(params);
      await setLocalStorageItem("token", response?.token);
      if (response) {
        const res = await getUserProfile();
        if (res?.data?.paidMember === false) {
          router.push("/subscription");
          return;
        }

        if (res?.data?.reviewStatus === "rejected") {
          router.push("/profile");
          return;
        }

        if (res?.data?.reviewStatus === "reviewing") {
          toast.success(
            <CustomToast
              content="Your upload documents request is under review."
              contact="You can contact us at"
              mail="support@trade2trade.co.uk"
            />
          );
          return;
        }

        if (res?.data?.reviewStatus === "reviewed") {
          toast.success(<CustomToast content="Reviewed successfully" />);
        }
        router.push("/home");
        dispatch(setUser(res));
      }
    } catch (error) {
      toast.error(<CustomToast content="Error in handleSubmit:" />);
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="text-left w-full">
          <Image
            src={image.logo}
            width={140}
            height={50}
            alt="img"
            className="w-[100px] h-auto mx-2 my-2"
          />
        </div>
        <div className="max-w-md w-full py-5 px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            Sign In
          </h1>
          <h6 className="text-2xl font-normal mb-8 text-center text-[14px] leading-normal text-customBlue">
            Please sign in to continue
          </h6>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {inputFields.map((field, index) => (
              <div key={index}>
                <CustomInput
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formValues[field.name]}
                  labelClass={field.labelClass}
                  onChange={handleInputChange}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="mt-[10px]">
              <div className="text-sm text-right">
                <a
                  href="#"
                  className="font-medium text-customOrange"
                  onClick={handleForgotClick}
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue "
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
              ) : null}
              {loading ? "Loading..." : "Sign In"}
            </button>

            <h6 className="text-2xl font-normal mb-8 text-center text-[15px] text-customText">
              Don’t have an account?{" "}
              <span
                className="text-customOrange font-medium cursor-pointer"
                onClick={handleSignUpClick}
              >
                Sign Up
              </span>
            </h6>
            <ToastContainer position="top-right" />
          </form>

          <div className="mt-6 flex justify-center grid-cols-3 gap-3">
            <div className="w-[90px] md:w-[120px] text-center bg-customBg py-2 px-2 rounded-[25px]">
              <a href="#">
                <Image
                  src={image.google}
                  width={21}
                  height={21}
                  alt="Google"
                  className="w-[21px] inline-block h-auto"
                />
              </a>
            </div>
            <div className="w-[90px] md:w-[120px] text-center bg-customBg py-2 px-2 rounded-[25px]">
              <a href="#">
                <Image
                  src={image.facebook}
                  alt="Facebook"
                  width={21}
                  height={21}
                  className="w-[21px] inline-block h-auto "
                />
              </a>
            </div>
            <div className="w-[90px] md:w-[120px] text-center bg-customBg py-2 px-2 rounded-[25px]">
              <a href="#">
                <Image
                  src={image.apple}
                  alt="Apple"
                  width={21}
                  height={21}
                  className="w-[21px] inline-block h-auto "
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[45%]">
        <Image
          src={image.image}
          alt="img"
          fill
          className="h-full w-full !relative"
        />
      </div>
    </div>
  );
}
