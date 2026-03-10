export interface FieldConfig {
  name: string;
  placeholder: string;
  type?: "text" | "email" | "number" | "textarea" | "select" | "date";
  options?: string[];     
}