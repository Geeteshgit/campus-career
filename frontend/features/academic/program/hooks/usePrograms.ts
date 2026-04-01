import type { Program } from "../types/program.types";
import { useProgramsQuery } from "./queries";

export const usePrograms = () => {
  const {
    data: programsData,
    isPending: programsLoading,
    isError: programsError,
    error: programsErrorObj,
  } = useProgramsQuery();

  const programs: Program[] = programsData?.programs ?? [];

  return { programs, programsLoading, programsError, programsErrorObj };
};
