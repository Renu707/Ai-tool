
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for AI tools, categories, or use cases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-20 h-12 rounded-lg shadow-sm border-gray-200"
        />
        <Button
          type="submit"
          className="absolute right-1 h-10 bg-primary-600 hover:bg-primary-700"
        >
          <Search size={18} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
