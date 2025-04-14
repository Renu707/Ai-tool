import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold gradient-text mb-4">AI Compass</h2>
            <p className="text-gray-600 mb-4">
              Navigate the AI landscape with confidence. Discover and explore the best
              AI tools for your personal and professional needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-primary-600">Home</a></li>
              <li><a href="#categories" className="text-gray-600 hover:text-primary-600">Categories</a></li>
              <li><a href="#trending" className="text-gray-600 hover:text-primary-600">Trending Tools</a></li>
              <li><a href="#newest" className="text-gray-600 hover:text-primary-600">New Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Submit a Tool</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} AI Compass. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
