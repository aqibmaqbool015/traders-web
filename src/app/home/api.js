import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const paymentSubscription = () => {
  return fetchApi(endpoint.paymentPackage, null, method.get, true, false)
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

export const allBrands = () => {
  return fetchApi(endpoint.allBrands, null, method.get, false, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Brands API Error:", error);
      throw error;
    });
};

export const allVehicles = () => {
  return fetchApi(endpoint.allVehicles, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Vehicles API Error:", error);
      throw error;
    });
};

export const allVehiclesNews = () => {
  return fetchApi(endpoint.allVehiclesFeed, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Vehicles Feed API Error:", error);
      throw error;
    });
};

export const wishlistPost = (params) => {
  return fetchApi(endpoint.addRemWishlist, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Wishlist API Error:", error);
      throw error;
    });
};

export const allComments = (params) => {
  return fetchApi(endpoint.getAllComments, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Comments API Error:", error);
      throw error;
    });
};

export const likeUnlikeApi = (params) => {
  return fetchApi(endpoint.dislike, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Like API Error:", error);
      throw error;
    });
};
