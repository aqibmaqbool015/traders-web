import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const vehicleById = () => {
  return fetchApi(endpoint.userGetId, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Payment API Error:", error);
      throw error;
    });
};
