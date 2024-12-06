import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const identityApi = (params) => {
  return fetchApi(endpoint.identity, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Identity API Error:", error);
      throw error;
    });
};
