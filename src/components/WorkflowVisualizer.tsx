import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tool } from "@/types";
import { ArrowRight, Zap, Clock, Star } from "lucide-react";

interface WorkflowNode {
  tool: Tool;
  inputs: string[];
  outputs: string[];
  estimatedTime: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
}

interface Workflow {
  name: string;
  description: string;
  nodes: WorkflowNode[];
  totalTime: string;
  skillLevel: string;
  automationPotential: number; // 0-100
}

// Mock data - replace with actual workflow generation
const sampleWorkflow: Workflow = {
  name: "Content Creation Pipeline",
  description: "End-to-end AI-powered content creation workflow",
  nodes: [
    {
      tool: {
        id: "1",
        name: "IdeaGen AI",
        description: "Generate content ideas",
        category: "Ideation"
      },
      inputs: ["Topic", "Target audience"],
      outputs: ["Content outline", "Keywords"],
      estimatedTime: "5-10 mins",
      complexity: "Beginner"
    },
    {
      tool: {
        id: "2",
        name: "ContentForge",
        description: "Generate detailed content",
        category: "Creation"
      },
      inputs: ["Outline", "Style preferences"],
      outputs: ["Draft content", "Citations"],
      estimatedTime: "10-15 mins",
      complexity: "Intermediate"
    },
    {
      tool: {
        id: "3",
        name: "MediaMaster",
        description: "Generate supporting media",
        category: "Media"
      },
      inputs: ["Content context", "Style guide"],
      outputs: ["Images", "Graphics"],
      estimatedTime: "5-10 mins",
      complexity: "Intermediate"
    }
  ],
  totalTime: "20-35 mins",
  skillLevel: "Intermediate",
  automationPotential: 80
};

export default function WorkflowVisualizer() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const simulateWorkflow = () => {
    setIsAnimating(true);
    let currentNode = 0;

    const animate = () => {
      if (currentNode < sampleWorkflow.nodes.length) {
        setActiveNode(currentNode);
        currentNode++;
        setTimeout(animate, 2000);
      } else {
        setIsAnimating(false);
        setActiveNode(null);
      }
    };

    animate();
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Interactive Workflow</h2>
        <p className="text-gray-600">
          See how different AI tools work together in real-world scenarios
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{sampleWorkflow.name}</h3>
              <p className="text-gray-600">{sampleWorkflow.description}</p>
            </div>
            <Button
              onClick={simulateWorkflow}
              disabled={isAnimating}
              className="flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Workflow</span>
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{sampleWorkflow.totalTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{sampleWorkflow.skillLevel}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>Automation Potential:</span>
              <div className="w-20 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${sampleWorkflow.automationPotential}%` }}
                />
              </div>
              <span>{sampleWorkflow.automationPotential}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {sampleWorkflow.nodes.map((node, index) => (
              <div key={node.tool.id} className="relative">
                <Card
                  className={`p-4 transition-all duration-300 ${
                    activeNode === index
                      ? "border-primary-500 bg-primary-50 shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{node.tool.name}</h4>
                        <p className="text-sm text-gray-600">{node.tool.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{node.estimatedTime}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Inputs:</p>
                        <ul className="list-disc list-inside text-gray-600">
                          {node.inputs.map((input, i) => (
                            <li key={i}>{input}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Outputs:</p>
                        <ul className="list-disc list-inside text-gray-600">
                          {node.outputs.map((output, i) => (
                            <li key={i}>{output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Complexity: {node.complexity}
                      </span>
                      {index < sampleWorkflow.nodes.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
} 