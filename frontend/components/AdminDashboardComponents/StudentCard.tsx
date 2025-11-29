import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";

type Student = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  enrollmentNumber: string;
  program: string;
  year: string;
  cgpa: number;
};

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentCard = ({
  student,
  onEdit,
  onDelete,
}: StudentCardProps): React.JSX.Element => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
          <div>
            <p className="text-[13px] text-neutral-500">Enrollment Number</p>
            <p className="font-semibold text-neutral-900">
              {student.enrollmentNumber}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-neutral-500">Name</p>
            <p className="font-semibold text-neutral-900">
              {student.userId?.name}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-neutral-500">Email</p>
            <p className="font-semibold text-neutral-900">
              {student.userId?.email}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-neutral-500">Year</p>
            <p className="font-semibold text-neutral-900">{student.year}</p>
          </div>
          <div>
            <p className="text-[13px] text-neutral-500">Phone</p>
            <p className="font-semibold text-neutral-900">
              {student.userId?.phone}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-neutral-500">CGPA</p>
            <p className="font-semibold text-neutral-900">
              {student.cgpa ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <PrimaryButton onClick={() => onEdit(student)}>Edit</PrimaryButton>
        <DangerButton onClick={() => onDelete(student)}>Delete</DangerButton>
      </div>
    </div>
  );
};

export default StudentCard;
