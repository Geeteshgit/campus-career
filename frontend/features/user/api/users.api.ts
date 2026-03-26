import { usersApi } from "@/lib/axios";
import { UpdateUserPayload } from "../types/user.types";

export const updateMyAccount = async (payload: UpdateUserPayload) => {
  const { data } = await usersApi.put("/users", payload);
  return data;
};