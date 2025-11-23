"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/FilterSearchBar";
import StudentCard from "@/components/AdminDashboardComponents/StudentCard";
import AddStudentModal from "@/components/AdminDashboardComponents/AddStudentModal";
import PrimaryButton from "@/components/ui/PrimaryButton";

// STUDENT TYPE
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

// DUMMY DATA
const allStudents: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "BT23CSE001",
    program: "B.Tech",
    year: "3rd Year",
    email: "aarav@example.com",
    phone: "9876543210",
    cgpa: "8.7",
  },
  {
    id: 2,
    name: "Sneha Patel",
    roll: "BCA22A013",
    program: "BCA",
    year: "2nd Year",
    email: "sneha@example.com",
    phone: "9876500001",
    cgpa: "9.1",
  },
];

const programs = ["All", "B.Tech", "BCA", "MCA", "MBA", "BBA"];

const StudentManagement = (): React.JSX.Element => {
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>(allStudents);
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  const handleEdit = (student: Student) => {
    alert(`Edit ${student.name}`);
  };

  const handleDelete = (student: Student) => {
    alert(`Delete ${student.name}`);
  };

  const handleStudentAdded = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
    setAddStudentModalOpen(false);
  };

  // FILTER BY PROGRAM
  const filteredByDept =
    selectedProgram === "All"
      ? students
      : students.filter((student) => student.program === selectedProgram);

  // SEARCH
  const filteredStudents = filteredByDept.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.roll.toLowerCase().includes(term) ||
      student.program.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 bg-white flex flex-col gap-8">
        
        {/* HEADER + BUTTON */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Student Management"
            subtitle="View and manage all the students"
          />
          <PrimaryButton onClick={() => setAddStudentModalOpen(true)}>Add Student</PrimaryButton>
        </div>

        {/* FILTER BAR */}
        <FilterSearchBar
          filters={programs}
          activeFilter={selectedProgram}
          onFilterChange={(value) => setSelectedProgram(value)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by name, roll number, or program..."
        />

        {/* STUDENT LIST */}
        {filteredStudents.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-center py-10">
            No students found
          </p>
        )}

      </main>

      {/* ADD STUDENT MODAL */}
      {addStudentModalOpen && (
        <AddStudentModal
          onClose={() => setAddStudentModalOpen(false)}
          onStudentAdded={handleStudentAdded}
        />
      )}
    </>
  );
};

export default StudentManagement;
