import Layout from "@/components/Layout";
import AIAssistant from "@/components/AIAssistant";

export default function AIAssistantPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
          <p className="text-gray-600 text-lg">
            Get personalized help and recommendations from our advanced AI assistant.
          </p>
        </div>

        <AIAssistant />
      </div>
    </Layout>
  );
} 