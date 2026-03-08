import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyStudentProfile,
  updateMyStudentProfile,
  uploadStudentResume,
  getAllStudents,
  getStudentStats,
  getStudentByUserId,
  createStudent,
  bulkCreateStudents,
  updateStudent,
  deleteStudent,
  PaginationParams,
} from "@/services/student.service";

export const useMyStudentProfile = () => {
  return useQuery({
    queryKey: ["students", "my"],
    queryFn: getMyStudentProfile,
  });
};

export const useStudentStats = () => {
  return useQuery({
    queryKey: ["students", "stats"],
    queryFn: getStudentStats,
  });
};

export const useAllStudents = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => getAllStudents(params),
  });
};

export const useStudentByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["students", userId],
    queryFn: () => getStudentByUserId(userId),
    enabled: !!userId,
  });
};

export const useUpdateMyStudentProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "my"] });
    },
  });

  return {
    updateMyStudentProfile: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUploadStudentResume = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadStudentResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "my"] });
    },
  });

  return {
    uploadStudentResume: mutation.mutateAsync,
    ...mutation,
  };
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    createStudent: mutation.mutateAsync,
    ...mutation,
  };
};

export const useBulkCreateStudents = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: bulkCreateStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    bulkCreateStudents: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, any> }) =>
      updateStudent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    updateStudent: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    retry: 1,
  });

  return {
    deleteStudent: mutation.mutateAsync,
    ...mutation,
  };
};
