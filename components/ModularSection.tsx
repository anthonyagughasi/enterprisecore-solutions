
import React from 'react';

interface ModularSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'gray';
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const ModularSection: React.FC<ModularSectionProps> = ({ 
  title, 
  subtitle, 
  children, 
  variant = 'light',
  padding = 'md',
  id
}) => {
  const bgClasses = {
    light: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-950 text-white'
  };

  const padClasses = {
    sm: 'py-12',
    md: 'py-20 lg:py-32',
    lg: 'py-32 lg:py-48'
  };

  return (
    <section id={id} className={`${bgClasses[variant]} ${padClasses[padding]} transition-all overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        {(title || subtitle) && (
          <div className="max-w-3xl mb-16">
            {subtitle && (
              <span className="block text-emerald-600 font-bold tracking-widest uppercase text-xs mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
