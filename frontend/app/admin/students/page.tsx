"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/ui/FilterSearchBar";
import StudentCard from "@/components/AdminDashboardComponents/StudentCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";
import EditModal from "@/components/ui/EditModal";

import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppSelector } from "@/redux/hooks";
import SuccessButton from "@/components/ui/SuccessButton";

interface Student {
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
}

const StudentManagement = (): React.JSX.Element => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedProgram, setSelectedProgram] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const programs = useAppSelector((state) => state.academic.programs);
  const programNames = programs.map((program) => program.name);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
      options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    { name: "phone", placeholder: "Phone Number", type: "text" },
    { name: "cgpa", placeholder: "CGPA", type: "number" },
  ];

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${env.USER_SERVICE}/api/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data.students);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = async (data: Record<string, any>) => {
    try {
      const response = await axios.post(
        `${env.USER_SERVICE}/api/student`,
        data,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setStudents((prev) => [...prev, response.data.student]);
      setAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add student", err);
      alert("Failed to add student");
    }
  };

  const handleStudentUpdated = async (updatedValues: Record<string, any>) => {
    if (!selectedStudent) return;

    try {
      const res = await axios.put(
        `${env.USER_SERVICE}/api/student/${selectedStudent._id}`,
        updatedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setStudents((prev) =>
        prev.map((s) => (s._id === selectedStudent._id ? res.data.student : s)),
      );

      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update student", err);
      alert("Failed to update student");
    }
  };

  const handleDelete = async (student: Student) => {
    try {
      await axios.delete(`${env.USER_SERVICE}/api/student/${student._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents((prev) => prev.filter((s) => s._id !== student._id));
    } catch (err) {
      console.error("Failed to delete student", err);
      alert("Failed to delete student");
    }
  };

  useEffect(() => {
    if (token) fetchStudents();
  }, [token]);

  const filteredByProgram =
    selectedProgram === "All"
      ? students
      : students.filter((s) => s.program === selectedProgram);

  const filteredStudents = loading
    ? []
    : filteredByProgram.filter((student) => {
        const term = searchTerm.toLowerCase();
        return (
          (student.userId?.name ?? "").toLowerCase().includes(term) ||
          (student.enrollmentNumber ?? "").toLowerCase().includes(term) ||
          (student.program ?? "").toLowerCase().includes(term)
        );
      });

  const openEditModal = (student: Student) => {
    const flatStudent = {
      ...student,
      name: student.userId.name,
      email: student.userId.email,
      phone: student.userId.phone,
    };

    setSelectedStudent({ ...student, ...flatStudent });
    setEditModalOpen(true);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${env.USER_SERVICE}/api/student/bulk-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Students uploaded successfully");
      fetchStudents();
    } catch (err) {
      alert("Upload failed");
    }
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
                onChange={handleExcelUpload}
                className="hidden"
              />
              <SuccessButton onClick={() => fileInputRef.current?.click()}>
                Upload Excel
              </SuccessButton>

              <PrimaryButton onClick={() => setAddModalOpen(true)}>
                Add Student
              </PrimaryButton>
            </div>
          </div>
          <FilterSearchBar
            filters={["All", ...programNames]}
            activeFilter={selectedProgram}
            onFilterChange={setSelectedProgram}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by name, enrollment number, or program..."
          />
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-7 gap-3 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-semibold text-neutral-600">Enrollment No</p>
              <p className="text-sm font-semibold text-neutral-600">Name</p>
              <p className="text-sm font-semibold text-neutral-600">Email</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">Phone</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">Year</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">CGPA</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">Actions</p>
            </div>
            {loading ? (
              <p className="text-center py-10 text-neutral-500">Loading...</p>
            ) : filteredStudents.length > 0 ? (
              <div className="flex flex-col gap-1">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onEdit={() => openEditModal(student)}
                    onDelete={() => handleDelete(student)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-10">
                No students found
              </p>
            )}
          </div>
        </main>
        {addModalOpen && (
          <AddModal
            title="Add New Student"
            fields={studentFields}
            onClose={() => setAddModalOpen(false)}
            onSave={handleStudentAdded}
          />
        )}
        {editModalOpen && selectedStudent && (
          <EditModal
            title="Edit Student"
            fields={studentFields}
            initialValues={{
              name: selectedStudent.userId.name,
              email: selectedStudent.userId.email,
              phone: selectedStudent.userId.phone,
              enrollmentNumber: selectedStudent.enrollmentNumber,
              program: selectedStudent.program,
              year: selectedStudent.year,
              cgpa: selectedStudent.cgpa,
            }}
            onClose={() => setEditModalOpen(false)}
            onSave={handleStudentUpdated}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default StudentManagement;
