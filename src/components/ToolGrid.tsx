import { useState, useEffect } from "react";
import ToolCard from "./ToolCard";
import { Tool } from "@/types";

interface ToolGridProps {
  tools: Tool[];
  title?: string;
  category?: string | null;
  searchQuery?: string;
}

const ToolGrid = ({ tools, title, category, searchQuery }: ToolGridProps) => {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);

  useEffect(() => {
    let result = [...tools];
    
    if (category) {
      result = result.filter(tool => 
        // Check both single category and categories array
        tool.category === category || 
        tool.categories?.includes(category)
      );
    }
    
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
          tool.useCases.some(useCase => useCase.toLowerCase().includes(query))
      );
    }
    
    setFilteredTools(result);
  }, [tools, category, searchQuery]);

  if (filteredTools.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No tools found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolGrid;
