"use client";
import { setSelectedUserPackage } from "@/redux/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { participateForm } from "../constant";
import { userCustomer, userPayment } from "../home/api";
import CustomInput from "./input";

const Subscription = ({ subscriptions, loading, setLoading }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (isSubmitted) validateForm();
  };

  const validateForm = (fieldValue = formValues) => {
    let validationErrors = {};
    const { email, phone, name } = fieldValue;
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid.";
    }
    if (!phone) {
      validationErrors.phone = "Phone number is required.";
    }
    if (!name) {
      validationErrors.name = "Name is required.";
    }
    setErrors(validationErrors);
    return true;
  };

  const handlePaySubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }
    setLoading(true);
    const params = {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
    };
    try {
      const response = await userCustomer(params);
      if (response) {
        const paymentParams = {
          amount: selectedPackage?.price,
        };
        const res = await userPayment(paymentParams);
        if (res) {
          handleStripePayment(res?.session?.url);
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStripePayment = (url) => {
    window.location.href = url;
  };

  const handleClickForm = (selectedPackage) => {
    dispatch(setSelectedUserPackage(selectedPackage));
    setSelectedPackage(selectedPackage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const image = {
    tick: "/mark.svg",
    crossBlue: "/cross.svg",
  };

  const renderSubscriptionDetails = (subscription, index) => {
    const isEven = index % 2 === 0;
    return (
      <div
        key={subscription._id}
        className="shadow-customShaddow rounded-[6px]"
      >
        <div
          className={`flex justify-between items-center px-3 py-3 rounded-tl-[8px] rounded-tr-[6px] ${
            isEven ? "bg-customBlue" : "bg-customOrange"
          }`}
        >
          <h5 className="text-[18px] font-normal text-white uppercase">
            {subscription.title}
          </h5>
          <h5 className="text-[18px] font-normal text-white">
            £{subscription.price}/{subscription.duration}
          </h5>
        </div>
        <div className="px-3 py-3">
          {Object.entries(subscription)
            .filter(
              ([key, value]) =>
                value === true &&
                ![
                  "_id",
                  "title",
                  "price",
                  "duration",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ].includes(key)
            )
            .map(([key]) => (
              <div key={key} className="flex items-center mb-2">
                <span className="mr-3">
                  <img
                    src={image.tick}
                    alt=""
                    className="inline-block object-contain align-text-bottom w-[18px] h-[18px]"
                  />
                </span>
                <p className="text-customDarkGray text-[16px] font-normal capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
              </div>
            ))}
          <div className="mt-3">
            <button
              className={`border rounded-[8px] px-5 py-3 text-[18px] font-normal capitalize w-full ${
                isEven
                  ? "border-customBlue bg-transparent text-customBlue"
                  : "border-customOrange bg-transparent text-customOrange"
              }`}
              onClick={() => handleClickForm(subscription)}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main Subscription Content */}
      {!isModalOpen && (
        <div>
          <h2 className="text-2xl text-customBlue font-semibold">
            Subscription
          </h2>
          <p className="text-customDarkGray text-[16px] font-normal capitalize mb-3">
            Unlock premium access to view detailed vehicle information, manage
            listings seamlessly, and enjoy an enhanced app experience. Subscribe
            now and elevate your vehicle management journey!
          </p>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-customRed">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription, index) =>
                  renderSubscriptionDetails(subscription, index)
                )
              ) : (
                <p>No subscription data available</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <img
                  src={image.crossBlue}
                  alt="Close"
                  className="w-[15px] h-auto cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <form onSubmit={handlePaySubmit}>
                {participateForm.map((item, index) => (
                  <div key={index}>
                    <CustomInput
                      label={item.label}
                      labelClass={item.labelClass}
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      placeholder={item.placeholder}
                      value={formValues[item.name]}
                      onChange={handleInputChange}
                    />
                    {errors[item.name] && (
                      <div className="text-customRed text-sm mt-1">
                        {errors[item.name]}
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-center mt-7">
                  <button
                    type="submit"
                    className={`border rounded-[25px] px-5 py-2 text-[18px] w-[200px] font-normal capitalize bg-customBlue text-white ${
                      loading ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                    ) : null}
                    {loading ? "Loading..." : "submit and pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscription;
