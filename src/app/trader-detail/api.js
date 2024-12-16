import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const getUserVehicleHistoryApi = (id) => {
  try {
    const response = fetchApi(
      `${endpoint.getUserVehicleHistory}/${id}`,
      null,
      method.get,
      true,
      false
    );
    return response;
  } catch (error) {
    console.error("History API Error:", error);
    throw error;
  }
};
