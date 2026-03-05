import { usersApi } from "@/lib/axios";

export const updateMyAccount = async (payload: {
  phone: string;
}) => {
  const { data } = await usersApi.put("/api/users", payload);
  return data;
};

export const getUserStats = async () => {
  const { data } = await usersApi.get("/api/users/stats");
  return data;
};