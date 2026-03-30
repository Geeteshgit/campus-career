"use client";

// React
import React, { useRef, useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import FilterButtons from "@/shared/ui/FilterButtons";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import Button from "@/shared/ui/Button";
import AsyncState from "@/shared/ui/AsyncState";

// Shared Hooks
import { useDebounce } from "@/shared/hooks/useDebounce";

// Shared Constants
import { years } from "@/shared/constants/academics.constants";

// Features
import { ProtectedRoute } from "@/features/auth";
import {
  StudentCard,
  useStudents,
  useStudentManagement,
  ViewStudentModal,
  StudentFormModal,
} from "@/features/student";
import { usePrograms } from "@/features/academic/program";

const StudentManagement = () => {
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
          <StudentFormModal 
          mode="create" 
          defaultValues={{
            name: "",
            enrollmentNumber: "",
            email: "",
            phone: "",
            program: "",
            year: "",
            batch: "",
            specialization: "",
            cgpa: 1,
          }}
          open={addStudentModalOpen}
          onOpenChange={setAddStudentModalOpen}
          onSubmit={handleCreateStudent} 
          />
        )}
        {editModalOpen && selectedStudent && (
          <StudentFormModal
            mode="edit"
            defaultValues={{
              name: selectedStudent.userId.name,
              enrollmentNumber: selectedStudent.enrollmentNumber,
              email: selectedStudent.userId.email,
              phone: selectedStudent.userId.phone,
              program: selectedStudent.program,
              year: selectedStudent.year,
              batch: selectedStudent.batch,
              specialization: selectedStudent.specialization,
              cgpa: selectedStudent.cgpa,
            }}
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSubmit={handleUpdateStudent}
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
