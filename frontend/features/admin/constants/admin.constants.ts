import { FieldConfig } from "@/shared/types/modal.types";

export const adminFieldsConfig: FieldConfig[] = [
  { name: "name", placeholder: "Admin Name", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "phone", placeholder: "Phone Number", type: "text" },
];

export const superAdminFieldsConfig: FieldConfig[] = [
  ...adminFieldsConfig,
  {
    name: "role",
    placeholder: "Select Role",
    type: "select",
    options: ["admin", "super_admin"],
  },
];
