
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { ModularSection } from './components/ModularSection';
import { JOBS, RESOURCES, CASE_STUDIES } from './constants';
import { JobPost, Resource, CaseStudy } from './types';
import { summarizeResource, suggestRole } from './services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data for charts in Investor Relations updated to 2026
const financialData = [
  { name: '2023', revenue: 4200, profit: 1100 },
  { name: '2024', revenue: 5100, profit: 1400 },
  { name: '2025', revenue: 6800, profit: 1950 },
  { name: '2026 (E)', revenue: 8400, profit: 2600 },
];

const App: React.FC = () => {
  // Filters and States
  const [jobFilter, setJobFilter] = useState<{dept: string, loc: string}>({dept: 'All', loc: 'All'});
  const [csFilter, setCsFilter] = useState<string>('All');
  const [resourceSummary, setResourceSummary] = useState<Record<string, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<string | null>(null);
  const [userBio, setUserBio] = useState('');
  const [careerAiSuggestion, setCareerAiSuggestion] = useState<string | null>(null);

  // Filtered lists
  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => 
      (jobFilter.dept === 'All' || job.department === jobFilter.dept) &&
      (jobFilter.loc === 'All' || job.location === jobFilter.loc)
    );
  }, [jobFilter]);

  const filteredCaseStudies = useMemo(() => {
    return csFilter === 'All' ? CASE_STUDIES : CASE_STUDIES.filter(cs => cs.industry === csFilter);
  }, [csFilter]);

  // AI Actions
  const handleSummarize = async (resource: Resource) => {
    setLoadingSummary(resource.id);
    try {
      const summary = await summarizeResource(resource.title, resource.category);
      setResourceSummary(prev => ({ ...prev, [resource.id]: summary }));
    } finally {
      setLoadingSummary(null);
    }
  };

  const handleAiRoleMatch = async () => {
    if (!userBio.trim()) return;
    setCareerAiSuggestion("Analyzing your background...");
    const suggestion = await suggestRole(userBio);
    setCareerAiSuggestion(suggestion);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Enterprise skyscraper"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
          <span className="inline-block text-emerald-400 font-bold tracking-widest uppercase text-sm mb-6">
            Engineering the 2026 Global Economy
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight max-w-4xl tracking-tighter mb-8">
            The Hub for <br/>
            <span className="text-emerald-500">Autonomous</span> Enterprise.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-light leading-relaxed">
            EnterpriseCore delivers next-generation infrastructure and strategic intelligence for global leaders.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/10">
              Our Solutions
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold rounded hover:bg-white/10 transition-all">
              Watch Vision 2026
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Investor Preview */}
      <ModularSection id="investors" subtitle="Investor Relations" title="Fiscal Resilience, Exponential Scale" variant="gray">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-8 text-center lg:text-left">Projected Revenue Growth (USD M)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-8">
            <div className="border-l-4 border-emerald-600 pl-6">
              <p className="text-4xl font-black text-slate-900">$8.4B</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">2026 Target Revenue</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-6">
              <p className="text-4xl font-black text-slate-900">140+</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Markets Served</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-6">
              <p className="text-4xl font-black text-slate-900">AAA</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Stable Credit Rating</p>
            </div>
            <button className="w-full py-4 text-emerald-600 border border-emerald-600 rounded font-bold hover:bg-emerald-50 transition-colors">
              Q1 2026 Report
            </button>
          </div>
        </div>
      </ModularSection>

      {/* Resources with AI Summarization */}
      <ModularSection id="resources" subtitle="Strategy Lab" title="Insights into the 2026 Enterprise">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES.map(resource => (
            <div key={resource.id} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-widest">
                  {resource.type}
                </span>
                <span className="text-xs text-slate-400 font-medium">{resource.date}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {resource.title}
              </h4>
              
              {resourceSummary[resource.id] ? (
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg text-sm text-emerald-900 italic">
                  " {resourceSummary[resource.id]} "
                </div>
              ) : (
                <button 
                  onClick={() => handleSummarize(resource)}
                  disabled={loadingSummary === resource.id}
                  className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-800 disabled:opacity-50 transition-colors mb-6"
                >
                  <svg className={`w-4 h-4 ${loadingSummary === resource.id ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {loadingSummary === resource.id ? 'Analyzing...' : 'Generate 2026 AI Insight'}
                </button>
              )}
              
              <a href="#" className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
                Full Access <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          ))}
        </div>
      </ModularSection>

      {/* Case Studies with Filters */}
      <ModularSection id="case-studies" subtitle="Performance Benchmarks" title="Impact Across Global Industries" variant="dark">
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'FinTech', 'Healthcare', 'Energy', 'Logistics'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCsFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                csFilter === cat 
                ? 'bg-emerald-600 border-emerald-600 text-white' 
                : 'bg-transparent border-slate-700 text-slate-400 hover:border-emerald-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map(cs => (
            <div key={cs.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border border-slate-800">
              <img src={cs.imageUrl} alt={cs.client} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-emerald-400 font-bold text-[10px] tracking-widest uppercase mb-2 block">{cs.industry}</span>
                <h4 className="text-2xl font-bold mb-2">{cs.client}</h4>
                <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cs.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ModularSection>

      {/* Careers with AI Matcher */}
      <ModularSection id="careers" subtitle="Global Talent Hub" title="Shape the Enterprise of 2026">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 sticky top-32">
              <h4 className="text-lg font-bold mb-4">Talent Match AI</h4>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Enter your professional trajectory and our system will map you to the ideal EnterpriseCore vertical.
              </p>
              <textarea 
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                placeholder="Ex: Architecting distributed systems for high-frequency trading..."
                className="w-full h-32 bg-white border border-slate-200 rounded-lg p-4 text-sm focus:ring-2 focus:ring-emerald-600 outline-none resize-none"
              />
              <button 
                onClick={handleAiRoleMatch}
                className="w-full mt-4 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all text-sm shadow-lg shadow-emerald-600/20"
              >
                Determine Placement
              </button>
              {careerAiSuggestion && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-900 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Placement Guidance
                  </div>
                  {careerAiSuggestion}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex gap-4 mb-8">
              <select 
                onChange={(e) => setJobFilter(prev => ({ ...prev, dept: e.target.value }))}
                className="px-4 py-2 bg-white border border-slate-200 rounded text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
              <select 
                onChange={(e) => setJobFilter(prev => ({ ...prev, loc: e.target.value }))}
                className="px-4 py-2 bg-white border border-slate-200 rounded text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">All Locations</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Berlin">Berlin</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="space-y-4">
              {filteredJobs.length > 0 ? filteredJobs.map(job => (
                <div key={job.id} className="group p-6 bg-white border border-slate-100 rounded-xl hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                  <div>
                    <h5 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{job.title}</h5>
                    <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                      <span className="text-emerald-600">{job.type}</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 border border-slate-200 rounded text-xs font-black hover:bg-slate-900 hover:text-white transition-all">
                    View Position
                  </button>
                </div>
              )) : (
                <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                  No availability matches current filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </ModularSection>

      {/* Media / Press Preview */}
      <ModularSection id="media" subtitle="Public Announcements" title="2026 Strategic Updates" variant="gray" padding="sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 h-24 bg-emerald-100 rounded-2xl flex flex-col items-center justify-center text-emerald-700">
              <span className="text-2xl font-black">22</span>
              <span className="text-[10px] font-bold uppercase">May 2026</span>
            </div>
            <div>
              <h6 className="text-xl font-bold mb-3 leading-snug">EnterpriseCore Achieves Net-Positive Energy Milestone Across European Data Hubs</h6>
              <p className="text-sm text-slate-500 line-clamp-2">By leveraging localized geothermal solutions, our infrastructure now contributes energy back to the grid...</p>
              <a href="#" className="mt-4 inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-800 transition-colors">Press Release</a>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 h-24 bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-600">
              <span className="text-2xl font-black">18</span>
              <span className="text-[10px] font-bold uppercase">May 2026</span>
            </div>
            <div>
              <h6 className="text-xl font-bold mb-3 leading-snug">Board of Directors Authorizes $2B Share Buyback for 2026 Fiscal Year</h6>
              <p className="text-sm text-slate-500 line-clamp-2">Reinforcing investor confidence through strong cash flow and sustained market outperformance...</p>
              <a href="#" className="mt-4 inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-800 transition-colors">Investor News</a>
            </div>
          </div>
        </div>
      </ModularSection>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Architect the 2026 organization.</h2>
          <p className="text-xl text-emerald-100 mb-12">Connect with EnterpriseCore for global infrastructure that outpaces the market.</p>
          <button className="px-10 py-5 bg-slate-950 text-white font-black rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Secure Consult
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default App;
