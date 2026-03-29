import { useState } from "react";
import {
  CreateStudentPayload,
  PopulatedStudent,
  UpdateStudentPayload,
} from "../types/student.types";
import {
  useBulkCreateStudentsMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "./mutations";
export const useStudentManagement = () => {
  const [addStudentModalOpen, setAddStudentModalOpen] =
    useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<PopulatedStudent | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [viewStudentModalOpen, setViewStudentModalOpen] =
    useState<boolean>(false);

  const { createStudent, isPending: createPending } =
    useCreateStudentMutation();
  const { updateStudent, isPending: updatePending } =
    useUpdateStudentMutation();
  const { deleteStudent, isPending: deletePending } =
    useDeleteStudentMutation();
  const { bulkCreateStudents, isPending: bulkUploadPending } =
    useBulkCreateStudentsMutation();

  const handleCreateStudent = async (payload: CreateStudentPayload) => {
    try {
      await createStudent(payload);
      setAddStudentModalOpen(false);
    } catch (err) {
      console.error("Failed to add student", err);
    }
  };

  const handleUpdateStudent = async (payload: UpdateStudentPayload) => {
    if (!selectedStudent) return;

    try {
      await updateStudent({ id: selectedStudent._id, payload });
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update student", err);
      alert("Failed to update student");
    }
  };

  const handleDeleteStudent = async (student: PopulatedStudent) => {
    try {
      await deleteStudent(student._id);
    } catch (err) {
      console.error("Failed to delete student", err);
      alert("Failed to delete student");
    }
  };

  const handleCreateBulkStudents = async (file: File) => {
    try {
      await bulkCreateStudents(file);
      alert("Students uploaded successfully");
    } catch (err) {
      console.error("Bulk upload failed:", err);
      alert("Upload failed");
    }
  };

  const openViewStudentModal = (student: PopulatedStudent) => {
    setSelectedStudent(student);
    setViewStudentModalOpen(true);
  };

  const openEditStudentModal = (student: PopulatedStudent) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  return {
    createPending,
    updatePending,
    deletePending,
    bulkUploadPending,

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
  };
};
