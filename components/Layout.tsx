
import React, { useState, useEffect } from 'react';
import { NAVIGATION } from '../constants';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
              ENTERPRISE<span className="text-emerald-600">CORE</span>
            </a>
            <nav className="hidden lg:flex items-center gap-6">
              {NAVIGATION.map((item) => (
                <div key={item.label} className="group relative">
                  <a 
                    href={item.href} 
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors py-2"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-slate-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.children.map(child => (
                        <a 
                          key={child.label} 
                          href={child.href}
                          className="block px-4 py-3 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer"
              aria-label="Select Language"
            >
              <option value={Language.EN}>EN</option>
              <option value={Language.DE}>DE</option>
              <option value={Language.FR}>FR</option>
            </select>
            <button className="hidden sm:block px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
              Contact Us
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-xl font-bold mb-6 tracking-tighter">ENTERPRISE<span className="text-emerald-600">CORE</span></h2>
            <p className="text-sm leading-relaxed mb-6">
              Leading global enterprise infrastructure and strategic advisory for the digital-first economy.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white text-xs font-bold">In</div>
              <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white text-xs font-bold">Tw</div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Whitepapers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Media Assets</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">Corporate</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Investor Relations</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Global Leadership</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ESG Commitments</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between text-xs">
          <p>© 2026 EnterpriseCore Systems Inc. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Built for Strategic Resilience.</p>
        </div>
      </footer>
    </div>
  );
};
