import React from "react";

interface AnalyticsCardProps {
  title: string;
  children: React.ReactNode;
}

const AnalyticsCard = ({ title, children }: AnalyticsCardProps): React.JSX.Element => {
  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 shadow-sm w-full">
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default AnalyticsCard;
