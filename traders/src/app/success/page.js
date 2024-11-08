"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updatePremiumUser } from "./api";
import { getUserProfile } from "../login/api";

const Success = () => {
  const router = useRouter();
  const userPackage = useSelector((state) => state?.slice?.selectedUserPackage);

  useEffect(() => {
    updateUserPayment();
  }, []);

  const updateUserPayment = async () => {
    const params = {
      packageId: userPackage?._id,
    };
    const response = await updatePremiumUser(params);
  };

  const handleClick = async () => {
    const res = await getUserProfile();
    if (res?.data?.reviewStatus === "rejected") {
      console.log(res?.data?.reviewStatus, "Redirecting to profile");
      router.push("/profile");
      return;
    }
    if (res?.data?.reviewStatus === "reviewing") {
      toast.error();
      return;
    }
    router.push("/home");
    dispatch(setUser(res));
  };

  const image = {
    success: "/success.svg",
    dashed: "/dashed.svg",
  };
  return (
    <>
      <div className="text-center p-10">
        <div className="inline-block md:w-[400px]">
          <img
            src={image.success}
            alt=""
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
          <img
            src={image.dashed}
            alt=""
            className="w-full h-auto inline-block object-contain px-7"
          />
          <div className="px-7">
            <button
              onClick={handleClick}
              className="w-full py-2.5 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
