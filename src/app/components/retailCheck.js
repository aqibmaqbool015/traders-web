"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkRetailApi, getCheckRetailApi } from "../user-profile/api";
import CustomToast from "./toast";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = {
  regIcon: "/verify.png",
  retail: "/retail.png",
  trade: "/trade.png",
  exchange: "/exchange.png",
  private: "/private.png",
  make: "/make.png",
  model: "/model.png",
  color: "/color.png",
  mileage: "/instrument2.svg",
  image5: "/instrument5.svg",
};

const RetailCheck = () => {
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState("");
  const [getRetail, setGetRetail] = useState([]);

  useEffect(() => {
    fetchGetRetail();
  }, []);

  const fetchGetRetail = async () => {
    try {
      const data = await getCheckRetailApi();
      if (data?.data) {
        setGetRetail(data.data);
      }
    } catch (err) {
      console.error("Error fetching Retail:", err);
      setGetRetail([]);
    }
  };

  const onClickRetail = async () => {
    if (!registration) {
      toast.error(
        <CustomToast content="Please enter a registration number." />
      );
      return;
    }

    const params = { registration };
    setLoading(true);
    try {
      const response = await checkRetailApi(params);

      if (response?.success) {
        toast.success(<CustomToast content={response?.message} />);
        const updatedRetail = getRetail;

        if (updatedRetail?.data) {
          setGetRetail(updatedRetail.data);
        }
      } else {
        toast.error(
          <CustomToast
            content={response?.message || "Error while saving registration."}
          />
        );
      }
    } catch (error) {
      toast.error(<CustomToast content={error?.message} />);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-customBlue font-semibold mb-4 capitalize">
        Retail Check
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="px-2 py-1">
          <label
            htmlFor="registration"
            className="text-[17px] font-medium text-customBlue"
          >
            Registration
          </label>
          <input
            type="text"
            id="registration"
            name="registration"
            placeholder="Enter registration number"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border border-[#CFCFCF] rounded-[25px]"
          />
          <div className="text-center">
            <button
              onClick={onClickRetail}
              disabled={loading}
              className="md:w-[200px] w-[130px] inline-block py-2.5 md:px-10 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue mt-4"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {getRetail.map((retail, index) => (
            <div
              key={index}
              className="border border-customBlue rounded-[8px] p-2"
            >
              <h3 className="font-medium text-customBlackLight text-[18px]">
                {retail?.make} {retail?.model}
              </h3>
              <div className="grid md:grid-cols-2 gap-0 my-5">
                {[
                  { icon: images.regIcon, label: retail?.registration },
                  {
                    icon: images.retail,
                    label: `${retail?.valuation?.retail} `,
                  },
                  {
                    icon: images.trade,
                    label: `${retail?.valuation?.trade} `,
                  },
                  {
                    icon: images.exchange,
                    label: `${retail?.valuation?.partExchange} `,
                  },
                  {
                    icon: images.private,
                    label: `${retail?.valuation?.private} `,
                  },
                  { icon: images.make, label: `${retail?.make} ` },
                  { icon: images.model, label: `${retail?.model} ` },
                  { icon: images.image5, label: `${retail?.fuelType} ` },
                  { icon: images.color, label: `${retail?.colour} ` },
                  {
                    icon: images.mileage,
                    label: `${retail?.valuationMileage} Mileage`,
                  },
                ].map((detail, indexOne) => (
                  <div
                    key={indexOne}
                    className="flex cursor-pointer items-center border-b border-b-customGray py-3"
                  >
                    <Image
                      className="w-[20px] h-[20px]"
                      src={detail.icon}
                      width={20}
                      height={20}
                      alt=""
                    />
                    <h5 className="text-[16px] text-customDarkGray font-normal mx-3">
                      {detail.label}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default RetailCheck;
