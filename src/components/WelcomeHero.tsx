import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeHeroProps {
  onExplore: () => void;
}

export function WelcomeHero({ onExplore }: WelcomeHeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Life in 2070
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Explore your future life in an AI-powered world. Simulate smart cities, 
          optimize your health with nanotechnology, and build sustainable communities.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Cities</h3>
            <p className="text-gray-400 text-sm">Explore autonomous transportation, vertical farms, and AI-managed infrastructure</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Health</h3>
            <p className="text-gray-400 text-sm">Simulate longevity treatments, AI diagnostics, and personalized medicine</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Global Impact</h3>
            <p className="text-gray-400 text-sm">See how your choices affect climate, society, and future generations</p>
          </div>
        </div>

        <button
          onClick={onExplore}
          className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
        >
          <span className="flex items-center space-x-2">
            <span>Begin Your 2070 Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
}