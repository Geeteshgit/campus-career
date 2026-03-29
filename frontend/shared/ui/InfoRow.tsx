// React
import React from "react";

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="w-full">
    <p className="text-sm text-neutral-500">{label}</p>
    <p className="text-base text-neutral-900 font-medium">{value}</p>
  </div>
);

export default InfoRow;
