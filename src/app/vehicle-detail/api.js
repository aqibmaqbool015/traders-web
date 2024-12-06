import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const addVehicleApi = (params) => {
  return fetchApi(endpoint.addVehicle, params, method.post, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Add Vehicle API Error:", error);
      throw error;
    });
};
export const getModelsByBrandApi = (params) => {
  return fetchApi(
    `${endpoint.getModelsByBrand}/${params}`,
    null,
    method.get,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Models API Error:", error);
      throw error;
    });
};

export const getAllFuelApi = () => {
  return fetchApi(endpoint.getAllFuel, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Fuel API Error:", error);
      throw error;
    });
};
