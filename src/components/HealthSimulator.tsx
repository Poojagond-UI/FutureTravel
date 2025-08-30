import React, { useState } from 'react';
import { Brain, Heart, Dna, Shield, Zap, TrendingUp } from 'lucide-react';

interface HealthSimulatorProps {
  profile: Record<string, number>;
}

export function HealthSimulator({ profile }: HealthSimulatorProps) {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('nanobots');

  const healthTechnologies = [
    {
      id: 'nanobots',
      name: 'Medical Nanobots',
      icon: Brain,
      description: 'Microscopic robots for real-time health monitoring and targeted treatment',
      benefits: ['24/7 health monitoring', 'Instant disease detection', 'Targeted drug delivery', 'Cellular repair'],
      impact: 85
    },
    {
      id: 'gene-therapy',
      name: 'Advanced Gene Therapy',
      icon: Dna,
      description: 'Personalized genetic modifications for disease prevention and enhancement',
      benefits: ['Disease immunity', 'Enhanced metabolism', 'Improved longevity', 'Optimized recovery'],
      impact: 92
    },
    {
      id: 'ai-diagnosis',
      name: 'AI Health Assistant',
      icon: Shield,
      description: 'Quantum AI for predictive health analysis and personalized recommendations',
      benefits: ['Predictive diagnostics', 'Personalized medicine', 'Mental health support', 'Lifestyle optimization'],
      impact: 78
    },
    {
      id: 'bioenhancement',
      name: 'Biological Enhancement',
      icon: Zap,
      description: 'Synthetic biology for enhanced physical and cognitive capabilities',
      benefits: ['Enhanced strength', 'Improved cognition', 'Extended lifespan', 'Rapid healing'],
      impact: 95
    }
  ];

  const calculateLifespan = () => {
    const baseLifespan = 85;
    const healthBonus = (profile.wellness / 100) * 40;
    const dietBonus = (profile.diet / 100) * 20;
    const technologyBonus = 30;
    return Math.round(baseLifespan + healthBonus + dietBonus + technologyBonus);
  };

  const getHealthScore = () => {
    return Math.round((profile.wellness + profile.diet + 85) / 3);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 to-cyan-400 bg-clip-text text-transparent mb-4">
            Health & Longevity 2070
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore cutting-edge medical technologies and their impact on your future health
          </p>
        </div>

        {/* Health Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Predicted Lifespan</h3>
            </div>
            <div className="text-4xl font-bold text-pink-400 mb-2">{calculateLifespan()} years</div>
            <div className="text-gray-400 text-sm">+{calculateLifespan() - 85} years beyond 2025 average</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Health Score</h3>
            </div>
            <div className="text-4xl font-bold text-green-400 mb-2">{getHealthScore()}/100</div>
            <div className="text-gray-400 text-sm">Overall wellness optimization</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Cognitive Enhancement</h3>
            </div>
            <div className="text-4xl font-bold text-blue-400 mb-2">{Math.round(profile.wellness * 1.2)}/100</div>
            <div className="text-gray-400 text-sm">Mental performance boost</div>
          </div>
        </div>

        {/* Technology Selection */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Medical Technologies</h2>
            {healthTechnologies.map((tech) => {
              const Icon = tech.icon;
              const isSelected = selectedTechnology === tech.id;
              
              return (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTechnology(tech.id)}
                  className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center ${
                      isSelected ? 'shadow-lg shadow-cyan-500/30' : ''
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{tech.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Health Impact:</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${tech.impact}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-cyan-400 font-semibold">{tech.impact}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technology Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            {selectedTechnology && (
              <div>
                {(() => {
                  const tech = healthTechnologies.find(t => t.id === selectedTechnology)!;
                  const Icon = tech.icon;
                  
                  return (
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Key Benefits</h4>
                        {tech.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-lg border border-cyan-500/20">
                        <div className="text-sm text-gray-400 mb-1">Estimated Cost (2070)</div>
                        <div className="text-lg font-semibold text-cyan-400">$2,500 - $8,000 / year</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Health Timeline */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Your Health Journey Timeline</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { age: 30, status: 'Preventive Care', color: 'text-blue-400' },
              { age: 50, status: 'Enhancement Phase', color: 'text-purple-400' },
              { age: 80, status: 'Longevity Optimization', color: 'text-green-400' },
              { age: 120, status: 'Advanced Life Extension', color: 'text-cyan-400' }
            ].map((milestone, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${milestone.color} mb-2`}>{milestone.age}</div>
                <div className="text-gray-300 text-sm">{milestone.status}</div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full transition-all duration-1000"
                    style={{ width: milestone.age <= calculateLifespan() ? '100%' : '30%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}