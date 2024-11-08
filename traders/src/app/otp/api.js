import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const otpApi = (params) => {
    return fetchApi(endpoint.otp, params, method.post, false, false)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("OTP API Error:", error);
        throw error;
      });
  };
  export const resendOtp = (params) => {
    return fetchApi(endpoint.forgot, params, method.post, false, false)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("OTP API Error:", error);
        throw error;
      });
  };
  