import { useState } from "react";
import toast from "react-hot-toast";
import type { PopulatedStudent } from "../types/student.types";
import type { StudentFormData } from "../schemas/student.schema";
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

  const handleCreateStudent = async (payload: StudentFormData) => {
    try {
      await createStudent(payload);
      setAddStudentModalOpen(false);
      toast.success("Student created successfully");
    } catch (error) {
      console.error("Failed to create student", error);
      toast.error("Failed to create student");
    }
  };

  const handleUpdateStudent = async (payload: StudentFormData) => {
    if (!selectedStudent) return;

    try {
      await updateStudent({ id: selectedStudent._id, payload });
      setEditModalOpen(false);
      toast.success("Student updated successfully");
    } catch (err) {
      console.error("Failed to update student", err);
      toast.error("Failed to update student");
    }
  };

  const handleDeleteStudent = async (student: PopulatedStudent) => {
    try {
      await deleteStudent(student._id);
      toast.success("Student deleted successfully");
    } catch (err) {
      console.error("Failed to delete student", err);
      toast.error("Failed to delete student");
    }
  };

  const handleCreateBulkStudents = async (file: File) => {
    try {
      await bulkCreateStudents(file);
      toast.success("Students created successfully");
    } catch (err) {
      console.error("Bulk upload failed:", err);
      toast.error("Failed to create students");
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
