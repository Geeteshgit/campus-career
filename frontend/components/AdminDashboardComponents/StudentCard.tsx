import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";

type Student = {
  id: number;
  name: string;
  roll: string;
  program: string;
  year: string;
  email: string;
  phone: string;
  cgpa: string;
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
      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {/* Enrollment */}
          <div>
            <p className="text-[13px] text-neutral-500">Enrollment Number</p>
            <p className="font-semibold text-neutral-900">{student.roll}</p>
          </div>

          {/* Name */}
          <div>
            <p className="text-[13px] text-neutral-500">Name</p>
            <p className="font-semibold text-neutral-900">{student.name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-[13px] text-neutral-500">Email</p>
            <p className="font-semibold text-neutral-900">{student.email}</p>
          </div>

          {/* Year */}
          <div>
            <p className="text-[13px] text-neutral-500">Year</p>
            <p className="font-semibold text-neutral-900">{student.year}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-[13px] text-neutral-500">Phone</p>
            <p className="font-semibold text-neutral-900">{student.phone}</p>
          </div>

          {/* CGPA */}
          <div>
            <p className="text-[13px] text-neutral-500">CGPA</p>
            <p className="font-semibold text-neutral-900">{student.cgpa}</p>
          </div>
        </div>
      </div>

      {/* BUTTON ROW */}
      <div className="flex justify-end gap-2">
        <PrimaryButton onClick={() => onEdit(student)}>Edit</PrimaryButton>
        <DangerButton onClick={() => onDelete(student)}>Delete</DangerButton>
      </div>
    </div>
  );
};

export default StudentCard;
