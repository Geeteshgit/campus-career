import { useCallback, useState } from "react";
import { Job } from "../types/job.types";

export const useJobFilters = () => {
  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const applyFilters = useCallback(
    (jobs: Job[]) => {
      const filteredByType =
        filter === "All" ? jobs : jobs.filter((j) => j.type === filter);

      const term = searchTerm.toLowerCase();
      return filteredByType.filter((job) => {
        const company = job.company?.toLowerCase() ?? "";
        const role = job.role?.toLowerCase() ?? "";
        const location = job.location?.toLowerCase() ?? "";
        const pkg = job.package?.toLowerCase() ?? "";
        return (
          company.includes(term) ||
          role.includes(term) ||
          location.includes(term) ||
          pkg.includes(term)
        );
      });
    },
    [filter, searchTerm],
  );

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    applyFilters,
  };
};
