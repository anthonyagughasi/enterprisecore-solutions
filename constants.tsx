
import { NavItem, JobPost, Resource, CaseStudy } from './types';

export const NAVIGATION: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Resources', href: '#resources' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Company', href: '#company', children: [
    { label: 'Investor Relations', href: '#investors' },
    { label: 'Careers', href: '#careers' },
    { label: 'Media/Press', href: '#media' }
  ]}
];

export const JOBS: JobPost[] = [
  { id: '1', title: 'Senior Software Architect', department: 'Engineering', location: 'New York', type: 'Full-time', postedAt: '2026-05-15' },
  { id: '2', title: 'Director of Global Sales', department: 'Sales', location: 'London', type: 'Full-time', postedAt: '2026-05-18' },
  { id: '3', title: 'Operations Lead', department: 'Operations', location: 'Remote', type: 'Contract', postedAt: '2026-05-20' },
  { id: '4', title: 'Legal Counsel', department: 'Legal', location: 'Berlin', type: 'Hybrid', postedAt: '2026-05-22' },
];

export const RESOURCES: Resource[] = [
  { id: '1', title: 'The Future of AI in Enterprise Governance', type: 'Whitepaper', category: 'Technology', date: '2026-Q2' },
  { id: '2', title: 'Sustainable Supply Chain Optimization', type: 'Webinar', category: 'Sustainability', date: '2026-Q1' },
  { id: '3', title: 'Scaling Financial Infrastructure', type: 'Article', category: 'Strategy', date: '2026-Q2' },
];

export const CASE_STUDIES: CaseStudy[] = [
  { 
    id: '1', 
    client: 'Global Bank Alpha', 
    industry: 'FinTech', 
    outcome: '40% Efficiency Increase in Transaction Latency', 
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '2', 
    client: 'Lumina Health', 
    industry: 'Healthcare', 
    outcome: 'Optimized Real-time Surgical Monitoring Systems', 
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '3', 
    client: 'EnergiCorp', 
    industry: 'Energy', 
    outcome: 'Hybrid Grid Management & Decarbonization Roadmap', 
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800' 
  },
];
