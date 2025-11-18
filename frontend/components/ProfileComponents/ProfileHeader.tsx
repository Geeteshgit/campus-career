import React from "react";

interface ProfileHeaderProps {
  name: string;
}

const ProfileHeader = ({ name }: ProfileHeaderProps): React.JSX.Element => {
  return (
    <div className="flex items-center gap-4 pb-4 sm:pb-8 border-b border-neutral-300">
      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white text-3xl sm:text-4xl font-bold">
          {name?.charAt(0).toUpperCase()}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900">{name}</h2>
    </div>
  );
};

export default ProfileHeader;
