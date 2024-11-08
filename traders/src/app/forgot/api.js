import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const forgotApi = (params) => {
  return fetchApi(endpoint.forgot, params, method.post, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Login API Error:", error);
      throw error;
    });
};
