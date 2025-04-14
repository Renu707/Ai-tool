import { useRouter } from 'next/router';
import Layout from "@/components/Layout";
import ToolGrid from "@/components/ToolGrid";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find the category details
  const category = categories.find(cat => cat.id === id);
  
  // Filter tools by category
  const categoryTools = tools.filter(tool => tool.categories?.includes(id as string));

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{category?.name || 'Category'}</h1>
          <p className="text-gray-600 text-lg">
            {category?.description || 'Explore tools in this category'}
          </p>
        </div>

        <section>
          <ToolGrid tools={categoryTools} />
        </section>
      </div>
    </Layout>
  );
} 