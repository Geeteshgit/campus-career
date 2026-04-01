import type { Resource } from "../types/resource.types";
import {
  useResourcesQuery,
  useStudentResourcesQuery,
} from "./queries";

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
