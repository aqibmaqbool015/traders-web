import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const supportFormApi = (formData) => {
  return fetchApi(endpoint.supportForm, formData, method.post, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Support Form API Error:", error);
      throw error;
    });
};
