import ApiEndpoints from "./ApiEndpoints";
import { BASE_URL } from "./config";

/**
 * Generic fetch function
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint path
 * @param {object} payload - request body
 * @param {object} extraHeaders - optional headers
 * @returns {{response: any, error: any}}
 */
export const apiCall = async (
  method,
  endpoint,
  payload = null,
  extraHeaders = {}
) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...extraHeaders,
      },
      body: payload ? JSON.stringify(payload) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      return { response: null, error: data };
    }

    return { response: data, error: null };
  } catch (err) {
    console.error("API Error:", err);
    return {
      response: null,
      error: { message: "Network error" },
    };
  }
};
