import { useProgramsQuery } from "./queries/programs";
import { Program } from "../types/program.types";

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
