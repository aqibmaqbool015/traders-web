"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkPaymentStatusApi, updatePremiumUser } from "./api";
import { getUserProfile } from "../login/api";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
c
import CustomToast from "../components/toast";

const Success = () => {
  const router = useRouter();
  const userPackage = useSelector((state) => state?.slice?.selectedUserPackage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleClick();
  }, []);

  const UpdateUserPayment = async (userSelectedPackage) => {
    const params = {
      packageId: userSelectedPackage,
    };
    await updatePremiumUser(params);
  };

  const handleClick = async () => {
    setLoading(true);
    const res = await getUserProfile();
    if (res?.data?.sessionId) {
      const params = {
        sessionId: res?.data?.sessionId,
      };
      const response = await checkPaymentStatusApi(params);
      if (response?.success) {
        UpdateUserPayment(res?.data?.userSelectedPackage);
      }
    }
    if (res?.data?.reviewStatus === "rejected") {
      setLoading(false);
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
      return;
    }
    if (res?.data?.reviewStatus === "reviewing") {
      setLoading(false);
      toast.success(
        <CustomToast
          content="Your uploaded documents are under review."
          contact="You can contact us at"
          mail="support@trade2trade.co.uk"
        />
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return;
    }
    setLoading(false);
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  };

  const image = {
    success: "/success.svg",
    dashed: "/dashed.svg",
    logo: "/logo-trade.svg",
  };

  return (
    <>
      <div className="text-left mx-4 my-3">
        <Image
          src={image.logo}
          width={140}
          height={50}
          alt="img"
          className="w-[100px] mx-2 my-2 h-[70px]"
          
        />
      </div>
      {loading && (
        <p className="text-center text-customBlue my-3 text-[16px] ">
          Please wait ...
        </p>
      )}
      {!loading && (
        <div className="text-center">
          <div className="inline-block md:w-[400px]">
            <Image
              src={image.success}
              alt="img"
              width={70}
              height={70}
              className="w-[70px] h-auto inline-block object-contain "
            />
            <h5 className="text-[20px] font-medium text-customBlackLight capitalize my-2">
              Payment Success
            </h5>
            <p className="text-[16px] font-normal text-customDarkGray my-2">
              Your money has been successfully sent
            </p>
            <p className="text-[16px] font-medium text-customDarkGray capitalize my-2">
              amount
            </p>
            <h5 className="text-[20px] font-medium text-customOrange capitalize">
              £ 9.99
            </h5>
            <Image
              src={image.dashed}
              alt="img"
              width={20}
              height={20}
              className="w-full h-auto inline-block object-contain px-7"
            />
            <ToastContainer position="top-right" />
            <div className="px-7">
              <button
                onClick={handleClick}
                className={`w-full py-2.5 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7 ${
                  loading ? "cursor-not-allowed opacity-75" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                ) : null}
                {loading ? "Loading..." : "Ok"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Success;
