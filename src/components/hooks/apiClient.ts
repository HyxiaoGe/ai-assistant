import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8888",
});

const get = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default apiClient;
