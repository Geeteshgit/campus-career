import axios from "axios";

export const callService = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });

    return response.data;
  } catch (err) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message || err?.message || "Unknown upstream error";
    throw new Error(`Analytics upstream call failed (${url})${status ? ` [${status}]` : ""}: ${message}`);
  }
};
