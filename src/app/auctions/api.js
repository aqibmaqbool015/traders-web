import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

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
export const getAllAuctionApi = (params) => {
  return fetchApi(
    `${endpoint.getAllAuction}?page=${params?.page}&limit=${params?.limit}`,
    null,
    method.get,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("All Auction API Error:", error);
      throw error;
    });
};
export const getLiveAuctionApi = () => {
  return fetchApi(endpoint.getLiveAuction, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Auctions API Error:", error);
      throw error;
    });
};
export const getAllInterestedApi = () => {
  return fetchApi(endpoint.getAllInterested, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Interested API Error:", error);
      throw error;
    });
};
export const getAllUserBidApi = () => {
  return fetchApi(endpoint.getAllUserBid, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Bid API Error:", error);
      throw error;
    });
};
export const getAllUserWonApi = () => {
  return fetchApi(endpoint.getAuctionWonByUser, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Won API Error:", error);
      throw error;
    });
};

export const getAuctionSearchApi = (search) => {
  return fetchApi(
    `${endpoint.auctionSearchApi}?term=${"vehicle"}&search=${search}`,
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
