import { Search } from "lucide-react";
import { SearchIcon } from "./icons";
import { Input } from "./ui/input";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search by...",
  debounceTime = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch, debounceTime]);

  return (
    <div className="relative flex items-center w-full max-w-[399px] ">
      <div className="absolute z-10 w-4 h-4 left-3 text-muted-foreground">
        <SearchIcon />
      </div>
      <Input
        type="search"
        placeholder={placeholder}
        className="!pl-10 p-[12px] rounded-lg bg-white !border-grey-light text-paragraph-medium focus:ring-0 focus:border-ring"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    // <div className="relative flex items-center w-full max-w-md ">
    //   <Search className="absolute w-4 h-4 left-3 text-muted-foreground" />
    //   <Input
    //     type="search"
    //     placeholder="Search by..."
    //     className="pl-10 border-input focus:ring-0 focus:border-ring"
    //   />
    // </div>
  );
};
