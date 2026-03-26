"use client";

import {
  useResourcesQuery,
  useStudentResourcesQuery,
} from "../api/resources.queries";
import { Resource } from "../types/resource.types";

export const useResources = () => {
  const {
    data: resourcesData,
    isPending: resourcesLoading,
    isError: resourcesError,
    error: resourcesErrorObj,
  } = useResourcesQuery();

  const resources: Resource[] = resourcesData?.resources ?? [];

  return { resources, resourcesLoading, resourcesError, resourcesErrorObj };
};

export const useStudentResources = (program: string) => {
  const {
    data: resourcesData,
    isPending: resourcesLoading,
    isError: resourcesError,
    error: resourcesErrorObj,
  } = useStudentResourcesQuery(program);

  const resources: Resource[] = resourcesData?.resources ?? [];

  return { resources, resourcesLoading, resourcesError, resourcesErrorObj };
};
