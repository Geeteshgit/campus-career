"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppSelector } from "@/redux/hooks";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Resource {
  _id: string;
  title: string;
  url: string;
  program: string;
}

const Prepare = (): React.JSX.Element => {
  const student = useAppSelector((state) => state.user.studentProfile);
  const studentProgram = student?.program;

  const [materials, setMaterials] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchResources = async () => {
      if (!studentProgram) return;

      try {
        const response = await axios.get(
          `${env.ACADEMIC_CONFIG_SERVICE}/api/resources/student?program=${studentProgram}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMaterials(response.data.resources);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setLoading(false);
      }
    };

    fetchResources();
  }, [studentProgram, token]);

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />

        <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <PageHeader
            title={`${studentProgram || "Your"} Preparation Materials`}
            subtitle={`Curated resources to help ${
              studentProgram || ""
            } students prepare for placements and interviews`}
          />

          {loading ? (
            <p className="text-neutral-600 text-center py-8">
              Loading resources...
            </p>
          ) : materials.length === 0 ? (
            <p className="text-neutral-600 text-center py-8">
              No resources found for {studentProgram}.
            </p>
          ) : (
            <ul className="list-disc list-inside space-y-2 text-blue-500">
              {materials.map((item) => (
                <li key={item._id}>
                  <a
                    href={item.url}
                    target="_blank"
                    className="hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </main>
      </>
    </ProtectedRoute>
  );
};

export default Prepare;
