import React from 'react';
import { Tab } from '../types';
import { BookOpenIcon, AcademicCapIcon, SparklesIcon, HomeIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  showHomeButton?: boolean;
  onGoHome?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  showHomeButton = false,
  onGoHome 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50 pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 safe-top">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-center relative">
          
          {/* Home Button (Top Left) */}
          {showHomeButton && onGoHome && (
            <button 
              onClick={onGoHome}
              className="absolute left-4 p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all"
              aria-label="Back to Home"
            >
              <HomeIcon className="w-6 h-6" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <SparklesIcon className="w-8 h-8 text-sky-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-slate-700 tracking-tight">ZooLingo</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 flex justify-around z-50 safe-bottom ring-1 ring-black/5">
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-2xl transition-all duration-300 ${
            activeTab === 'learn' 
              ? 'bg-sky-100 text-sky-600 shadow-sm transform scale-105' 
              : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <AcademicCapIcon className="w-6 h-6 mb-1" />
          <span className="text-xs font-bold">Learn</span>
        </button>
        
        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-2xl transition-all duration-300 ${
            activeTab === 'vocab' 
              ? 'bg-violet-100 text-violet-600 shadow-sm transform scale-105' 
              : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <BookOpenIcon className="w-6 h-6 mb-1" />
          <span className="text-xs font-bold">Vocab</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-2xl transition-all duration-300 ${
            activeTab === 'quiz' 
              ? 'bg-pink-100 text-pink-600 shadow-sm transform scale-105' 
              : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <ClipboardDocumentCheckIcon className="w-6 h-6 mb-1" />
          <span className="text-xs font-bold">Test</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;