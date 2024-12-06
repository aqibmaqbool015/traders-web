import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const getVehicleByMakeApi = (id) => {
  return fetchApi(
    `${endpoint.getVehicleByMake}/${id}`,
    null,
    method.get,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Make by Id API Error:", error);
      throw error;
    });
};

export const getSearchByBrandApi = (brandId, search) => {
  return fetchApi(
    `${endpoint.searchByBrandApi}?brandId=${brandId}&search=${search}`,
    null,
    method.get,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Search API Error:", error);
      throw error;
    });
};
