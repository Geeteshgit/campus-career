// External Libraries
import clsx from "clsx";

type FilterButtonsProps = {
  filters: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
};

const FilterButtons = ({
  filters,
  activeFilter = "",
  onFilterChange = () => {},
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={clsx(
            "px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer",
            activeFilter === filter
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-neutral-700 border-neutral-400 hover:bg-blue-50",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
