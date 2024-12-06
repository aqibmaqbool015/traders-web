import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const changePassword = async (params) => {
  try {
    const response = await fetchApi(
      endpoint.createPassword,
      params,
      method.post,
      true,
      false
    );
    if (!response.success) {
      console.warn("Create Password response error:", response.message);
      throw new Error(
        response.message || "Failed to Create Password. Please try again."
      );
    }

    return response;
  } catch (error) {
    console.error("Create Password API Error:", error);
    throw new Error(
      "An unexpected error occurred while resending OTP. Please try again later."
    );
  }
};
