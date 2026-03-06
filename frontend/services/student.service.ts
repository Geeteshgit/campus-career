import { usersApi } from "@/lib/axios";

export const getMyStudentProfile = async () => {
  const { data } = await usersApi.get("/api/students/me");
  return data;
};

export const updateMyStudentProfile = async (payload: any) => {
  const { data } = await usersApi.put("/api/students/me", payload);
  return data;
};

export const uploadStudentResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await usersApi.post(
    "/students/me/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const getAllStudents = async () => {
  const { data } = await usersApi.get("/students");
  return data;
};

export const getStudentStats = async () => {
  const { data } = await usersApi.get("/students/stats");
  return data;
};

export const getStudentByUserId = async (userId: string) => {
  const { data } = await usersApi.get(`/students/${userId}`);
  return data;
};

export const createStudent = async (payload: Record<string, any>) => {
  const { data } = await usersApi.post("/students", payload);
  return data;
};

export const bulkCreateStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await usersApi.post("/students/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return data;
};

export const updateStudent = async (id: string, payload: Record<string, any>) => {
  const { data } = await usersApi.put(`/students/${id}`, payload);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await usersApi.delete(`/students/${id}`);
  return data;
};