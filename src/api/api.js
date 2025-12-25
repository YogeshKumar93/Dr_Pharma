import { BASE_URL } from "./config";

export const apiCall = async (
  method,
  endpoint,
  payload = null,
  extraHeaders = {},
    skipAuth = false 
) => {
  try {
    const token = localStorage.getItem("token");

     const isFormData = payload instanceof FormData;

    const headers = {
      //  "Content-Type": "application/json",
      Accept: "application/json",
...(token && !skipAuth && { Authorization: `Bearer ${token}` }),
 ...(!isFormData && { "Content-Type": "application/json" }),
      ...extraHeaders,
    };

    const options = {
      method,
      headers,
    };

    // ✅ HANDLE BODY SAFELY
    if (payload && method !== "GET") {
      if (payload instanceof FormData) {
        // 🔥 FILE UPLOAD CASE
        options.body = payload;
        // ❌ DO NOT SET Content-Type
      } else {
        // 🔥 NORMAL JSON CASE
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(payload);
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      return { response: null, error: data };
    }

    return { response: data, error: null };
  } catch (err) {
    return {
      response: null,
      error: { message: "Network error" },
    };
  }
};
