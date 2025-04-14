
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="gradient-text">Discover the Best AI Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Navigate the AI landscape with AI Compass. Find the perfect tools for your needs, 
          whether you're creating content, coding, researching, or building a business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
            Explore All Tools
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            Learn More
            <ArrowDown size={16} />
          </Button>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-500"></div>
            <span className="text-sm font-medium text-gray-500">200+ Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary-500"></div>
            <span className="text-sm font-medium text-gray-500">7 Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-500">Updated Weekly</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
