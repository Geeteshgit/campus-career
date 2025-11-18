import React from "react";

interface ProfileSaveButtonProps {
  onClick: () => void;
}

const ProfileSaveButton = ({ onClick }: ProfileSaveButtonProps): React.JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition cursor-pointer"
    >
      Save Changes
    </button>
  );
};

export default ProfileSaveButton;
