// Shared UI Components
import Button from "@/shared/ui/Button";
import { Student } from "../types/student.types";

type StudentDetailsViewProps = {
  data: Student;
  onEdit: () => void;
};

const StudentDetailsView = ({
  data,
  onEdit,
}: StudentDetailsViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-800">
          Academic Details
        </h2>
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Enrollment Number</p>
          <p className="text-base text-neutral-900 font-medium">
            {data?.enrollmentNumber ?? ""}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm text-neutral-500">Program</p>
          <p className="text-base text-neutral-900 font-medium">{data?.program ?? ""}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Year</p>
          <p className="text-base text-neutral-900 font-medium">{data?.year ?? ""}</p>
        </div>
        <div className="w-full">
          <p className="text-sm text-neutral-500">Batch</p>
          <p className="text-base text-neutral-900 font-medium">{data?.batch ?? ""}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Specialization</p>
          <p className="text-base text-neutral-900 font-medium">
            {data?.specialization ?? ""}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm text-neutral-500">CGPA</p>
          <p className="text-base text-neutral-900 font-medium">{data?.cgpa ?? 0}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-500">Skills</p>
        <p className="text-base text-neutral-900 font-medium whitespace-pre-wrap">
          {Array.isArray(data?.skills) ? data.skills.join(", ") : ""}
        </p>
      </div>
    </div>
  );
};

export default StudentDetailsView;
