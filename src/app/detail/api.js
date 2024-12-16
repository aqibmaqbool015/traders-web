import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const vehicleById = (id) => {
  return fetchApi(`${endpoint.userGetId}/${id}`, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Vehicle by Id API Error:", error);
      throw error;
    });
};

export const addCommentApi = (params) => {
  return fetchApi(endpoint.addComment, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Comments API Error:", error);
      throw error;
    });
};
export const getAllCommentsApi = (params) => {
  return fetchApi(endpoint.getAllComments, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Comments API Error:", error);
      throw error;
    });
};

export const createReviewApi = (params) => {
  return fetchApi(endpoint.createReview, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Review API Error:", error);
      throw error;
    });
};
export const getAllReviewsApi = () => {
  return fetchApi(endpoint.getAllReviews, null, method.get, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Review API Error:", error);
      throw error;
    });
};
export const reviewDetailsApi = (params) => {
  return fetchApi(endpoint.reviewDetails, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Review API Error:", error);
      throw error;
    });
};
export const reviewDetailsVehicleApi = (params) => {
  return fetchApi(endpoint.reviewDetailsVehicle, params, method.post, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Review API Error:", error);
      throw error;
    });
};
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
