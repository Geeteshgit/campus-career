"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyStudentProfile,
  updateMyStudentProfile,
  uploadStudentResume,
  getAllStudents,
  getStudentByUserId,
  createStudent,
  bulkCreateStudents,
  updateStudent,
  deleteStudent,
  PaginationParams,
} from "../api/students.api";
import { Student, UpdateStudentPayload } from "../types/student.types";

export const useMyStudentProfileQuery = () => {
  return useQuery({
    queryKey: ["students", "me"],
    queryFn: getMyStudentProfile,
  });
};

export const useAllStudentsQuery = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => getAllStudents(params),
  });
};

export const useInfiniteStudentsQuery = (
  params?: Omit<PaginationParams, "page">,
) => {
  return useInfiniteQuery({
    queryKey: ["students", "infinite", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAllStudents({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.hasMore) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useStudentByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["students", userId],
    queryFn: () => getStudentByUserId(userId),
    enabled: !!userId,
  });
};

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
      payload: UpdateStudentPayload;
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
