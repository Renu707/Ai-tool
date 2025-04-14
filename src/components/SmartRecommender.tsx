import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tool } from "@/types";
import { Brain, Sparkles, History, BookMarked } from "lucide-react";

interface UserPreference {
  category: string;
  weight: number;
}

interface UserBehavior {
  toolId: string;
  interactionType: "view" | "bookmark" | "try" | "rate";
  timestamp: string;
}

interface RecommendationScore {
  tool: Tool;
  score: number;
  reasons: string[];
}

// Mock user preferences and behavior
const mockPreferences: UserPreference[] = [
  { category: "Content Creation", weight: 0.8 },
  { category: "Image Generation", weight: 0.6 },
  { category: "Code Generation", weight: 0.4 }
];

const mockBehavior: UserBehavior[] = [
  {
    toolId: "1",
    interactionType: "try",
    timestamp: "2024-03-10T10:00:00Z"
  },
  {
    toolId: "2",
    interactionType: "bookmark",
    timestamp: "2024-03-09T15:30:00Z"
  }
];

export default function SmartRecommender() {
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [activeTab, setActiveTab] = useState<"smart" | "history" | "bookmarks">("smart");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateRecommendations();
  }, [activeTab]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual AI-powered recommendations
      // Mock recommendation logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockRecommendations: RecommendationScore[] = [
        {
          tool: {
            id: "1",
            name: "ContentPro AI",
            description: "Advanced content generation with customizable styles",
            category: "Content Creation",
            logo: "/logos/content-pro.png",
            tags: ["content", "writing", "AI"],
            pricing: "Freemium",
            website: "https://contentpro.ai",
            useCases: ["Blog writing", "Social media", "Marketing copy"]
          },
          score: 0.95,
          reasons: [
            "Matches your content creation preference",
            "Similar to tools you've used recently",
            "High rating from users with similar interests"
          ]
        },
        {
          tool: {
            id: "2",
            name: "ImageMind",
            description: "Create stunning visuals with AI",
            category: "Image Generation",
            logo: "/logos/imagemind.png",
            tags: ["images", "design", "AI"],
            pricing: "Paid",
            website: "https://imagemind.ai",
            useCases: ["Social media graphics", "Marketing materials", "Art"]
          },
          score: 0.85,
          reasons: [
            "Aligns with your interest in image generation",
            "Complementary to your content tools",
            "Popular among content creators"
          ]
        }
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Smart Recommendations</h2>
        <p className="text-gray-600">
          Personalized tool suggestions based on your preferences and usage patterns
        </p>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 flex items-center space-x-2 ${
            activeTab === "smart"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("smart")}
        >
          <Brain className="w-4 h-4" />
          <span>Smart Picks</span>
        </button>
        <button
          className={`pb-2 flex items-center space-x-2 ${
            activeTab === "history"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <History className="w-4 h-4" />
          <span>Recently Viewed</span>
        </button>
        <button
          className={`pb-2 flex items-center space-x-2 ${
            activeTab === "bookmarks"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("bookmarks")}
        >
          <BookMarked className="w-4 h-4" />
          <span>Bookmarks</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((rec) => (
            <Card key={rec.tool.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">{rec.tool.name}</h3>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">{rec.score * 100}% match</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{rec.tool.description}</p>
                  </div>
                  {rec.tool.logo && (
                    <img
                      src={rec.tool.logo}
                      alt={rec.tool.name}
                      className="w-12 h-12 rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Why we recommend this:
                  </h4>
                  <ul className="space-y-1">
                    {rec.reasons.map((reason, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open(rec.tool.website, '_blank')}
                  >
                    Try Now
                  </Button>
                  <Button variant="outline">
                    <BookMarked className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 