import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { tools } from "@/data/tools";
import { Tool } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WorkflowStep {
  tool: Tool;
  description: string;
}

interface Workflow {
  steps: WorkflowStep[];
  description: string;
}

interface AIResponse {
  tools: Tool[];
  workflow: Workflow;
  explanation: string;
}

const EXAMPLE_PROMPTS = [
  "I want to create a YouTube channel",
  "I need to write blog posts faster",
  "I want to generate product descriptions for my store",
  "Help me create social media content"
];

export default function AIAssistant() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  // Rotate through example prompts
  const rotateExamplePrompt = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Enhanced tool matching logic
      const input = userInput.toLowerCase();
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
        if (tool.useCases) {
          tool.useCases.forEach(useCase => {
            if (keywords.some(keyword => useCase.toLowerCase().includes(keyword))) {
              score += 1;
            }
          });
        }
        
        return { tool, score };
      });
      
      // Get top 3 most relevant tools
      const relevantTools = scoredTools
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.tool);

      if (relevantTools.length === 0) {
        throw new Error("No matching tools found for your request. Please try a different search.");
      }

      const mockResponse: AIResponse = {
        tools: relevantTools,
        workflow: {
          steps: relevantTools.map((tool, index) => ({
            tool,
            description: `Step ${index + 1}: Use ${tool.name} to ${
              index === 0 ? "get started with" :
              index === relevantTools.length - 1 ? "finalize" :
              "enhance"
            } your workflow`
          })),
          description: "Here's a customized workflow based on your needs:"
        },
        explanation: `Based on your request "${userInput}", I recommend these tools that work well together. Start with ${relevantTools[0]?.name} for the foundation, then build up your workflow with the other tools.`
      };

      setAiResponse(mockResponse);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">AI Use Case Assistant</h2>
        <p className="text-gray-600">
          Tell me what you want to achieve, and I'll guide you to the perfect tools.
        </p>
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder={EXAMPLE_PROMPTS[currentPromptIndex]}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[100px]"
              onFocus={rotateExamplePrompt}
            />
            <div className="absolute bottom-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={rotateExamplePrompt}
                type="button"
              >
                Try another example
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !userInput.trim()}
            className="w-full"
          >
            {isLoading ? "Finding the perfect tools..." : "Get Personalized Recommendations"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {aiResponse && !error && (
        <div className="space-y-6">
          <Card className="p-6">
            <p className="text-gray-700">{aiResponse.explanation}</p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Recommended Workflow</h3>
            <p className="text-gray-600">{aiResponse.workflow.description}</p>
            <div className="space-y-4">
              {aiResponse.workflow.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.tool.name}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recommended Tools</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aiResponse.tools.map((tool) => (
                <Card key={tool.id} className="p-4">
                  <h4 className="font-medium">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{tool.category}</span>
                    <Button variant="link" size="sm" className="text-primary-600">
                      Learn more →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 