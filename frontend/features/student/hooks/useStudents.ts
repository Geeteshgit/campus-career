"use client";

import {
	useAllStudentsQuery,
	useInfiniteStudentsQuery,
	useMyStudentProfileQuery,
	useStudentByUserIdQuery,
	useUpdateMyStudentProfileMutation,
	useUploadStudentResumeMutation,
} from "../api/students.queries";
import { useMemo } from "react";
import { PaginationParams } from "../api/students.api";
import { PopulatedStudent } from "../types/student.types";

export const useMyStudentProfile = () => {
	return useMyStudentProfileQuery();
};

export const useAllStudents = (params?: PaginationParams) => {
	return useAllStudentsQuery(params);
};

export const useStudentByUserId = (userId: string) => {
	return useStudentByUserIdQuery(userId);
};

type StudentsListParams = {
	selectedProgram: string;
	selectedYear: string;
	search: string;
};

export const useStudents = ({
	selectedProgram,
	selectedYear,
	search,
}: StudentsListParams) => {
	const {
		data: studentsData,
		isPending: studentsLoading,
		isFetching: studentsFetching,
		isError: studentsError,
		error: studentsErrorObj,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteStudentsQuery({
		program: selectedProgram,
		year: selectedYear,
		search,
	});

	const students = useMemo(() => {
		return (
			studentsData?.pages.flatMap(
				(pageData) => (pageData?.students as PopulatedStudent[]) ?? [],
			) ?? []
		);
	}, [studentsData]);

	const handleShowMore = () => {
		if (!hasNextPage || studentsFetching) return;
		void fetchNextPage();
	};

	return {
		students,
		hasMore: Boolean(hasNextPage),
		handleShowMore,
		studentsLoading,
		studentsFetching,
		studentsError,
		studentsErrorObj,
	};
};

export const useUpdateMyStudentProfile = () => {
	return useUpdateMyStudentProfileMutation();
};

export const useUploadStudentResume = () => {
	return useUploadStudentResumeMutation();
};

