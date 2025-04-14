import Layout from "@/components/Layout";
import ToolComparison from "@/components/ToolComparison";

export default function ComparePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Compare Tools</h1>
          <p className="text-gray-600 text-lg">
            Compare different AI tools side by side to find the best fit for your needs.
          </p>
        </div>

        <ToolComparison />
      </div>
    </Layout>
  );
} 