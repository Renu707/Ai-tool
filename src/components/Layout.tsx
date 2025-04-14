import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  PlusCircle, 
  Brain, 
  Sparkles, 
  Layout as LayoutIcon, 
  PlayCircle,
  Scale,
  Zap,
  Menu
} from "lucide-react";
import { categories } from "@/data/categories";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
} from "./ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ai-assistant", label: "AI Assistant", icon: Brain },
  { href: "/smart-recommendations", label: "Smart Recommendations", icon: Sparkles },
  { href: "/tool-stacks", label: "Tool Stacks", icon: LayoutIcon },
  { href: "/workflows", label: "Interactive Workflow", icon: PlayCircle },
  { href: "/compare", label: "Compare Tools", icon: Scale },
  { href: "/tool-of-day", label: "Tool of the Day", icon: Zap },
  { href: "/submit", label: "Submit Tool", icon: PlusCircle },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="flex items-center px-4 h-16">
            <SidebarTrigger className="mr-4 md:hidden" />
            <Navbar />
          </div>
        </header>

        <div className="flex-1 flex">
          <Sidebar>
            <SidebarContent>
              {/* Main Navigation */}
              <div className="space-y-1 p-4">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Categories */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => {
                    const isActive = location.pathname === `/category/${category.id}`;
                    return (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
} 