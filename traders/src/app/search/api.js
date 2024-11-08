import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const searchTraderApi = (term, search) => {
  return fetchApi(
    `${endpoint.traderApiSearch}?term=${term}&search=${search}`,
    null,
    method.get,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Trader API Error:", error);
      throw error;
    });
};
