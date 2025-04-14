
export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  tags: string[];
  pricing: "Free" | "Freemium" | "Paid";
  website: string;
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  useCases: string[];
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color?: string;
}
