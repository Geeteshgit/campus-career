import type { Admin } from "../types/admin.types";
import { useAdminsQuery } from "./queries";

export const useAdmins = (searchTerm: string) => {
  const {
    data: adminsData,
    isPending: adminsLoading,
    isError: adminsError,
    error: adminsErrorObj,
  } = useAdminsQuery();

  const admins: Admin[] = adminsData?.admins ?? [];

  const filteredAdmins = admins.filter((admin) =>
    [admin.name, admin.email, admin.phone]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return { admins, filteredAdmins, adminsLoading, adminsError, adminsErrorObj };
};
