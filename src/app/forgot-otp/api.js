import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const otpApi = async (params) => {
  try {
    const response = await fetchApi(
      endpoint.otp,
      params,
      method.post,
      false,
      false
    );

    if (!response.success) {
      console.warn("OTP API response error:", response.message);
      throw new Error(response.message || "Verification failed.");
    }

    return response;
  } catch (error) {
    console.error("OTP API Error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};

export const resendOtp = async (params) => {
  try {
    const response = await fetchApi(
      endpoint.forgot,
      params,
      method.post,
      false,
      false
    );

    if (!response.success) {
      console.warn("Resend OTP response error:", response.message);
      throw new Error(
        response.message || "Failed to resend OTP. Please try again."
      );
    }

    return response;
  } catch (error) {
    console.error("Resend OTP API Error:", error);
    throw new Error(
      "An unexpected error occurred while resending OTP. Please try again later."
    );
  }
};
