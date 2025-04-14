import Layout from "@/components/Layout";
import SmartRecommender from "@/components/SmartRecommender";

export default function SmartRecommendationsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Smart Recommendations</h1>
          <p className="text-gray-600 text-lg">
            Get personalized AI tool recommendations based on your needs and preferences.
          </p>
        </div>

        <SmartRecommender />
      </div>
    </Layout>
  );
} 