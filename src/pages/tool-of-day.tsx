import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";
import { tools } from "@/data/tools";
import { Tool } from "@/types";

export default function ToolOfDayPage() {
  const [toolOfDay, setToolOfDay] = useState<Tool | null>(null);

  useEffect(() => {
    // In a real app, this would be fetched from an API
    // For now, we'll randomly select a featured tool
    const featuredTools = tools.filter(tool => tool.featured);
    const randomTool = featuredTools[Math.floor(Math.random() * featuredTools.length)];
    setToolOfDay(randomTool);
  }, []);

  if (!toolOfDay) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Tool of the Day</h1>
          <p className="text-gray-600 text-lg">
            Discover a new featured AI tool every day.
          </p>
        </div>

        <Card className="p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{toolOfDay.name}</h2>
              <p className="text-gray-600 mt-2">{toolOfDay.description}</p>
            </div>
            {toolOfDay.logo && (
              <img
                src={toolOfDay.logo}
                alt={toolOfDay.name}
                className="w-16 h-16 rounded-lg"
              />
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Category</h3>
                <p className="text-gray-600">{toolOfDay.category}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Use Cases</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {toolOfDay.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {toolOfDay.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Pricing</h3>
                <p className="text-gray-600">{toolOfDay.pricing}</p>
              </div>

              <div className="flex flex-col space-y-4">
                <Button
                  className="w-full"
                  onClick={() => window.open(toolOfDay.website, '_blank')}
                >
                  Try Now <ExternalLink className="ml-2 w-4 h-4" />
                </Button>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <ThumbsUp className="mr-2 w-4 h-4" /> Helpful
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="mr-2 w-4 h-4" /> Not Helpful
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 