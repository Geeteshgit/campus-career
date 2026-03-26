"use client";

import { useAdminsQuery } from "../api/admins.queries";
import { Admin } from "../types/admin.types";

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
