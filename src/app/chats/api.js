import { endpoint, method } from "@/networking/endPoints";
import { fetchApi } from "@/networking/network";

export const getConversationsApi = () => {
  return fetchApi(endpoint.getConversations, null, method.get, true, false)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Conversation API Error:", error);
      throw error;
    });
};
