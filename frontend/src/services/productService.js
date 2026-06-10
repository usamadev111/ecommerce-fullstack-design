import api from "./axios.js";

export const getFeaturedProducts = async () => {
  const response = await api.get("/api/products/featured");

  return response.data;
};
