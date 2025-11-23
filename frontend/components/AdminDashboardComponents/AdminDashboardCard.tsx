import Link from "next/link";
import React from "react";

interface AdminDashboardCardProps {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

const AdminDashboardCard = ({
  title,
  subtitle,
  href,
  icon,
}: AdminDashboardCardProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 p-6 bg-white border border-neutral-300 rounded-xl shadow hover:shadow-lg hover:border-blue-500 hover:scale-[1.01] duration-300 transition-all"
    >
      <div className="text-blue-500 text-3xl">{icon}</div>

      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="text-neutral-600 text-sm">{subtitle}</p>
    </Link>
  );
};

export default AdminDashboardCard;
