// External Libraries
import { clsx } from "clsx";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className
}: SearchBarProps) => {
  return (
    <div className="w-full sm:w-64 md:w-80">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          "w-full px-4 py-2 text-sm sm:text-base border border-neutral-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all",
          className,
        )}
      />
    </div>
  );
};

export default SearchBar;
