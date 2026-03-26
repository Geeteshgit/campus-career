import { usersApi } from "@/lib/axios";
import { CreateStudentPayload, UpdateStudentPayload } from "../types/student.types";

export interface PaginationParams {
  page?: number;
  program?: string;
  year?: string;
  search?: string;
}

export const getMyStudentProfile = async () => {
  const { data } = await usersApi.get("/students/me");
  return data;
};

export const updateMyStudentProfile = async (payload: UpdateStudentPayload) => {
  const { data } = await usersApi.put("/students/me", payload);
  return data;
};

export const uploadStudentResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await usersApi.post(
    "/students/me/resume",
    formData,
  );

  return data;
};

export const getAllStudents = async (params: PaginationParams = {}) => {
  const { data } = await usersApi.get("/students", { params });
  return data;
};

export const getStudentByUserId = async (userId: string) => {
  const { data } = await usersApi.get(`/students/${userId}`);
  return data;
};

export const createStudent = async (payload: CreateStudentPayload) => {
  const { data } = await usersApi.post("/students", payload);
  return data;
};

export const bulkCreateStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await usersApi.post("/students/bulk-upload", formData);
  return data;
};

export const updateStudent = async (id: string, payload: UpdateStudentPayload) => {
  const { data } = await usersApi.put(`/students/${id}`, payload);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await usersApi.delete(`/students/${id}`);
  return data;
};