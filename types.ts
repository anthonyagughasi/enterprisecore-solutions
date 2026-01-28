
export enum Language {
  EN = 'en',
  DE = 'de',
  FR = 'fr'
}

export interface JobPost {
  id: string;
  title: string;
  department: 'Engineering' | 'Sales' | 'Marketing' | 'Operations' | 'Legal';
  location: 'New York' | 'London' | 'Berlin' | 'Remote';
  type: 'Full-time' | 'Contract' | 'Hybrid';
  postedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Whitepaper' | 'Webinar' | 'Article' | 'Case Study';
  category: 'Strategy' | 'Technology' | 'Sustainability';
  date: string;
  summary?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: 'FinTech' | 'Logistics' | 'Energy' | 'Healthcare';
  outcome: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
