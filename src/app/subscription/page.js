"use client";
import { setSelectedUserPackage } from "@/redux/slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { participateForm } from "../constant";
import { paymentSubscription, userCustomer, userPayment } from "../home/api";
import CustomInput from "../components/input";
import Image from "next/image";

const image = {
  logo: "/logo-trade.svg",
  tick: "/mark.svg",
  crossBlue: "/cross.svg",
};

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await paymentSubscription();
      setSubscriptions(response?.data);
    } catch (err) {
      setError("Failed to load subscription data.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  const handlePaySubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    validateForm();
    if (!isFormValid) {
      toast.error("Please fix the validation errors");
      return;
    }

    setModalLoading(true);
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
          web: true,
          userSelectedPackage: selectedPackage?._id,
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
      setModalLoading(false);
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

  const renderSubscriptionDetails = (subscription, index) => {
    const isEven = index % 2 === 0;
    return (
      <div
        key={subscription._id}
        className="my-5 mx-5 shadow-customShaddow rounded-[6px]"
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
          {Object.keys(subscription)
            .filter((key) => subscription[key] === true)
            .map((key, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="mr-3">
                  <Image
                    src={image.tick}
                    alt="img"
                    width={18}
                    height={18}
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
      <div className="text-left mx-4 my-3">
        <Image
          src={image.logo}
          width={140}
          height={50}
          alt="img"
          className="w-[100px] mx-2 my-2 h-[70px]"
        />
      </div>
      <div className="md:mx-40 mx-8 my-6 ">
        <h2 className="text-2xl text-customBlue font-semibold">Subscription</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
            {subscriptions?.length > 0 ? (
              subscriptions?.map(renderSubscriptionDetails)
            ) : (
              <p>No subscription data available</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="myModal"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 relative">
              <div className="absolute right-3 top-4">
                <Image
                  src={image.crossBlue}
                  alt="Close"
                  className="w-[15px] h-auto cursor-pointer"
                  width={15}
                  height={15}
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
                      modalLoading ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    disabled={modalLoading}
                  >
                    {modalLoading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                    ) : null}
                    {modalLoading ? "Loading..." : "Submit and Pay"}
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
