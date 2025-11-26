"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DangerButton from "@/components/ui/DangerButton";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";
import EditModal from "@/components/ui/EditModal";
import FilterSearchBar from "@/components/ui/FilterSearchBar";

const programs = ["B.Tech", "BCA", "MCA", "BBA", "MBA"];

type ResourceLink = {
  id: string;
  title: string;
  url: string;
  program: string;
};

const PrepareAdminPage = (): React.JSX.Element => {
  const [activeProgram, setActiveProgram] = useState("B.Tech");
  const [searchTerm, setSearchTerm] = useState("");

  const [resources, setResources] = useState<ResourceLink[]>([
    {
      id: "1",
      title: "B.Tech Aptitude Test Prep",
      url: "https://example.com/btech-apt",
      program: "B.Tech",
    },
    {
      id: "2",
      title: "BCA Programming Basics",
      url: "https://example.com/bca-progjfwifiuf23hriurfh23iurh23iurh23iufh23jfkn23fiufv23hfoq3ufhi23iofg2ifg2",
      program: "BCA",
    },
    {
      id: "3",
      title: "MBA HR Interview Guide",
      url: "https://example.com/mba-hr",
      program: "MBA",
    },
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editResource, setEditResource] = useState<ResourceLink | null>(null);

  const resourceFields: FieldConfig[] = [
    { name: "title", placeholder: "Resource Title", type: "text" },
    { name: "url", placeholder: "Resource URL", type: "text" },
    {
      name: "program",
      placeholder: "Select Program",
      type: "select",
      options: programs,
    },
  ];

  const handleAddResource = (data: any) => {
    const newResource: ResourceLink = {
      id: Date.now().toString(),
      title: data.title,
      url: data.url,
      program: data.program,
    };

    setResources((prev) => [...prev, newResource]);
    setAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (updatedData: any) => {
    if (!editResource) return;

    setResources((prev) =>
      prev.map((r) => (r.id === editResource.id ? { ...r, ...updatedData } : r))
    );

    setEditModalOpen(false);
    setEditResource(null);
  };

  const filteredResources = resources
    .filter((r) => r.program === activeProgram)
    .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Preparation Resources"
            subtitle="Manage interview and placement preparation materials by program"
          />
          <PrimaryButton onClick={() => setAddModalOpen(true)}>
            Add Resource
          </PrimaryButton>
        </div>

        <FilterSearchBar
          filters={programs}
          activeFilter={activeProgram}
          onFilterChange={setActiveProgram}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search resources..."
        />

        <div className="flex flex-col gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
              >
                <p className="font-semibold text-neutral-900">{item.title}</p>
                <div className="flex gap-2 justify-end">
                  <PrimaryButton
                    onClick={() => {
                      setEditResource(item);
                      setEditModalOpen(true);
                    }}
                  >
                    Edit
                  </PrimaryButton>

                  <DangerButton onClick={() => handleDelete(item.id)}>
                    Delete
                  </DangerButton>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 text-center py-8">
              No resources found.
            </p>
          )}
        </div>
      </main>

      {addModalOpen && (
        <AddModal
          title="Add New Preparation Resource"
          fields={resourceFields}
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddResource}
        />
      )}

      {editModalOpen && editResource && (
        <EditModal
          title="Edit Preparation Resource"
          fields={resourceFields}
          initialValues={editResource}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
};

export default PrepareAdminPage;
