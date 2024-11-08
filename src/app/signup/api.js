import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const signUpApi = (params) => {
  return fetchApi(endpoint.signup, params, method.post, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Signup API Error:", error);
      throw error;
    });
};
