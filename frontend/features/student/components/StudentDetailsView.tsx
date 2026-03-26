"use client";

import React from "react";

import Button from "@/shared/ui/Button";

type StudentDetailsViewProps = {
  enrollmentNumber: string;
  program: string;
  year: string;
  batch: string;
  specialization: string;
  cgpa: string;
  skills: string;
  onEdit: () => void;
};

const StudentDetailsView = ({
  enrollmentNumber,
  program,
  year,
  batch,
  specialization,
  cgpa,
  skills,
  onEdit,
}: StudentDetailsViewProps): React.JSX.Element => {
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
            {enrollmentNumber}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm text-neutral-500">Program</p>
          <p className="text-base text-neutral-900 font-medium">{program}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Year</p>
          <p className="text-base text-neutral-900 font-medium">{year}</p>
        </div>
        <div className="w-full">
          <p className="text-sm text-neutral-500">Batch</p>
          <p className="text-base text-neutral-900 font-medium">{batch}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Specialization</p>
          <p className="text-base text-neutral-900 font-medium">
            {specialization}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm text-neutral-500">CGPA</p>
          <p className="text-base text-neutral-900 font-medium">{cgpa}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-500">Skills</p>
        <p className="text-base text-neutral-900 font-medium whitespace-pre-wrap">
          {skills}
        </p>
      </div>
    </div>
  );
};

export default StudentDetailsView;
