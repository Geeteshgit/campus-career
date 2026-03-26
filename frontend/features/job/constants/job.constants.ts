import { FieldConfig } from "@/shared/types/modal.types";

export const createJobFieldsConfig: FieldConfig[] = [
  { name: "company", placeholder: "Company" },
  { name: "role", placeholder: "Job Role" },
  { name: "location", placeholder: "Location" },
  { name: "package", placeholder: "Package / Salary" },
  { name: "deadline", placeholder: "Deadline", type: "date" },
  { name: "positions", placeholder: "Positions", type: "number" },
  {
    name: "type",
    placeholder: "Select Type",
    type: "select",
    options: ["Full-Time", "Internship"],
  },
  { name: "description", placeholder: "Job Description", type: "textarea" },
  {
    name: "requirements",
    placeholder: "Requirements (one per line)",
    type: "textarea",
  },
  { name: "eligibility", placeholder: "Eligibility", type: "textarea" },
];

export const editJobFieldsConfig: FieldConfig[] = [
    ...createJobFieldsConfig,
    {
      name: "status",
      placeholder: "Select Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];