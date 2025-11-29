"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DangerButton from "@/components/ui/DangerButton";
import InputField from "@/components/FormComponents/InputField";
import axios from "axios";
import { env } from "@/config/env";

interface Program {
  _id: string;
  name: string;
}

const ConfigurationsPage = (): React.JSX.Element => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [newProgram, setNewProgram] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPrograms(response.data.programs);
    } catch (err) {
      console.error("Failed to fetch programs:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const addProgram = async () => {
    if (!newProgram.trim()) return;

    try {
      const response = await axios.post(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs`,
        { name: newProgram.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPrograms((prev) => [...prev, response.data.program]);
      setNewProgram("");
    } catch (err) {
      console.error("Failed to add program:", err);
      alert("Could not add program");
    }
  };

  const deleteProgram = async (programId: string) => {
    try {
      await axios.delete(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs/${programId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPrograms((prev) => prev.filter((p) => p._id !== programId));
    } catch (err) {
      console.error("Failed to delete program:", err);
      alert("Could not delete program");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-10">
        <PageHeader title="System Configurations" subtitle="Manage Programs" />

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-neutral-800">Programs</h2>

          <div className="flex gap-2">
            <InputField
              name="program"
              value={newProgram}
              onChange={(e) => setNewProgram(e.target.value)}
              placeholder="Add Program"
            />
            <PrimaryButton onClick={addProgram}>Add</PrimaryButton>
          </div>

          <div className="flex flex-col gap-2">
            {programs.length === 0 ? (
              <p className="text-neutral-600 text-center py-4">
                No programs available.
              </p>
            ) : (
              programs.map((program) => (
                <div
                  key={program._id}
                  className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-2"
                >
                  <p className="font-medium text-neutral-800">{program.name}</p>

                  <DangerButton onClick={() => deleteProgram(program._id)}>
                    Delete
                  </DangerButton>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ConfigurationsPage;
