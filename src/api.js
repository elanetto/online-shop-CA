const BASE_URL = "https://v2.api.noroff.dev";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  ALLPRODUCTS: `${BASE_URL}/online-shop/`,
  PRODUCT: (id) => `${BASE_URL}/online-shop/${id}`,
};
