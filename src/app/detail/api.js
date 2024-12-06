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


