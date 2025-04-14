import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tools } from "@/data/tools";
import { Tool } from "@/types";

interface ToolStack {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
  category: string;
}

interface PersonalizedStack {
  name: string;
  description: string;
  tools: Tool[];
  reasoning: string[];
}

// Mock data - in a real app, this would come from a backend
const toolStacks: ToolStack[] = [
  {
    id: "ecommerce",
    name: "AI-powered eCommerce Store",
    description: "Complete stack for building an AI-enhanced online store",
    category: "eCommerce",
    tools: tools.slice(0, 4) // Mock data - replace with actual tool combinations
  },
  {
    id: "content-creation",
    name: "Content Creation Suite",
    description: "Tools for creating and optimizing content at scale",
    category: "Content",
    tools: tools.slice(2, 6) // Mock data
  },
  {
    id: "marketing",
    name: "AI Marketing Stack",
    description: "Essential tools for AI-powered marketing campaigns",
    category: "Marketing",
    tools: tools.slice(3, 7) // Mock data
  }
];

const EXAMPLE_IDEAS = [
  "I want to start a podcast with AI-generated content",
  "I need to create an online course with AI tools",
  "I want to build an AI-powered dropshipping business",
  "Help me set up a YouTube channel with AI assistance"
];

export default function ToolStacks() {
  const [userIdea, setUserIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalizedStack, setPersonalizedStack] = useState<PersonalizedStack | null>(null);
  const [currentExample, setCurrentExample] = useState(0);

  const rotateExample = () => {
    setCurrentExample((prev) => (prev + 1) % EXAMPLE_IDEAS.length);
  };

  const generatePersonalizedStack = async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI API call
      // Mock personalization logic for now
      const keywords = userIdea.toLowerCase().split(" ");
      const relevantTools = tools
        .filter(tool => 
          keywords.some(keyword => 
            tool.description.toLowerCase().includes(keyword) ||
            tool.category.toLowerCase().includes(keyword)
          )
        )
        .slice(0, 5);

      const mockStack: PersonalizedStack = {
        name: `Custom Stack for: ${userIdea}`,
        description: "Personalized tool combination based on your specific needs",
        tools: relevantTools,
        reasoning: relevantTools.map(tool => 
          `${tool.name} will help you ${
            tool.description.toLowerCase().includes("create") ? "create content" :
            tool.description.toLowerCase().includes("optimize") ? "optimize your workflow" :
            "enhance your process"
          }`
        )
      };

      setPersonalizedStack(mockStack);
    } catch (error) {
      console.error("Error generating stack:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Personalized Stack Generator */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Create Your Custom Tool Stack</h2>
          <p className="text-gray-600">
            Describe your idea or project, and we'll create a personalized combination of AI tools to help you succeed.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder={EXAMPLE_IDEAS[currentExample]}
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                className="min-h-[100px]"
                onFocus={rotateExample}
              />
              <div className="absolute bottom-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rotateExample}
                  type="button"
                >
                  Try another example
                </Button>
              </div>
            </div>
            <Button
              onClick={generatePersonalizedStack}
              disabled={isGenerating || !userIdea.trim()}
              className="w-full"
            >
              {isGenerating ? "Creating your stack..." : "Generate Custom Stack"}
            </Button>
          </div>
        </Card>

        {personalizedStack && (
          <Card className="p-6 border-2 border-primary-200 bg-primary-50">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">{personalizedStack.name}</h3>
                <p className="text-gray-600 mt-1">{personalizedStack.description}</p>
              </div>

              <div className="space-y-4">
                {personalizedStack.tools.map((tool, index) => (
                  <div key={tool.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{personalizedStack.reasoning[index]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-primary-200">
                <p className="text-sm text-primary-600">
                  Pro tip: Try these tools in the order shown for the best results!
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Curated Stacks */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Popular Tool Stacks</h2>
          <p className="text-gray-600">
            Curated combinations of tools to help you complete specific tasks efficiently
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {toolStacks.map((stack) => (
            <Card key={stack.id} className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{stack.name}</h3>
                <p className="text-sm text-gray-600">{stack.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700">Included Tools:</h4>
                <div className="space-y-2">
                  {stack.tools.map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-sm">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="link" size="sm" className="text-primary-600 p-0">
                  View Details →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 