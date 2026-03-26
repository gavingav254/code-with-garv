
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white italic">
            G
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            codewith-garv
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-indigo-400 transition-colors">Courses</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">AI Playground</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Resources</a>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105">
            Dashboard
          </button>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} codewith-garv. Empowring future developers, one line at a time.</p>
      </footer>
    </div>
  );
};

export default Layout;
