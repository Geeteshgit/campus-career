import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentCard = ({
  student,
  onView,
  onEdit,
  onDelete,
}: StudentCardProps): React.JSX.Element => {
  return (
    <div className="bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition flex flex-col gap-4">
      <div className="grid grid-cols-6 items-center gap-3">
        <p className="font-semibold text-neutral-900 truncate">
          {student.enrollmentNumber}
        </p>
        <p className="font-semibold text-neutral-900 truncate">
          {student.userId?.name}
        </p>
        <p className="font-semibold text-neutral-900 truncate">
          {student.userId?.email}
        </p>
        <p className="font-semibold text-neutral-900 truncate text-center">
          {student.userId?.phone}
        </p>
        <p className="font-semibold text-base text-neutral-900 text-center">{student.year}</p>
        <div className="flex justify-center items-center gap-5">
          <span className="text-xl cursor-pointer text-neutral-900 hover:scale-105 transition duration-300" onClick={() => onView(student)}><MdOutlineRemoveRedEye /></span>
          <span className="text-xl cursor-pointer text-blue-500 hover:scale-105 transition duration-300" onClick={() => onEdit(student)}><FiEdit2 /></span>
          <span className="text-xl cursor-pointer text-red-500 hover:scale-105 transition duration-300" onClick={() => onDelete(student)}><RiDeleteBin6Line /></span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
