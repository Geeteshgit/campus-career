import { usersApi } from "@/lib/axios";

export const getAllAdmins = async () => {
  const { data } = await usersApi.get("/admins");
  return data;
};

export const getAdminById = async (id: string) => {
  const { data } = await usersApi.get(`/admins/${id}`);
  return data;
};

export const createAdmin = async (payload: {
  name: string;
  email: string;
  phone: string;
}) => {
  const { data } = await usersApi.post("/admins", payload);
  return data;
};

export const updateAdminById = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const { data } = await usersApi.put(`/admins/${id}`, payload);
  return data;
};

export const deleteAdminById = async (id: string) => {
  const { data } = await usersApi.delete(`/admins/${id}`);
  return data;
};
