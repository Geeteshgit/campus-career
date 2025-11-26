import React from "react";

interface FilterSearchBarProps {
  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  showFilters?: boolean; 
  showSearch?: boolean;  
}

const FilterSearchBar = ({
  filters = [],
  activeFilter = "",
  onFilterChange = () => {},
  searchTerm = "",
  onSearchChange = () => {},
  placeholder = "Search...",
  showFilters = true,
  showSearch = true,
}: FilterSearchBarProps): React.JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      
      {/* FILTER BUTTONS */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-neutral-700 border-neutral-400 hover:bg-blue-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* SEARCH BOX */}
      {showSearch && (
        <div className="w-full sm:w-64 md:w-80">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 text-sm sm:text-base border border-neutral-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
