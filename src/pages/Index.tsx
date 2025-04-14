import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import AIAssistant from "@/components/AIAssistant";
import ToolStacks from "@/components/ToolStacks";
import ToolComparison from "@/components/ToolComparison";
import ToolDemo from "@/components/ToolDemo";
import ToolSubmission from "@/components/ToolSubmission";
import ExperimentalFeatures from "@/components/ExperimentalFeatures";
import WorkflowVisualizer from "@/components/WorkflowVisualizer";
import CollaborativeWorkspace from "@/components/CollaborativeWorkspace";
import SmartRecommender from "@/components/SmartRecommender";
import Footer from "@/components/Footer";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

// Helper function to get icon component by name
const getIconByName = (iconName: string): LucideIcon => {
  // First convert to unknown, then to the specific LucideIcon type
  const IconComponent = (LucideIcons as any)[iconName] as LucideIcon;
  return IconComponent || LucideIcons.Circle;
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWorkspace, setShowWorkspace] = useState(false);

  const featuredTools = tools.filter(tool => tool.featured);
  const trendingTools = tools.filter(tool => tool.trending);
  const newestTools = tools.filter(tool => tool.new);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  if (showWorkspace) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CollaborativeWorkspace />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <section className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-16">
          <AIAssistant />
        </div>

        <div className="mb-16">
          <SmartRecommender />
        </div>
        
        <div id="categories" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const IconComponent = getIconByName(category.icon);
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-all ${
                    activeCategory === category.id 
                    ? "border-primary-500 bg-primary-50" 
                    : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-3 rounded-full mb-3 ${category.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <ToolStacks />
        </div>

        <div className="mb-16">
          <WorkflowVisualizer />
        </div>
        
        {searchQuery ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
            <ToolGrid tools={tools} searchQuery={searchQuery} category={activeCategory} />
          </section>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Featured Tools</h2>
              <ToolGrid tools={featuredTools} category={activeCategory} />
            </section>
            
            <section id="trending" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Trending Tools</h2>
              <ToolGrid tools={trendingTools} category={activeCategory} />
            </section>
            
            <section id="newest" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">New Tools</h2>
              <ToolGrid tools={newestTools} category={activeCategory} />
            </section>
          </>
        )}

        <div className="mb-16">
          <ToolComparison />
        </div>

        <div className="mb-16">
          <ToolDemo />
        </div>

        <div className="mb-16">
          <ExperimentalFeatures />
        </div>

        <div className="mb-16">
          <ToolSubmission />
        </div>

        <div className="mb-16 text-center">
          <button
            onClick={() => setShowWorkspace(true)}
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <span>Open Collaborative Workspace</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
