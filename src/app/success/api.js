import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const updatePremiumUser = (params) => {
  return fetchApi(endpoint.updatePremiumUser, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Signup API Error:", error);
      throw error;
    });
};
