"use client";

import React from "react";
import CloseButton from "./CloseButton";

interface ViewStudentModalProps {
  title: string;
  student: {
    name: string;
    email: string;
    phone: string;
    enrollmentNumber: string;
    program: string;
    year: string;
    batch: string;
    specialization: string;
    cgpa: number;
  };
  onClose: () => void;
}

const ViewStudentModal = ({
  title,
  student,
  onClose,
}: ViewStudentModalProps): React.JSX.Element => {
  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-neutral-500">{label}</span>
      <span className="font-semibold text-neutral-900">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col gap-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} />

        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow label="Name" value={student.name} />
          <InfoRow label="Email" value={student.email} />
          <InfoRow label="Phone" value={student.phone} />
          <InfoRow label="Enrollment Number" value={student.enrollmentNumber} />
          <InfoRow label="Program" value={student.program} />
          <InfoRow label="Year" value={student.year} />
          <InfoRow label="Batch" value={student.batch} />
          <InfoRow label="Specialization" value={student.specialization} />
          <InfoRow label="CGPA" value={student.cgpa} />
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
