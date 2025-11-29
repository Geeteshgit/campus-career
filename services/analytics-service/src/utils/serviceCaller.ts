import axios from "axios";

export const callService = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
