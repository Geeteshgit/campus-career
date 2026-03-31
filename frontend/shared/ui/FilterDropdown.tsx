// Local Imports
import Select from "./Select";

type FilterDropdownProps = {
  filters: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  placeholder?: string;
  className?: string;
};

const FilterDropdown = ({
  filters,
  activeFilter,
  onFilterChange = () => {},
  placeholder = "Select filter",
  className = "",
}: FilterDropdownProps) => {
  return (
    <Select
      options={filters}
      value={activeFilter}
      onChange={(e) => onFilterChange(e.target.value)}
      className={className}
    >
      {placeholder && !activeFilter && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
    </Select>
  );
};

export default FilterDropdown;