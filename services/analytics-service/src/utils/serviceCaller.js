import axios from "axios";

export const callService = async (url, token) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
