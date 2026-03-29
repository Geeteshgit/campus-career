// Shared UI Components
import Button from "@/shared/ui/Button";
import { Student } from "../types/student.types";
import InfoRow from "@/shared/ui/InfoRow";

type StudentDetailsViewProps = {
  data: Student;
  onEdit: () => void;
};

const StudentDetailsView = ({ data, onEdit }: StudentDetailsViewProps) => {
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
        <InfoRow
          label="Enrollment Number"
          value={data?.enrollmentNumber ?? ""}
        />
        <InfoRow label="Program" value={data?.program ?? ""} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <InfoRow label="Year" value={data?.year ?? ""} />
        <InfoRow label="Batch" value={data?.batch ?? ""} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <InfoRow label="Specialization" value={data?.specialization ?? ""} />
        <InfoRow label="CGPA" value={data?.cgpa ?? 0} />
      </div>

      <InfoRow
        label="Skills"
        value={Array.isArray(data?.skills) ? data.skills.join(", ") : ""}
      />
    </div>
  );
};

export default StudentDetailsView;
