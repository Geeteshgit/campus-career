import AdminDashboardCard from "@/components/AdminDashboardComponents/AdminDashboardCard";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import React from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiBriefcase, FiSettings, FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";

const AdminDashboard = (): React.JSX.Element => {
  type AdminDashboardCard = {
    title: string;
    subtitle: string;
    href: string;
    icon: React.ReactNode;
  };

  const adminDashboardCards: AdminDashboardCard[] = [
    {
      title: "Manage Postings",
      subtitle: "View, create, edit, and remove job postings",
      href: "/postings",
      icon: <FiBriefcase />,
    },
    {
      title: "Manage Applications",
      subtitle: "View and manage all student job applications",
      href: "/admin/applications",
      icon: <TbChecklist />,
    },
    {
      title: "Student Management",
      subtitle: "View and manage all the students",
      href: "/admin/students",
      icon: <FiUsers />,
    },
     {
      title: "Preparation Resources",
      subtitle: "Manage interview & placement preparation content",
      href: "/admin/prepare",
      icon: <GiNotebook />, 
    },
    {
      title: "Admin Users",
      subtitle: "View and manage all the admin accounts",
      href: "/admin/admins",
      icon: <MdAdminPanelSettings />,
    },
    {
      title: "Analytics & Reports",
      subtitle: "Track metrics and platform performance",
      href: "/admin/analytics",
      icon: <BiBarChartAlt2 />,
    },
    {
      title: "System Configurations",
      subtitle: "General platform-level controls",
      href: "/admin/configurations",
      icon: <FiSettings />,
    }
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Manage platform data, job postings, users, and system controls"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminDashboardCards.map((card, index) => (
            <AdminDashboardCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              href={card.href}
              icon={card.icon}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
