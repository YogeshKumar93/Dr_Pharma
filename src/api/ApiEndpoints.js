const ApiEndpoints = {
  // ---------- AUTH ----------
  REGISTER: "register",
  LOGIN: "login",
    LOGOUT: "logout",
   ME: "me",
   FORGOT_PASSWORD: "forgot-password",
   RESET_PASSWORD: "reset-password",

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
  MY_ORDERS: "orders/myorders",
  SHOW_ORDER: "orders/show",

  // ---------- ORDERS (ADMIN) ----------
  ADMIN_ALL_ORDERS: "admin/orders",
  ADMIN_CREATE_ORDER: "admin/orders/create",
  ADMIN_UPDATE_ORDER: "admin/orders/update",
  ADMIN_UPDATE_ORDER_STATUS: "admin/orders/update-status",
  ADMIN_UPDATE_PAYMENT_STATUS: "admin/orders/update-payment",

  // ---------- PAYMENTS ----------
  ADMIN_PAYMENTS: "admin/payments",
  ADMIN_UPDATE_PAYMENT_STATUS: "admin/payments/update-status",

  // --------------Special Offers -----------------
  GET_ALL_OFFERS: "special-offers",
  ADD_OFFERS: "special-offers/create",
  DELETE_OFFERS: "special-offers/delete"
};

export default ApiEndpoints;
