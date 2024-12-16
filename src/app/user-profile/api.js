import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const getLeaderboardAPi = (params) => {
  return fetchApi(
    `${endpoint.getLeaderboard}?page=${params?.page}&limit=${params?.limit}`,
     null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Leaderboard API Error:", error);
      throw error;
    });
};
export const updateProfileApi = (formData) => {
  return fetchApi(endpoint.updateProfile, formData, method.patch, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Update Profile API Error:", error);
      throw error;
    });
};

export const getWishlistApi = () => {
  return fetchApi(endpoint.getWishlist, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Wishlist API Error:", error);
      throw error;
    });
};

export const getUserPostsApi = () => {
  return fetchApi(endpoint.getUserPosts, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("User Post API Error:", error);
      throw error;
    });
};

export const getAllWantedApi = () => {
  return fetchApi(endpoint.getAllWanted, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("All Wanted API Error:", error);
      throw error;
    });
};

export const createSnagApi = (params) => {
  return fetchApi(endpoint.createSnag, params, method.post, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Snag list API Error:", error);
      throw error;
    });
};

export const addFeedbackApi = (params) => {
  return fetchApi(endpoint.addFeedback, params, method.post, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Feedback API Error:", error);
      throw error;
    });
};

export const changePasswordApi = (params) => {
  return fetchApi(endpoint.changePassword, params, method.patch, true, true)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Password API Error:", error);
      throw error;
    });
};

export const deleteUserApi = (params) => {
  return fetchApi(
    `${endpoint.deleteUser}/${params?.userId}`,
    params,
    method.patch,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("User delete API Error:", error);
    });
};

export const getUserNotificationApi = () => {
  return fetchApi(endpoint.getUserNotification, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Notifications API Error:", error);
      throw error;
    });
};