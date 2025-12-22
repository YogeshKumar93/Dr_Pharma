const ApiEndpoints = {
  // ---------- AUTH ----------
  REGISTER: "register",
  LOGIN: "login",
   ME: "me",

  // ---------- USERS ----------
  GET_USERS: "users",
  CREATE_USER: "users/create",
  SHOW_USER: "users/show",
  UPDATE_USER: "users/update",
  DELETE_USER: "users/delete",

  // ---------- PRODUCTS ----------
  GET_PRODUCTS: "products",
  CREATE_PRODUCT: "products/create",
  SHOW_PRODUCT: "products/show",
  UPDATE_PRODUCT: "products/update",
  DELETE_PRODUCT: "products/delete",

  // ---------- ORDERS (CUSTOMER) ----------
  PLACE_ORDER: "orders/place",
  MY_ORDERS: "orders/my",
  SHOW_ORDER: "orders/show",

  // ---------- ORDERS (ADMIN) ----------
  ADMIN_ALL_ORDERS: "admin/orders",
  ADMIN_UPDATE_ORDER_STATUS: "admin/orders/update-status",
  ADMIN_UPDATE_PAYMENT_STATUS: "admin/orders/update-payment",
};

export default ApiEndpoints;
