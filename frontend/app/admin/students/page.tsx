"use client";

// React
import React, { useRef, useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import FilterButtons from "@/shared/ui/FilterButtons";
import FormModal from "@/shared/ui/FormModal";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import Button from "@/shared/ui/Button";
import AsyncState from "@/shared/ui/AsyncState";

// Shared Hooks
import { useDebounce } from "@/shared/hooks/useDebounce";

// Shared Types
import { FieldConfig } from "@/shared/types/modal.types";

// Features
import { ProtectedRoute } from "@/features/auth";
import {
  CreateStudentPayload,
  StudentCard,
  useStudents,
  useStudentManagement,
  ViewStudentModal,
} from "@/features/student";
import { usePrograms, years } from "@/features/academic";

const StudentManagement = (): React.JSX.Element => {
  const [selectedProgram, setSelectedProgram] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const { programs, programsLoading, programsError, programsErrorObj } =
    usePrograms();
  const programNames = programs.map((program) => program.name);

  const {
    students,
    studentsLoading,
    studentsFetching,
    studentsError,
    studentsErrorObj,
    hasMore,
    handleShowMore,

  } = useStudents({
    selectedProgram,
    selectedYear,
    search: debouncedSearch,
  });

  const {
    addStudentModalOpen,
    editModalOpen,
    viewStudentModalOpen,
    selectedStudent,
    setAddStudentModalOpen,
    setEditModalOpen,
    setViewStudentModalOpen,
    handleCreateStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    handleCreateBulkStudents,
    openViewStudentModal,
    openEditStudentModal,
  } = useStudentManagement();

  const studentFields: FieldConfig[] = [
    { name: "name", placeholder: "Student Name", type: "text" },
    {
      name: "enrollmentNumber",
      placeholder: "Enrollment Number",
      type: "text",
    },
    { name: "email", placeholder: "Email", type: "email" },
    {
      name: "program",
      placeholder: "Select Program",
      type: "select",
      options: programNames,
    },
    {
      name: "year",
      placeholder: "Select Year",
      type: "select",
      options: years,
    },
    {
      name: "batch",
      placeholder: "Batch",
      type: "text",
    },
    {
      name: "specialization",
      placeholder: "Specialization",
      type: "text",
    },
    { name: "phone", placeholder: "Phone Number", type: "text" },
    { name: "cgpa", placeholder: "CGPA", type: "number" },
  ];

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExcelUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleCreateBulkStudents(file);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Student Management"
              subtitle="View and manage all the students"
            />
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUploadChange}
                className="hidden"
              />
              <Button
                variant="success"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Excel
              </Button>

              <Button
                variant="primary"
                onClick={() => setAddStudentModalOpen(true)}
              >
                Add Student
              </Button>
            </div>
          </div>
          <AsyncState
            isLoading={programsLoading}
            isError={programsError}
            error={programsErrorObj}
            isEmpty={programs.length === 0}
            loadingText="Loading programs..."
            errorText="Failed to load programs"
            emptyText="No programs found"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <FilterButtons
                  filters={["All", ...programNames]}
                  activeFilter={selectedProgram}
                  onFilterChange={setSelectedProgram}
                />
                <FilterButtons
                  filters={["All", ...years]}
                  activeFilter={selectedYear}
                  onFilterChange={setSelectedYear}
                />
              </div>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by name or enrollment number"
              />
            </div>
          </AsyncState>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-6 gap-3 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-semibold text-neutral-600">
                Enrollment No
              </p>
              <p className="text-sm font-semibold text-neutral-600">Name</p>
              <p className="text-sm font-semibold text-neutral-600">Email</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Phone
              </p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Year
              </p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Actions
              </p>
            </div>
            <AsyncState
              isLoading={studentsLoading}
              isError={studentsError}
              error={studentsErrorObj}
              isEmpty={students.length === 0}
              loadingText="Loading students..."
              errorText="Failed to load students"
              emptyText="No students found"
            >
              <div className="flex flex-col gap-1">
                {students.map((student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onView={() => openViewStudentModal(student)}
                    onEdit={() => openEditStudentModal(student)}
                    onDelete={() => handleDeleteStudent(student)}
                  />
                ))}
                {hasMore && (
                  <div className="flex justify-center py-6">
                    <Button
                      variant="primary"
                      disabled={studentsFetching}
                      onClick={handleShowMore}
                    >
                      {studentsFetching ? "Loading..." : "Show More"}
                    </Button>
                  </div>
                )}
              </div>
            </AsyncState>
          </div>
        </main>

        {addStudentModalOpen && (
          <FormModal
            title="Add New Student"
            fields={studentFields}
            onClose={() => setAddStudentModalOpen(false)}
            onSave={(values) =>
              handleCreateStudent(values as CreateStudentPayload)
            }
          />
        )}
        {editModalOpen && selectedStudent && (
          <FormModal
            title="Edit Student"
            fields={studentFields}
            initialValues={{
              name: selectedStudent.userId.name,
              email: selectedStudent.userId.email,
              phone: selectedStudent.userId.phone,
              enrollmentNumber: selectedStudent.enrollmentNumber,
              program: selectedStudent.program,
              year: selectedStudent.year,
              batch: selectedStudent.batch,
              specialization: selectedStudent.specialization,
              cgpa: selectedStudent.cgpa,
            }}
            onClose={() => setEditModalOpen(false)}
            onSave={handleUpdateStudent}
          />
        )}
        {viewStudentModalOpen && selectedStudent && (
          <ViewStudentModal
            title="Student Details"
            student={{
              name: selectedStudent.userId.name,
              email: selectedStudent.userId.email,
              phone: selectedStudent.userId.phone,
              enrollmentNumber: selectedStudent.enrollmentNumber,
              program: selectedStudent.program,
              year: selectedStudent.year,
              batch: selectedStudent.batch,
              specialization: selectedStudent.specialization,
              cgpa: selectedStudent.cgpa,
            }}
            onClose={() => setViewStudentModalOpen(false)}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default StudentManagement;
