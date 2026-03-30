// React
import { InputHTMLAttributes } from "react";

type FileUploadFieldProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const FileUploadField = ({
  file,
  onFileChange,
  ...props
}: FileUploadFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <input
        type="file"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 
                   focus:ring-blue-500 outline-none bg-white"
        {...props}
      />

      {file && (
        <p className="text-sm text-green-600 mt-1">Uploaded: {file.name}</p>
      )}
    </div>
  );
};

export default FileUploadField;
