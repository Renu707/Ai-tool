import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { Tool } from "@/types";
import { Sparkles, Gift, Trophy } from "lucide-react";

interface UserProgress {
  toolsExplored: number;
  toolsRated: number;
  level: number;
  points: number;
}

export default function ExperimentalFeatures() {
  const [toolOfTheDay, setToolOfTheDay] = useState<Tool | null>(null);
  const [randomTool, setRandomTool] = useState<Tool | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [userProgress, setUserProgress] = useState<UserProgress>({
    toolsExplored: 0,
    toolsRated: 0,
    level: 1,
    points: 0,
  });

  // Get tool of the day
  useEffect(() => {
    // In a real app, this would be managed by a backend
    // For now, we'll use a random tool that changes daily
    const today = new Date().toDateString();
    const index = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % tools.length;
    setToolOfTheDay(tools[index]);
  }, []);

  const spinWheel = () => {
    let filteredTools = tools;
    if (selectedCategory) {
      filteredTools = tools.filter(tool => tool.category === selectedCategory);
    }
    const randomIndex = Math.floor(Math.random() * filteredTools.length);
    setRandomTool(filteredTools[randomIndex]);

    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      toolsExplored: prev.toolsExplored + 1,
      points: prev.points + 10,
      level: Math.floor((prev.points + 10) / 100) + 1,
    }));
  };

  const rateTool = (toolId: string, rating: number) => {
    // TODO: Implement actual rating system
    console.log(`Rating tool ${toolId} with ${rating} stars`);
    setUserProgress(prev => ({
      ...prev,
      toolsRated: prev.toolsRated + 1,
      points: prev.points + 20,
      level: Math.floor((prev.points + 20) / 100) + 1,
    }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Tool of the Day */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">AI Tool of the Day</h2>
        </div>
        
        {toolOfTheDay && (
          <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{toolOfTheDay.name}</h3>
                  <p className="text-sm text-gray-600">{toolOfTheDay.description}</p>
                </div>
                <Gift className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{toolOfTheDay.category}</span>
                <Button variant="outline" size="sm">
                  Try it out →
                </Button>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* Gamified Discovery */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold">Discover & Level Up</h2>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Level {userProgress.level}</h3>
                <p className="text-sm text-gray-600">
                  {userProgress.points} points • {userProgress.toolsExplored} tools explored
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Next level in</p>
                <p className="text-primary-600">{100 - (userProgress.points % 100)} points</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-md p-2"
                  aria-label="Select category for AI wheel"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button onClick={spinWheel}>
                  Spin the AI Wheel
                </Button>
              </div>

              {randomTool && (
                <Card className="p-4 border-2 border-primary-200 bg-primary-50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{randomTool.name}</h4>
                      <p className="text-sm text-gray-600">{randomTool.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => rateTool(randomTool.id, star)}
                            className="text-yellow-400 hover:text-yellow-500"
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 