import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  getMyStudentProfile,
  getAllStudents,
  getStudentByUserId,
  PaginationParams,
} from "../api/students.api";

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
