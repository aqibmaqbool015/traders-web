import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const LoginApi = (params) => {
  return fetchApi(endpoint.login, params, method.post, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Login API Error:", error);
      throw error;
    });
};

export const getUserProfile = (params) => {
  return fetchApi(endpoint.userProfile, params, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Login API Error:", error);
      throw error;
    });
};

