import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ComparisonFeature {
  name: string;
  key: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: "Pricing", key: "pricing" },
  { name: "Features", key: "features" },
  { name: "Use Cases", key: "useCases" },
  { name: "Integration", key: "integration" },
  { name: "API Access", key: "apiAccess" },
  { name: "Support", key: "support" },
];

export default function ToolComparison() {
  const [selectedTools, setSelectedTools] = useState<typeof tools>([]);

  const handleToolSelect = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool && selectedTools.length < 3) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleToolRemove = (toolId: string) => {
    setSelectedTools(selectedTools.filter(tool => tool.id !== toolId));
  };

  const generateComparison = async () => {
    // TODO: Implement AI-powered comparison generation
    console.log("Generating comparison for:", selectedTools);
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Compare Tools</h2>
        <p className="text-gray-600">
          Select up to 3 tools to compare their features side by side
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Select onValueChange={handleToolSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Add tool to compare" />
          </SelectTrigger>
          <SelectContent>
            {tools
              .filter(tool => !selectedTools.find(t => t.id === tool.id))
              .map(tool => (
                <SelectItem key={tool.id} value={tool.id}>
                  {tool.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {selectedTools.length >= 2 && (
          <Button onClick={generateComparison}>
            Generate AI Comparison
          </Button>
        )}
      </div>

      {selectedTools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTools.map((tool) => (
            <Card key={tool.id} className="p-6 relative">
              <button
                onClick={() => handleToolRemove(tool.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>

                <div className="space-y-3">
                  {comparisonFeatures.map((feature) => (
                    <div key={feature.key} className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-700">
                        {feature.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {/* Replace with actual data from the tool */}
                        Sample {feature.name.toLowerCase()} information
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 text-sm hover:underline"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 