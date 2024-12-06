"use client";

import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { allBrands } from "../home/api";
import { addVehicleApi, getAllFuelApi, getModelsByBrandApi } from "./api";
import { vehicleDetailValidationSchema } from "@/utils/Yup";
import { dealerHistory, driver, keys, serviceHistory } from "../constant";
import CustomToast from "../components/toast";

const image = {
  logo: "/logo-trade.svg",
  vector: "/person.svg",
  camera: "/camera.svg",
  plas: "/plus.svg",
  cross: "/cross.svg",
  arrow: "/arrow.svg",
};

export default function VehicleDetail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [isModel, setIsModel] = useState([]);
  const [isFuel, setIsFuel] = useState([]);
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState(false);
  const [timeChange, settimeChange] = useState("");

  const handleTimeChange = (e) => {
    settimeChange(new Date(e).toISOString());
  };

  useEffect(() => {
    const vehicleType = JSON.parse(localStorage.getItem("vehicleType"));
    setSelectedVehicleType(vehicleType?.auction);
  }, []);

  useEffect(() => {
    updateVehicleData();
  }, []);

  const updateVehicleData = async () => {
    const identityData = await localStorage.getItem("regnoData");
    if (identityData) {
      const completeVehicleData = JSON.parse(identityData);
      const identity = completeVehicleData?.data;
      const vehicleData = completeVehicleData?.dataAutoTrader;
      formik.setFieldValue("regno", identity?.registration || "");
      formik.setFieldValue("doors", identity?.specsVehicle?.doors || "");
      formik.setFieldValue("fuel", identity?.specsVehicle?.fuel || "");
      formik.setFieldValue("type", identity?.specsVehicle?.version || "");
      formik.setFieldValue(
        "seats",
        vehicleData?.autotraderValuation?.seats || ""
      );
      formik.setFieldValue("year", identity?.specsVehicle?.modelYear || "");
      formik.setFieldValue("engine", identity?.specsVehicle?.engineCC || "");
      formik.setFieldValue(
        "mileage",
        vehicleData?.autotraderValuation?.valuationMileage || ""
      );
      formik.setFieldValue("post_desc", identity?.specsVehicle?.version || "");
      formik.setFieldValue(
        "transition",
        identity?.specsVehicle?.transmissionMode || ""
      );
      formik.setFieldValue(
        "mot_expire",
        identity?.specsVehicle?.mot_expire || ""
      );
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await allBrands();
      if (response?.data) {
        const identityData = await localStorage.getItem("regnoData");
        if (identityData) {
          const completeVehicleData = JSON.parse(identityData);
          const identity = completeVehicleData?.data;
          const bmwObject = response?.data?.find(
            (brand) => brand.title === identity?.specsVehicle?.make
          );
          formik.setFieldValue("make_id", bmwObject?._id || "");
        }

        setBrands(response?.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchAllFuel();
  }, []);

  const fetchAllFuel = async () => {
    try {
      const response = await getAllFuelApi();
      if (response?.data) {
        const identityData = await localStorage.getItem("regnoData");
        if (identityData) {
          const completeVehicleData = JSON.parse(identityData);
          const identity = completeVehicleData?.data;
          const bmwObject = response?.data?.find(
            (modal) => modal.name === identity?.vehicle?.dvla?.fuel
          );
          formik.setFieldValue("fuel", bmwObject?._id || "");
        }
        setIsFuel(response?.data);
      }
    } catch (error) {
      console.error("Error fetching fuel:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      regno: "",
      post_desc: "",
      price: "",
      make_id: "",
      model_id: "",
      mileage: "",
      doors: "",
      type: "",
      seats: "",
      transition: "",
      year: "",
      owners: "",
      fuel: "",
      location: "",
      lat: "",
      long: "",
      engine: "",
      date: "",
      start_Time: "",
      mot_expire: "",
      pictures: [],
      dealer_History: "",
      drive: "",
      service_History: "",
      v5_present: "",
      vehicleKey: "",
      prep_needed: "",
    },
    validationSchema: vehicleDetailValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("auction", selectedVehicleType ? true : false);
      formData.append("regno", values.regno);
      formData.append("post_desc", values.post_desc);
      formData.append("price", values.price);
      formData.append("make_id", values.make_id);
      formData.append("model_id", values.model_id);
      formData.append("mileage", values.mileage);
      formData.append("doors", values.doors);
      formData.append("type", values.type);
      formData.append("seats", values.seats);
      formData.append("transition", values.transition);
      formData.append("year", values.year);
      formData.append("owners", values.owners);
      formData.append("fuel", values.fuel);
      formData.append("location", values.location);
      formData.append("lat", values.lat);
      formData.append("long", values.long);
      formData.append("engine", values.engine);
      formData.append("mot_expire", values.mot_expire);
      formData.append("drive", values.drive);

      if (selectedVehicleType) {
        formData.append("auction_date", values.date);
        formData.append("auc_start_time", values.start_Time);
      }

      if (values.pictures && values.pictures.length > 0) {
        values.pictures.forEach((file) => {
          formData.append("pictures", file);
        });
      }

      if (!values.date && selectedVehicleType) {
        console.log("Date is required");
      }
      if (!values.start_Time && selectedVehicleType) {
        console.log("Start time is required");
      }

      setLoading(true);
      const response = await addVehicleApi(formData);
      if (response === true) {
        console.success("Vehicle added successfully.");
        toast.success(
          <CustomToast
            content="Your vehicle has been successfully submitted and is in review."
            className="bg-customOrange py-1 px-2 rounded-[8px] text-white text-center min-w-[100px]"
            button="Ok"
          />
        );
        router.push("/home");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (formik.values.make_id) {
      fetchModelsByBrand(formik.values.make_id);
    }
  }, [formik.values.make_id]);

  const fetchModelsByBrand = async (makeId) => {
    const response = await getModelsByBrandApi(makeId);
    if (response?.data) {
      const identityData = await localStorage.getItem("regnoData");
      if (identityData) {
        const completeVehicleData = JSON.parse(identityData);
        const identity = completeVehicleData?.data;
        const bmwObject = response?.data?.find(
          (modal) => modal.name === identity?.vehicle?.dvla?.model
        );
        formik.setFieldValue("model_id", bmwObject?._id || "");
      }
      setIsModel(response.data);
    }
  };

  // const handleImageUpload = (e) => {
  //   const selectedFiles = e.target.files;
  //   const newImages = Array.from(selectedFiles).filter(
  //     (file) => file.size <= 3 * 1024 * 1024
  //   );
  //   formik.setFieldValue("pictures", newImages);
  // };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 3 * 1024 * 1024
    );
    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
    formik.setFieldValue("pictures", [
      ...formik.values.pictures,
      ...validFiles,
    ]);
    formik.setFieldValue("picturePreviews", [
      ...(formik.values.picturePreviews || []),
      ...previewUrls,
    ]);
  };

  const handleRemoveImage = (index) => {
    const updatedPictures = formik.values.pictures.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("pictures", updatedPictures);
  };
  const openLocationModal = () => setIsLocationModal(true);
  const closeLocationModal = () => {
    setIsLocationModal(false);
  };

  return (
    <div className=" min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Head>
        <title>Vehicle Detail</title>
      </Head>

      <div className="w-full flex flex-col items-center">
        <div className="text-left w-full">
          <span className="cursor-pointer">
            <Image
              src={image.logo}
              width={140}
              height={50}
              alt="img"
              className="w-[140px] h-auto"
            />
          </span>
        </div>

        <div className="w-full ">
          <div className="w-full px-4 md:px-0">
            <div className="flex flex-col justify-center items-center p-4">
              <h1 className="text-2xl font-semibold mb-4 text-center text-[30px] text-customBlue">
                Add Vehicle Details
              </h1>
              <div className="w-full">
                <div className="mb-4 mt-4 md:mx-20">
                  <div className="border-dashed border-2 border-customGray min-h-[200px] rounded-lg p-4 flex items-center justify-center">
                    {formik.values.pictures.length === 0 && (
                      <label className="cursor-pointer text-center">
                        <Image
                          src="/plus.svg"
                          alt="Upload"
                          width={25}
                          height={25}
                          className="inline-block"
                        />
                        <p className="text-customDarkGray text-[16px] pt-4">
                          Upload front side of your ID
                        </p>
                        <p className="text-customSmallGray text-[14px]">
                          (png.jpg.pdf)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {(formik.values.picturePreviews || []).map(
                        (image, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="rounded-lg w-full h-[150px] object-cover"
                              width={100}
                              height={100}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 bg-customRed text-white rounded-full p-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {formik.errors.pictures && (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.pictures}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mb-4">
                <label
                  htmlFor="regno"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Registration
                </label>
                <input
                  type="text"
                  id="regno"
                  name="regno"
                  value={formik.values.regno}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Enter Registration"
                />
                {formik.errors.regno && (
                  <div className="text-customRed">{formik.errors.regno}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="make_id"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Make
                </label>
                <div className="relative !mt-0">
                  {brands && brands.length > 0 ? (
                    <select
                      id="make_id"
                      name="make_id"
                      className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                      onChange={formik.handleChange}
                      value={formik.values?.make_id}
                    >
                      <option value="">Select a Make</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      id="make_id"
                      name="make_id"
                      className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                      onChange={formik.handleChange}
                      value={formik.values?.make_id}
                    >
                      <option value="">Select a Make</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.title}
                        </option>
                      ))}
                    </select>
                  )}

                  {formik.errors.make_id && (
                    <div className="text-customRed">
                      {formik.errors.make_id}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="model_id"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Model
                </label>
                <div className="relative !mt-0">
                  {isModel && isModel.length > 0 ? (
                    <select
                      id="model_id"
                      name="model_id"
                      className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                      onChange={formik.handleChange}
                      value={formik.values?.model_id}
                    >
                      <option value="">Select a Model</option>
                      {isModel?.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model?.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      id="model_id"
                      name="model_id"
                      className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                      onChange={formik.handleChange}
                      value={formik.values?.model_id}
                    >
                      <option value="">Select a Model</option>
                      {isModel?.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model?.name}
                        </option>
                      ))}
                    </select>
                  )}

                  {formik.errors.model_id ? (
                    <div className="text-customRed">
                      {formik.errors.model_id}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mileage"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Mileage
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  onChange={formik.handleChange}
                  value={formik.values?.mileage}
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Enter Mileage"
                />
                {formik.errors.mileage ? (
                  <div className="text-customRed">{formik.errors.mileage}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik?.values?.price}
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Enter Price"
                />
                {formik.errors.price ? (
                  <div className="text-customRed">{formik.errors.price}</div>
                ) : null}
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="location"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Location"
                  disabled
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedLocation(e.target.value);
                  }}
                  value={selectedLocation || formik.values?.location}
                />
                {formik.errors.location ? (
                  <div className="text-customRed">{formik.errors.location}</div>
                ) : null}
                <span
                  className="absolute right-2 top-10 cursor-pointer "
                  onClick={openLocationModal}
                >
                  <Image
                    src={image.arrow}
                    alt=""
                    width={20}
                    height={20}
                    className="w-[18px] h-[18px] object-contain "
                  />
                </span>
                {isLocationModal && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-[400px] max-h-[90vh] overflow-y-auto">
                      <div className="p-4 relative">
                        <h2 className="text-[19px] text-customBlue font-semibold capitalize mb-4">
                          Select Location
                        </h2>
                        <div className="absolute right-3 top-4">
                          <Image
                            src={image.cross}
                            alt="Close"
                            className="w-[15px] h-auto cursor-pointer"
                            width={15}
                            height={15}
                            onClick={closeLocationModal}
                          />
                        </div>
                      </div>
                      <div className="my-5">
                        <form className="mx-6">
                          <Autocomplete
                            apiKey="AIzaSyD_KJynrQba_jgW-fo3F4ItmLiy58jD0es"
                            onPlaceSelected={(place) => {
                              const address = place?.formatted_address || "";
                              setSelectedLocation(address);
                              const locationData = place?.geometry;
                              formik.setFieldValue("location", address);
                              formik.setFieldValue(
                                "lat",
                                locationData?.location?.lat()
                              );
                              formik.setFieldValue(
                                "long",
                                locationData?.location?.lng()
                              );
                              closeLocationModal();
                            }}
                            options={{
                              types: ["(regions)"],
                              componentRestrictions: { country: "ru" },
                            }}
                            defaultValue=""
                            className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  border border-[#CFCFCF] rounded-[25px]"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="drive"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Drive
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="drive"
                    value={formik.values?.drive}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Drive</option>
                    {driver.map((drive) => (
                      <option key={drive._id} value={drive._id}>
                        {drive.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {selectedVehicleType && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-customBlue text-sm font-medium mb-2"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
       border border-[#CFCFCF] rounded-[25px]"
                      placeholder="12-12-2024"
                      value={formik.values?.date}
                      onChange={formik.handleChange}
                    />
                    {/* {formik.errors.date ? (
                      <div className="text-customRed">{formik.errors.date}</div>
                    ) : null} */}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="start_Time"
                      className="block text-customBlue text-sm font-medium mb-2"
                    >
                      Start Time
                    </label>
                    <input
                      type="date"
                      id="start_Time"
                      className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                      placeholder="12:01 PM"
                      value={
                        formik.values?.start_Time ||
                        new Date().toISOString().substring(11, 16)
                      }
                      onChange={(e) =>
                        formik.setFieldValue("start_Time", e.target.value)
                      }
                    />
                  </div>
                  {/* <div className="mb-4">
                    <label
                      htmlFor="end_Time"
                      className="block text-customBlue text-sm font-medium mb-2"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      id="end_Time"
                      className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                      placeholder="09:45 PM"
                      value={formik.values?.end_Time}
                      onChange={formik.handleChange}
                    />
                    
                  </div> */}
                </>
              )}
              <div className="mb-4">
                <label
                  htmlFor="fuel"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Fuel
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="fuel"
                    name="fuel"
                    value={formik?.values?.fuel}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Fuel</option>
                    {isFuel.map((fuel) => (
                      <option key={fuel._id} value={fuel._id}>
                        {fuel?.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Enter vehicle Type"
                  onChange={formik.handleChange}
                  value={formik.values?.type}
                />
                {formik.errors.type ? (
                  <div className="text-customRed">{formik.errors.type}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="doors"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Doors
                </label>
                <input
                  type="number"
                  id="doors"
                  name="doors"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Doors"
                  onChange={formik.handleChange}
                  value={formik.values?.doors}
                />
                {formik.errors.doors ? (
                  <div className="text-customRed">{formik.errors.doors}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="seats"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Seats
                </label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Seats"
                  onChange={formik.handleChange}
                  value={formik.values?.seats}
                />
                {formik.errors.seats ? (
                  <div className="text-customRed">{formik.errors.seats}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="year"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Years"
                  onChange={formik.handleChange}
                  value={formik.values?.year}
                />
                {formik.errors.year ? (
                  <div className="text-customRed">{formik.errors.year}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="engine"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Engine
                </label>
                <input
                  type="number"
                  id="engine"
                  name="engine"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Engines"
                  onChange={formik.handleChange}
                  value={formik.values?.engine}
                />
                {formik.errors.engine ? (
                  <div className="text-customRed">{formik.errors.engine}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Owners
                </label>
                <input
                  type="number"
                  id="owner"
                  name="owners"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Owners"
                  onChange={formik.handleChange}
                  value={formik.values?.owners}
                />
                {formik.errors.owners ? (
                  <div className="text-customRed">{formik.errors.owners}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="transition"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Transmition
                </label>
                <input
                  type="text"
                  id="transition"
                  name="transition"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Transmition"
                  onChange={formik.handleChange}
                  value={formik.values?.transition}
                />
                {formik.errors.transition ? (
                  <div className="text-customRed">
                    {formik.errors.transition}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="vehicleKey"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Keys
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="vehicleKey"
                    onChange={formik.handleChange}
                    value={formik.values?.vehicleKey}
                  >
                    <option value="">Select a Keys</option>
                    {keys.map((key) => (
                      <option key={key._id} value={key._id}>
                        {key.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="service_History"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Service History
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="service_History"
                    value={formik.values?.service_History}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Service</option>
                    {serviceHistory.map((history) => (
                      <option key={history._id} value={history._id}>
                        {history.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dealer_History"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Dealer History
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="dealer_History"
                    value={formik.values?.dealer_History}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Dealer</option>
                    {dealerHistory.map((deal) => (
                      <option key={deal._id} value={deal._id}>
                        {deal.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="v5_present"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  V5 Present?
                </label>
                <div className="relative !mt-0">
                  <select
                    className="appearance-none mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px] text-customDarkGray"
                    id="v5_present"
                    value={formik.values?.v5_present}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Present</option>
                    {dealerHistory.map((present) => (
                      <option key={present._id} value={present._id}>
                        {present.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-customDarkGray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="prep_needed"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Prep Needed
                </label>
                <input
                  type="number"
                  id="prep_needed"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Enter Prep Needed"
                  value={formik.values?.prep_needed}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mot_expire"
                  className="block text-customBlue text-sm font-medium mb-2"
                >
                  Mot Expires
                </label>
                <input
                  type="date"
                  id="mot_expire"
                  name="mot_expire"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="12-12-2024"
                  value={formik?.values?.mot_expire}
                  onChange={formik.handleChange}
                />
                {formik.errors.mot_expire ? (
                  <div className="text-customRed">
                    {formik.errors.mot_expire}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid md:grid-cols-1 mt-4">
              <div className="mb-4">
                <label
                  htmlFor="post_desc"
                  className="text-[16px] text-customBlue font-medium"
                >
                  Description
                </label>
                <textarea
                  id="post_desc"
                  rows="4"
                  name="post_desc"
                  className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
                  placeholder="Add car description"
                  value={formik.values.post_desc}
                  onChange={formik.handleChange}
                ></textarea>

                {formik.errors.post_desc ? (
                  <div className="text-customRed">
                    {formik.errors.post_desc}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="py-2 px-4 rounded-[25px] border border-customBlue  text-customBlue w-[200px]"
            >
              Back
            </button>
            <button
              disabled={loading}
              className={`py-2 px-4 ml-4 rounded-[25px] w-[200px] ${
                loading ? "bg-gray-400" : "bg-customBlue text-white"
              }`}
              onClick={formik?.handleSubmit}
            >
              {loading ? "Submitting..." : "Post"}
            </button>
          </div>
          <ToastContainer position="top-right" />
        </div>
      </div>
    </div>
  );
}
