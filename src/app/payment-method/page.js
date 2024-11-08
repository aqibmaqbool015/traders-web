"use client";

import { useRouter } from "next/navigation";
import CustomInput from "../components/input";

const PaymentMethod = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/detail");
  };

  const openModal = () => {
    document.getElementById("myModal").classList.remove("hidden");
  };

  const closeModal = () => {
    document.getElementById("myModal").classList.add("hidden");
  };
  const image = {
    success: "/success.svg",
    crossBlue: "/cross-custom.svg",
    dashed: "/dashed.svg",
  };
  const paymentCard = [
    {
      image: "/visa.svg",
      text: "visa card",
      arrow: "/arrow.svg",
    },
    {
      image: "/master.svg",
      text: "MasterCard",
      arrow: "/arrow.svg",
    },
    {
      image: "/paypall.svg",
      text: "paypal",
      arrow: "/arrow.svg",
    },
  ];

  const legalName = [
    {
      label: "Amount",
      type: "text",
      id: "text",
      name: "text",
      placeholder: "£ 9.99",
      labelClass: "text-[15px] text-customDarkGray font-medium",
    },
  ];
  const inputFields = [
    {
      label: "Card Information",
      type: "text",
      id: "number",
      name: "number",
      placeholder: "Card number",
      labelClass: "text-[15px] text-customDarkGray font-medium",
    },
    {
      type: "email",
      id: "email",
      name: "email",
      placeholder: "Candidate name",
      labelClass: "text-[15px] text-customDarkGray font-medium",
    },
  ];

  const amountDetail = [
    {
      type: "text",
      id: "date",
      name: "date",
      placeholder: "MM/YY",
      labelClass: "text-[15px] text-customDarkGray font-medium",
    },
    {
      type: "text",
      id: "cvc",
      name: "cvc",
      placeholder: "CVC",
      labelClass: "text-[15px] text-customDarkGray font-medium",
    },
  ];

  return (
    <>
      <div className="md:px-8">
        <section className="mt-5 px-2 py-6">
          <h1 className="font-semibold mb-4 text-center md:text-[30px] text-[22px] text-customBlue capitalize">
            select payment method
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:mx-8 ">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-semibold mb-3 text-left md:text-[22px] text-[18px] text-customBlue capitalize">
                Select Card
              </h2>
              {paymentCard.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" cursor-pointer border border-customGray rounded-[6px] my-4 px-5 py-3 flex justify-between items-center md:w-[420px] "
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[60px] h-[30px] inline-block object-contain align-text-top "
                      />
                      <p className="text-[15px] font-normal text-customDarkGray capitalize mx-4">
                        {item.text}
                      </p>
                    </div>
                    <img
                      src={item.arrow}
                      alt=""
                      className="w-[20px] h-[20px] inline-block object-contain "
                    />
                  </div>
                );
              })}
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="">
                <h2 className="font-semibold mb-4 text-left md:text-[22px] text-[18px] text-customBlue capitalize">
                  Add Card Details
                </h2>
                <form className="space-y-4 md:w-[480px] ">
                  {legalName.map((field, index) => (
                    <CustomInput
                      key={index}
                      label={field.label}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      labelClass={field.labelClass}
                      icon={field.icon}
                    />
                  ))}
                  {inputFields.map((field, index) => (
                    <CustomInput
                      key={index}
                      label={field.label}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      labelClass={field.labelClass}
                    />
                  ))}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
                    {amountDetail.map((field, index) => (
                      <div className="col-span-12 md:col-span-6" key={index}>
                        <CustomInput
                          type={field.type}
                          id={field.id}
                          name={field.name}
                          placeholder={field.placeholder}
                          labelClass={field.labelClass}
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-7">
            <button
              className="md:w-[200px] flex justify-center py-2.5 md:px-10 px-4 border border-customBlue rounded-[25px] shadow-sm text-sm font-medium text-customBlue bg-transparent !mt-7
                            mx-3"
            >
              cancel
            </button>
            <button
              className="md:w-[200px] flex justify-center py-2.5 md:px-10 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-7
                            mx-3"
              onClick={openModal}
            >
              Confirm and Pay
            </button>
          </div>
        </section>
      </div>
      <div
        id="myModal"
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center hidden"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[500px] max-h-[90vh] overflow-y-auto">
          <div className="p-4 relative">
            <div className="absolute right-3 top-4">
              <img
                src={image.crossBlue}
                alt=""
                className="w-[15px] h-auto cursor-pointer"
                onClick={closeModal}
              />
            </div>

            <div className="text-center">
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
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
