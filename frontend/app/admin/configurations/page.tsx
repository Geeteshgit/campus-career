"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DangerButton from "@/components/ui/DangerButton";
import InputField from "@/components/FormComponents/InputField";

const ConfigurationsPage = (): React.JSX.Element => {
  // PROGRAMS LIST
  const [programs, setPrograms] = useState<string[]>([
    "B.Tech",
    "BCA",
    "MCA",
    "MBA",
    "BBA",
  ]);
  const [newProgram, setNewProgram] = useState("");

  // YEARS LIST
  const [years, setYears] = useState<number[]>([1, 2, 3, 4]);
  const [newYear, setNewYear] = useState<number | "">("");

  // Add program
  const addProgram = () => {
    if (!newProgram.trim()) return;
    setPrograms([...programs, newProgram.trim()]);
    setNewProgram("");
  };

  const addYear = () => {
    if (newYear === "" || isNaN(Number(newYear)) || Number(newYear) <= 0) return;

    const yearNum = Number(newYear);

    if (years.includes(yearNum)) return; 

    setYears([...years, yearNum]);
    setNewYear("");
  };

  const deleteProgram = (p: string) => {
    setPrograms(programs.filter((item) => item !== p));
  };

  const deleteYear = (y: number) => {
    setYears(years.filter((item) => item !== y));
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-10">
        
        <PageHeader
          title="System Configurations"
          subtitle="Manage Programs and Academic Years"
        />

        {/* PROGRAMS SECTION */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-neutral-800">Programs</h2>

          {/* Add program input */}
          <div className="flex gap-2">
            <InputField
              name="program"
              value={newProgram}
              onChange={(e) => setNewProgram(e.target.value)}
              placeholder="Add Program"
            />
            <PrimaryButton onClick={addProgram}>Add</PrimaryButton>
          </div>

          {/* Program list */}
          <div className="flex flex-col gap-2">
            {programs.map((program, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-2"
              >
                <p className="font-medium text-neutral-800">{program}</p>

                <DangerButton onClick={() => deleteProgram(program)}>
                  Delete
                </DangerButton>
              </div>
            ))}
          </div>
        </div>

        {/* YEARS SECTION  */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-neutral-800">Academic Years</h2>

          {/* Add year input */}
          <div className="flex gap-2">
            <input
              type="number"
              value={newYear}
              min={1}
              onChange={(e) => {
                const value = e.target.value;
                setNewYear(value === "" ? "" : Number(value));
              }}
              placeholder="Add Academic Year (e.g., 1, 2, 3)"
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg"
            />
            <PrimaryButton onClick={addYear}>Add</PrimaryButton>
          </div>

          {/* Year list */}
          <div className="flex flex-col gap-2">
            {years.map((year, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-2"
              >
                <p className="font-medium text-neutral-800">{year}</p>

                <DangerButton onClick={() => deleteYear(year)}>
                  Delete
                </DangerButton>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ConfigurationsPage;
