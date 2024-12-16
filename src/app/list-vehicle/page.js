"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { identityApi } from "./api";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../components/toast";
import "react-toastify/dist/ReactToastify.css";

export default function ListVehicle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState();
  const image = {
    logo: "/logo-trade.svg",
    search: "/search-alert.svg",
    sideImage: "/auth-forgot.png",
  };

  const handleLookupClick = async (e) => {
    e.preventDefault();
    if (!registration) {
      toast.error(
        <CustomToast content="Please enter a valid vehicle registration number." />
      );
      return;
    }
    setLoading(true);
    const params = {
      registration,
    };
    try {
      const identity = await identityApi(params);
      if (identity?.success === false) {
        toast.error(
          <CustomToast
            content={
              identity?.message || "Vehicle registration already exists."
            }
          />
        );
        return;
      }
      if (identity?.success) {
        await localStorage.setItem("regnoData", JSON.stringify(identity ?? {}));
        router.push(`/vehicle-detail?regno=${registration}`);
      }
    } catch (error) {
      toast.error(
        <CustomToast
          content={error || "Failed to lookup the vehicle. Please try again."}
        />
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>List Vehicle</title>
      </Head>

      <div className="w-full md:w-[65%] flex flex-col items-center">
        <div className="text-left w-full">
          <span className="cursor-pointer" onClick={() => router.push("/home")}>
            <Image
              src={image.logo}
              width={140}
              height={50}
              alt="Trade Logo"
              className="w-[100px] mx-2 my-2 h-auto"
            />
          </span>
        </div>

        <div className="max-w-md w-full py-8 md:py-16 px-4 md:px-0">
          <h1 className="text-2xl font-semibold mb-2 text-center text-[30px] text-customBlue">
            List your Vehicle
          </h1>
          <form className="space-y-4 mt-10" onSubmit={handleLookupClick}>
            <div className="mt-[12px]">
              <label
                htmlFor="registration"
                className="text-[17px] text-customBlue font-medium mb-3"
              >
                Vehicle Registration No.
              </label>
              <div className="relative mt-3">
                <input
                  type="text"
                  id="registration"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                  placeholder="Enter vehicle registration no."
                  className="mt-1 block w-full px-3 py-3 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  border border-[#CFCFCF] rounded-[25px]"
                />
                <Image
                  src={image.search}
                  alt="Search Icon"
                  className="absolute w-[20px] h-[20px] right-4 top-4"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                href="/add-vehicle"
                className="md:w-[200px] flex justify-center py-2.5 px-10 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`md:w-[200px] flex justify-center py-2.5 px-10 rounded-[25px] shadow-sm text-sm font-medium text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-customBlue"
                } !mt-7`}
              >
                {loading ? "Loading..." : "Lookup"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block w-full md:w-[45%]">
        <Image
          src={image.sideImage}
          alt="Side Illustration"
          fill
          className="h-full w-full !relative"
        />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
