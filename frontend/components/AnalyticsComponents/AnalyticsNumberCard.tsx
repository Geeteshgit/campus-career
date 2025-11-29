import React from "react";

interface AnalyticsNumberCardProps {
  label: string;
  value: number | string;
}

const AnalyticsNumberCard = ({ label, value }: AnalyticsNumberCardProps): React.JSX.Element => {
  return (
    <div className="p-4 rounded-lg bg-white border border-blue-200 flex flex-col items-center gap-2 text-center">
      <p className="font-medium text-neutral-900 text-sm sm:text-base">
        {label}
      </p>

      {/* Reusable Circular Number Box */}
      <div className="w-15 h-15 flex items-center justify-center rounded-full border-4 border-blue-500 text-blue-500 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
};

export default AnalyticsNumberCard;
