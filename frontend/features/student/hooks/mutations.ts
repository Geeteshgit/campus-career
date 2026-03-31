import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Student } from "../types/student.types";
import {
  bulkCreateStudents,
  createStudent,
  deleteStudent,
  updateMyStudentProfile,
  updateStudent,
  uploadStudentResume,
} from "../api/students.api";
import type { StudentFormData } from "../schemas/student.schema";

export const useUpdateMyStudentProfileMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyStudentProfile,
    onSuccess: (data: { updatedStudent: Student }) => {
      queryClient.setQueryData(["students", "me"], {
        student: data.updatedStudent,
      });
      queryClient.invalidateQueries({ queryKey: ["students", "me"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedJobs"] });
    },
  });

  return {
    updateMyStudentProfile: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUploadStudentResumeMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadStudentResume,
    onSuccess: (data: { updatedStudent: Student }) => {
      queryClient.setQueryData(["students", "me"], {
        student: data.updatedStudent,
      });
      queryClient.invalidateQueries({ queryKey: ["students", "me"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedJobs"] });
    },
  });

  return {
    uploadStudentResume: mutation.mutateAsync,
    ...mutation,
  };
};

export const useCreateStudentMutation = () => {
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

export const useBulkCreateStudentsMutation = () => {
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

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: StudentFormData;
    }) => updateStudent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedJobs"] });
    },
  });

  return {
    updateStudent: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    deleteStudent: mutation.mutateAsync,
    ...mutation,
  };
};
