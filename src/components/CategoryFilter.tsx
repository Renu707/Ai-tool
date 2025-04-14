
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { categories } from "@/data/categories";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryFilterProps {
  onSelectCategory: (categoryId: string | null) => void;
  activeCategory: string | null;
}

// Helper function to get icon component by name
const getIconByName = (iconName: string): LucideIcon => {
  // First convert to unknown, then to the specific LucideIcon type
  const IconComponent = (LucideIcons as any)[iconName] as LucideIcon;
  return IconComponent || LucideIcons.Circle;
};

const CategoryFilter = ({ onSelectCategory, activeCategory }: CategoryFilterProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-nowrap overflow-x-auto py-4 gap-3 scrollbar-hide">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          className={`min-w-max ${activeCategory === null ? "bg-primary-600" : ""}`}
          onClick={() => onSelectCategory(null)}
        >
          All Tools
        </Button>
        
        {categories.map((category) => {
          const IconComponent = getIconByName(category.icon);
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`min-w-max ${activeCategory === category.id ? "bg-primary-600" : ""} whitespace-nowrap`}
              onClick={() => onSelectCategory(category.id)}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
