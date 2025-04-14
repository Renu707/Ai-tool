import Layout from "@/components/Layout";
import WorkflowVisualizer from "@/components/WorkflowVisualizer";

export default function WorkflowsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Interactive Workflows</h1>
          <p className="text-gray-600 text-lg">
            Create and track your AI tool workflows with our interactive visualizer.
          </p>
        </div>

        <WorkflowVisualizer />
      </div>
    </Layout>
  );
} 