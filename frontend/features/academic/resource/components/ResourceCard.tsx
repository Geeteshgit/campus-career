// External Libraries
import clsx from "clsx";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
import type { Resource } from "../types/resource.types";

type ResourceCardProps = {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => Promise<void>;
  deletePending?: boolean;
};

const ResourceCard = ({
  resource,
  onEdit,
  onDelete,
  deletePending = false,
}: ResourceCardProps) => {
  return (
    <div className="bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition flex flex-col gap-4">
      <div className={"grid grid-cols-4 gap-3 w-full items-center"}>
        <p className="font-semibold text-neutral-900 truncate">
          {resource.title}
        </p>
        <a
          href={resource.url}
          target="_blank"
          className="col-span-2 text-blue-600 underline break-all truncate"
        >
          {resource.url}
        </a>
        <div className="flex justify-center items-center gap-6">
          <span
            className="text-xl cursor-pointer text-blue-500 hover:scale-105 transition duration-300"
            onClick={() => onEdit(resource)}
          >
            <FiEdit2 />
          </span>
          <span
            className={clsx("text-xl text-red-500 transition duration-300", {
              "cursor-not-allowed": deletePending,
              "cursor-pointer hover:scale-105": !deletePending,
            })}
            onClick={() => !deletePending && onDelete(resource)}
          >
            <RiDeleteBin6Line />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
