import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tools } from "@/data/tools";

interface DemoTool {
  id: string;
  name: string;
  description: string;
  demoEndpoint?: string;
  demoInputPlaceholder?: string;
}

// Mock data - in a real app, this would come from a backend
const demoableTools: DemoTool[] = [
  {
    id: "text-generator",
    name: "AI Text Generator",
    description: "Generate creative text based on your prompt",
    demoEndpoint: "/api/demo/text-generator",
    demoInputPlaceholder: "Enter a prompt to generate text..."
  },
  {
    id: "image-enhancer",
    name: "Image Enhancer",
    description: "Enhance and upscale your images",
    demoEndpoint: "/api/demo/image-enhancer",
    demoInputPlaceholder: "Paste an image URL to enhance..."
  }
];

export default function ToolDemo() {
  const [selectedTool, setSelectedTool] = useState<DemoTool | null>(null);
  const [demoInput, setDemoInput] = useState("");
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToolSelect = (tool: DemoTool) => {
    setSelectedTool(tool);
    setDemoInput("");
    setDemoResult(null);
  };

  const handleDemoSubmit = async () => {
    if (!selectedTool || !demoInput) return;

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDemoResult(
        `Sample demo result for ${selectedTool.name} with input: ${demoInput}`
      );
    } catch (error) {
      console.error("Demo error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Try Tools</h2>
        <p className="text-gray-600">
          Test out basic functionality of selected tools directly in your browser
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoableTools.map((tool) => (
          <Card
            key={tool.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedTool?.id === tool.id
                ? "border-primary-500 bg-primary-50"
                : "hover:border-primary-300"
            }`}
            onClick={() => handleToolSelect(tool)}
          >
            <h3 className="text-xl font-semibold">{tool.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
          </Card>
        ))}
      </div>

      {selectedTool && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Try {selectedTool.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              This is a limited demo. For full features, visit the tool's website.
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder={selectedTool.demoInputPlaceholder}
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleDemoSubmit}
              disabled={isLoading || !demoInput.trim()}
            >
              {isLoading ? "Processing..." : "Run Demo"}
            </Button>
          </div>

          {demoResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Result:</h4>
              <p className="text-sm">{demoResult}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
} 