"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import PageHeader from "@/shared/ui/PageHeader";
import AsyncState from "@/shared/ui/AsyncState";

// Features
import { ProtectedRoute } from "@/features/auth";
import { useStudentResources } from "@/features/academic";

const Prepare = () => {

  const studentProgram = "B.Tech CSE"

  const { resources, resourcesLoading, resourcesError, resourcesErrorObj } =
    useStudentResources(studentProgram);

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
          <AsyncState
            isLoading={resourcesLoading}
            isError={resourcesError}
            error={resourcesErrorObj}
            isEmpty={resources.length === 0}
            loadingText="Loading resources..."
            errorText="Failed to load resources"
            emptyText={`No resources found for ${studentProgram}.`}
          >
            <ul className="list-disc list-inside space-y-2 text-blue-500">
              {resources.map((resource) => (
                <li key={resource._id}>
                  <a
                    href={resource.url}
                    target="_blank"
                    className="hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </AsyncState>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default Prepare;
