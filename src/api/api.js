import { BASE_URL } from "./config";

export const apiCall = async (
  method,
  endpoint,
  payload = null,
  extraHeaders = {}
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...extraHeaders,
      },
    };

    // ⛔ body ONLY for non-GET
    if (payload && method !== "GET") {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
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
