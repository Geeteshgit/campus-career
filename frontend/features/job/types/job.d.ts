export interface Job {
  _id: string;
  company: string;
  role: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: string;
  status: "Active" | "Inactive";
  createdAt: string;
}