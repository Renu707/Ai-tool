export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  categories?: string[];
  logo?: string;
  tags: string[];
  pricing: string;
  website: string;
  useCases: string[];
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color?: string;
}
