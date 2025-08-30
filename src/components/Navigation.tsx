import React from 'react';
import { Home, Building2, Settings, Heart, Leaf, Users } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  profile: Record<string, number>;
}

export function Navigation({ activeSection, setActiveSection, profile }: NavigationProps) {
  const navItems = [
    { id: 'welcome', label: 'Home', icon: Home },
    { id: 'city', label: 'City Explorer', icon: Building2 },
    { id: 'lifestyle', label: 'Lifestyle', icon: Settings },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'environment', label: 'Environment', icon: Leaf },
    { id: 'social', label: 'Social', icon: Users }
  ];

  const overallScore = Math.round(
    Object.values(profile).reduce((acc, val) => acc + val, 0) / Object.values(profile).length
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2070</span>
            </div>
            <span className="text-white font-semibold text-lg">Life Simulator</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="text-xs text-gray-400">Life Score</div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                overallScore >= 80 ? 'bg-green-500/20 text-green-300' :
                overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {overallScore}/100
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}