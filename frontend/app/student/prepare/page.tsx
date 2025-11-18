import React from "react";
import Navbar from "@/components/Navbar";

// Prep Materials Import
import { programMaterials } from "@/data/prepMaterials";
import PageHeader from "@/components/PageHeader";

const Prepare = (): React.JSX.Element => {
  const program: string = "MCA"; // Change this to "B.Tech", "BBA", etc.

  // ✅ Get materials for selected program
  const materials = programMaterials[program];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title={`${program} Preparation Materials`}
          subtitle={`Curated resources to help ${program} students prepare for placements
            and interviews`}
        />

        {/* List of Links */}
        <ul className="list-disc list-inside space-y-2 text-blue-500">
          {materials.map((link, index) => (
            <li key={index}>
              <a
                href={link.link}
                target="_blank"
                className="hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Prepare;
