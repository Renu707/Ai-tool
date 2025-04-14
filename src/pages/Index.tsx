import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const featuredTools = tools.filter(tool => tool.featured);
  const trendingTools = tools.filter(tool => tool.trending);
  const newestTools = tools.filter(tool => tool.new);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  return (
    <Layout>
      <Hero />
      
      <div className="space-y-16">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div id="categories" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        {searchQuery ? (
          <section>
            <h2 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
            <ToolGrid tools={tools} searchQuery={searchQuery} category={activeCategory} />
          </section>
        ) : (
          <>
            <section>
              <h2 className="text-3xl font-bold mb-6">Featured Tools</h2>
              <ToolGrid tools={featuredTools} category={activeCategory} />
            </section>
            
            <section id="trending" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Trending Tools</h2>
              <ToolGrid tools={trendingTools} category={activeCategory} />
            </section>
            
            <section id="newest" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">New Tools</h2>
              <ToolGrid tools={newestTools} category={activeCategory} />
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
