
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AITutor from './components/AITutor';
import { generateStepByStepGuide } from './services/geminiService';

const COURSES = [
  { id: 'js-101', name: 'JavaScript Mastery', level: 'Beginner', icon: '⚡' },
  { id: 'py-101', name: 'Python Fundamentals', level: 'Beginner', icon: '🐍' },
  { id: 'react-101', name: 'React Foundations', level: 'Intermediate', icon: '⚛️' },
  { id: 'db-101', name: 'SQL & Databases', level: 'Beginner', icon: '🗄️' },
];

const App: React.FC = () => {
  const [searchTopic, setSearchTopic] = useState('');
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'roadmap'>('explore');

  const handleGenerateRoadmap = async () => {
    if (!searchTopic.trim()) return;
    setIsGenerating(true);
    setActiveTab('roadmap');
    const result = await generateStepByStepGuide(searchTopic);
    setRoadmap(result);
    setIsGenerating(false);
  };

  return (
    <Layout>
      <div className="space-y-12 pb-20">
        {/* Hero Section */}
        <section className="text-center py-12 px-4 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Learn Programming <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Step by Step.
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop guessing what to learn next. Get a personalized AI-powered roadmap or choose from our expert-curated courses.
          </p>
          
          <div className="max-w-xl mx-auto flex gap-2 p-2 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
            <input 
              type="text" 
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="What do you want to learn today?"
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-white"
            />
            <button 
              onClick={handleGenerateRoadmap}
              disabled={isGenerating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? 'Mapping...' : 'Generate Roadmap'}
            </button>
          </div>
        </section>

        {/* Dynamic Tabs */}
        <div className="border-b border-slate-800 flex gap-8">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`pb-4 px-2 font-semibold transition-all ${activeTab === 'explore' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500'}`}
          >
            Explore Courses
          </button>
          {roadmap.length > 0 && (
            <button 
              onClick={() => setActiveTab('roadmap')}
              className={`pb-4 px-2 font-semibold transition-all ${activeTab === 'roadmap' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500'}`}
            >
              My Custom Roadmap
            </button>
          )}
        </div>

        {activeTab === 'explore' ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map(course => (
              <div key={course.id} className="group bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{course.icon}</div>
                <h3 className="text-xl font-bold mb-1">{course.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  course.level === 'Beginner' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                }`}>
                  {course.level}
                </span>
                <p className="mt-4 text-sm text-slate-400 line-clamp-2">
                  Master {course.name} with interactive challenges and AI support.
                </p>
                <div className="mt-6 flex items-center justify-between text-indigo-400 font-medium">
                  <span>Start Learning</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="max-w-3xl mx-auto space-y-6">
            {roadmap.length > 0 ? (
              roadmap.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative group">
                  {idx !== roadmap.length - 1 && (
                    <div className="absolute left-[20px] top-[40px] bottom-[-20px] w-0.5 bg-slate-700 group-hover:bg-indigo-500/30 transition-colors" />
                  )}
                  <div className="w-10 h-10 shrink-0 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-colors">
                    <h4 className="text-xl font-bold mb-2 text-indigo-300">{step.title}</h4>
                    <p className="text-slate-300 mb-4">{step.description}</p>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674a1 1 0 00.951-.688l1.396-4.707A1 1 0 0015.733 10H12V5.11a1 1 0 00-1.871-.483l-1.928 3.51a1 1 0 00.178 1.205L11.5 13H8.267a1 1 0 00-.951.688l-1.396 4.707a1 1 0 00.951 1.312z" />
                        </svg>
                        Mini Challenge
                      </div>
                      <p className="text-sm code-font text-indigo-100">{step.challenge}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-500">
                <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
                Curating your personal learning path...
              </div>
            )}
          </section>
        )}
      </div>

      <AITutor currentContext={searchTopic ? `Student is interested in ${searchTopic}` : ""} />
    </Layout>
  );
};

export default App;
