import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tools } from "@/data/tools";
import { Tool } from "@/types";
import { ExternalLink, ArrowRight, X } from "lucide-react";

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
  const [selectedStack, setSelectedStack] = useState<ToolStack | null>(null);

  const rotateExample = () => {
    setCurrentExample((prev) => (prev + 1) % EXAMPLE_IDEAS.length);
  };

  const generatePersonalizedStack = async () => {
    setIsGenerating(true);
    try {
      // Enhanced tool matching logic
      const input = userIdea.toLowerCase();
      const keywords = input.split(" ").filter(word => word.length > 2);
      
      // Score each tool based on relevance
      const scoredTools = tools.map(tool => {
        let score = 0;
        
        // Check tool name
        if (keywords.some(keyword => tool.name.toLowerCase().includes(keyword))) {
          score += 3;
        }
        
        // Check tool description
        keywords.forEach(keyword => {
          if (tool.description.toLowerCase().includes(keyword)) {
            score += 2;
          }
        });
        
        // Check tool category
        if (keywords.some(keyword => tool.category.toLowerCase().includes(keyword))) {
          score += 2;
        }
        
        // Check tool tags
        tool.tags.forEach(tag => {
          if (keywords.some(keyword => tag.toLowerCase().includes(keyword))) {
            score += 1;
          }
        });
        
        // Check tool use cases
        tool.useCases.forEach(useCase => {
          if (keywords.some(keyword => useCase.toLowerCase().includes(keyword))) {
            score += 1;
          }
        });
        
        return { tool, score };
      });
      
      // Sort by score and get top 5 most relevant tools
      const relevantTools = scoredTools
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.tool);

      // If we don't have enough tools, add some complementary tools
      if (relevantTools.length < 3) {
        const complementaryTools = tools
          .filter(tool => !relevantTools.includes(tool))
          .slice(0, 5 - relevantTools.length);
        relevantTools.push(...complementaryTools);
      }

      const generateReasoning = (tool: Tool) => {
        const matchingKeywords = keywords.filter(keyword => 
          tool.description.toLowerCase().includes(keyword) ||
          tool.category.toLowerCase().includes(keyword) ||
          tool.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
          tool.useCases.some(useCase => useCase.toLowerCase().includes(keyword))
        );

        if (matchingKeywords.length > 0) {
          return `${tool.name} is perfect for ${matchingKeywords.join(", ")} related tasks in your project`;
        } else {
          return `${tool.name} will complement your workflow with ${tool.category} capabilities`;
        }
      };

      const mockStack: PersonalizedStack = {
        name: `Custom Stack for: ${userIdea}`,
        description: "Personalized tool combination based on your specific needs",
        tools: relevantTools,
        reasoning: relevantTools.map(generateReasoning)
      };

      setPersonalizedStack(mockStack);
    } catch (error) {
      console.error("Error generating stack:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewDetails = (stack: ToolStack) => {
    setSelectedStack(stack);
  };

  const closeDetails = () => {
    setSelectedStack(null);
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
                  {stack.tools.slice(0, 3).map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-sm">{tool.name}</span>
                    </div>
                  ))}
                  {stack.tools.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{stack.tools.length - 3} more tools
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary-600 p-0"
                  onClick={() => handleViewDetails(stack)}
                >
                  View Details <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stack Details Modal */}
      {selectedStack && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStack.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedStack.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tools in this Stack</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedStack.tools.map((tool) => (
                      <Card key={tool.id} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium">{tool.name}</h4>
                            <a
                              href={tool.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {tool.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">How to Use This Stack</h3>
                  <p className="text-gray-600">
                    Follow these steps to get the most out of this tool combination:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Set up each tool by visiting their respective websites</li>
                    <li>Configure integrations between tools where available</li>
                    <li>Start with the first tool and progress through the workflow</li>
                    <li>Use the AI features to automate and optimize your process</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 