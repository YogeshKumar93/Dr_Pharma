const ApiEndpoints = {
  // ---------- AUTH ----------
  REGISTER: "register",
  LOGIN: "login",

  // ---------- USERS ----------
  GET_USERS: "users",
  GET_USER_BY_ID: (id) => `users/${id}`,
  CREATE_USER: "users",
  UPDATE_USER: (id) => `users/${id}`,
  DELETE_USER: (id) => `users/${id}`,

  // ---------- PRODUCTS ----------
  GET_PRODUCTS: "products",   
  CREATE_PRODUCT: "products",           
  GET_PRODUCT_BY_ID: (id) => `products/${id}`, 
  UPDATE_PRODUCT: (id) => `products/${id}`,
  DELETE_PRODUCT: (id) => `products/${id}`,
};

export default ApiEndpoints;
