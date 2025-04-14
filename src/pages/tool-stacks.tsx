import Layout from "@/components/Layout";
import ToolStacks from "@/components/ToolStacks";

export default function ToolStacksPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Tool Stacks</h1>
          <p className="text-gray-600 text-lg">
            Discover and create powerful combinations of AI tools for your workflow.
          </p>
        </div>

        <ToolStacks />
      </div>
    </Layout>
  );
} 