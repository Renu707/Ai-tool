
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/types";
import { ExternalLink, Star } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/100x100/lightgray/white?text=AI";
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.category}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          {tool.trending && (
            <Badge variant="secondary" className="bg-red-100 hover:bg-red-200 text-red-700 border-none">
              Trending
            </Badge>
          )}
          {tool.new && (
            <Badge variant="secondary" className="bg-green-100 hover:bg-green-200 text-green-700 border-none">
              New
            </Badge>
          )}
          {tool.featured && (
            <Badge variant="secondary" className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-none">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Best for:</span>{" "}
          {tool.useCases.slice(0, 2).join(", ")}
          {tool.useCases.length > 2 ? "..." : ""}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <Badge
          variant={
            tool.pricing === "Free"
              ? "outline"
              : tool.pricing === "Freemium"
              ? "secondary"
              : "default"
          }
          className={
            tool.pricing === "Free"
              ? "text-green-700 border-green-300"
              : tool.pricing === "Freemium"
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-none"
              : "bg-purple-600"
          }
        >
          {tool.pricing}
        </Badge>
        <Button size="sm" variant="outline" className="gap-2" asChild>
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            Visit
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
