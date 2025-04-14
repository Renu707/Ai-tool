import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Home,
  Search,
  Layout as LayoutIcon,
  Tool,
  Compare,
  Play,
  Flask,
  Upload,
  Users,
  Brain,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover Tools", icon: Search },
  { href: "/stacks", label: "Tool Stacks", icon: LayoutIcon },
  { href: "/workflows", label: "Workflows", icon: Tool },
  { href: "/compare", label: "Compare Tools", icon: Compare },
  { href: "/demo", label: "Tool Demo", icon: Play },
  { href: "/experimental", label: "Experimental", icon: Flask },
  { href: "/submit", label: "Submit Tool", icon: Upload },
  { href: "/collaborate", label: "Collaborate", icon: Users },
  { href: "/smart", label: "Smart Features", icon: Brain },
];

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
} 