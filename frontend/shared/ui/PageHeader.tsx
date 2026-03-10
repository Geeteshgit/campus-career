import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-700">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
