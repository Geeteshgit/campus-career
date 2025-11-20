import AdminDashboardCard from "@/components/AdminDashboardComponents/AdminDashboardCard";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import React from "react";
import { BiBarChartAlt2, BiShieldQuarter } from "react-icons/bi";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminDashboard = (): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Manage platform data, job postings, users, and system controls"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminDashboardCard
            title="Manage Postings"
            subtitle="View, create, edit, and remove job postings"
            href="/admin/postings"
            icon={<FiBriefcase />}
          />
          <AdminDashboardCard
            title="Student Management"
            subtitle="View student profiles, performance & activity"
            href="/admin/students"
            icon={<FiUsers />}
          />
          <AdminDashboardCard
            title="Admin Users"
            subtitle="Manage admin accounts & privileges"
            href="/admin/admins"
            icon={<MdAdminPanelSettings />}
          />
          <AdminDashboardCard
            title="Permissions"
            subtitle="Assign roles and manage access control"
            href="/admin/permissions"
            icon={<BiShieldQuarter />}
          />
          <AdminDashboardCard
            title="Analytics & Reports"
            subtitle="Track metrics and platform performance"
            href="/admin/analytics"
            icon={<BiBarChartAlt2 />}
          />
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
