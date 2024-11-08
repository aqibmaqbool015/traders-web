import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const paymentSubscription = (params) => {
  return fetchApi(endpoint.paymentPackage, params, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Payment API Error:", error);
      throw error;
    });
};

export const userCustomer = (params) => {
  return fetchApi(endpoint.userCreateCustomer, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Payment API Error:", error);
      throw error;
    });
};

export const userPayment = (params) => {
  return fetchApi(endpoint.userPayment, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Payment API Error:", error);
      throw error;
    });
};

export const uploadDocuments = (params) => {
  
  return fetchApi(endpoint.uploadDocuments, params, method.post, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Upload API Error:", error);
      throw error;
    });
};

export const allBrands = (params) => {
  return fetchApi(endpoint.allBrands, params, method.get, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Brands API Error:", error);
      throw error;
    });
};

export const allVehicles = (params) => {
  return fetchApi(endpoint.allVehicles, params, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Vehicles API Error:", error);
      throw error;
    });
};

export const allVehiclesNews = (params) => {
  return fetchApi(endpoint.allVehiclesFeed, params, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Vehicles API Error:", error);
      throw error;
    });
};

// const updatedParams = { ...params, platform: "web" };