import React from "react";

interface FileUploadFieldProps {
  label?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

const FileUploadField = ({ label, file, onChange, required }: FileUploadFieldProps): React.JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      {label && <p className="text-xs text-neutral-500 mb-1">{label}</p>}

      <input
        type="file"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 
                   focus:ring-blue-500 outline-none bg-white"
        required={required}
      />

      {file && (
        <p className="text-sm text-green-600 mt-1">
          Uploaded: {file.name}
        </p>
      )}
    </div>
  );
};

export default FileUploadField;
