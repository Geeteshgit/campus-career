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
    <div className="bg-white hover:bg-blue-50/70 border border-neutral-200 rounded-xl p-3 shadow-sm transition flex flex-col gap-4">
      <div className="grid grid-cols-7 gap-3">
        <p className="font-semibold text-neutral-900 truncate">
          {student.enrollmentNumber}
        </p>
        <p className="font-semibold text-neutral-900 truncate">
          {student.userId?.name}
        </p>
        <p className="font-semibold text-neutral-900 truncate">
          {student.userId?.email}
        </p>
        <p className="font-semibold text-neutral-900 truncate">
          {student.userId?.phone}
        </p>
        <p className="font-semibold text-neutral-900 text-center">{student.year}</p>
        <p className="font-semibold text-neutral-900 text-center">
          {student.cgpa ?? "N/A"}
        </p>
        <div className="flex justify-end gap-2">
          <PrimaryButton onClick={() => onEdit(student)}>Edit</PrimaryButton>
          <DangerButton onClick={() => onDelete(student)}>Delete</DangerButton>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
