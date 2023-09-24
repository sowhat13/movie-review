/* eslint-disable no-useless-catch */
import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 15000, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + process.env.VUE_APP_API_TOKEN,
  },
});


const apiRequest = {
  async request(url, query, options = {}, timeout) {
    options = { method: "GET", ...options };

    // Set timeout if provided
    if (timeout) {
      options.timeout = timeout;
    }

    if (query && typeof query === "object") {
      query = new URLSearchParams(query).toString();
    } else if (query && typeof query === "string") {
      query = query.replace("?", "");
    }

    if (!query) {
      query = new URLSearchParams({
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
      }).toString();
    } else {
      query = query + "&include_adult=false&include_video=false&language=en-US";
    }

    const requestUrl = `${url ? url : ""}${query ? "?" + query : ""}`;


    try {
      const response = await api.request(requestUrl, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiRequest;
