// External Libraries
import clsx from "clsx";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
import type { Program } from "../types/program.types";

type ProgramCardProps = {
  program: Program;
  onDelete: (program: Program) => Promise<void>;
  deletePending?: boolean;
};

const ProgramCard = ({
  program,
  onDelete,
  deletePending = false,
}: ProgramCardProps) => {
  return (
    <div className="bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3 w-full items-center">
        <p className="col-span-3 font-semibold text-neutral-900 truncate">
          {program.name}
        </p>
        <div className="flex justify-center items-center gap-6">
          <span
            className={clsx("text-xl text-red-500 transition duration-300", {
              "cursor-not-allowed": deletePending,
              "cursor-pointer hover:scale-105": !deletePending,
            })}
            onClick={() => !deletePending && onDelete(program)}
          >
            <RiDeleteBin6Line />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
