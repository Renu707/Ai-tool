import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Home,
  Search,
  LayoutIcon,
  Wrench,
  ArrowLeftRight,
  Play,
  Beaker,
  Upload,
  Users,
  Brain,
} from "lucide-react";
import { categories } from "@/data/categories";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover Tools", icon: Search },
];

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <nav className="p-4 space-y-6">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavItems.map((item) => {
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
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const isActive = router.query.id === category.id;
                  return (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
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