import React, { useState } from 'react';
import { Building2, Car, Leaf, Zap, Users, ArrowRight } from 'lucide-react';

interface CityDistrict {
  id: string;
  name: string;
  icon: React.ElementType;
  features: string[];
  description: string;
  color: string;
}

export function CityExplorer() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts: CityDistrict[] = [
    {
      id: 'residential',
      name: 'Neo Residential',
      icon: Building2,
      features: ['Self-cleaning surfaces', 'Vertical gardens', 'AI home automation', 'Climate adaptation'],
      description: 'Smart homes with integrated ecosystems and adaptive architecture.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'transport',
      name: 'Transit Hub',
      icon: Car,
      features: ['Autonomous vehicles', 'Hyperloop stations', 'Drone highways', 'Teleportation pods'],
      description: 'Revolutionary transportation networks connecting the global community.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'green',
      name: 'Eco District',
      icon: Leaf,
      features: ['Vertical farms', 'Air purification towers', 'Renewable energy', 'Biodiversity centers'],
      description: 'Sustainable living with nature-integrated urban design.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'energy',
      name: 'Power Core',
      icon: Zap,
      features: ['Fusion reactors', 'Solar collectors', 'Energy storage', 'Quantum batteries'],
      description: 'Clean energy infrastructure powering the entire city.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'social',
      name: 'Community Hub',
      icon: Users,
      features: ['VR meeting spaces', 'Cultural centers', 'Learning pods', 'Wellness facilities'],
      description: 'Spaces for human connection and collective growth.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const selectedDistrictData = districts.find(d => d.id === selectedDistrict);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
            Neo Singapore 2070
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore the districts of tomorrow's smartest city
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* City Visualization */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">City Districts</h2>
            <div className="relative h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10"></div>
              
              {/* District Nodes */}
              <div className="relative h-full p-4">
                {districts.map((district, index) => {
                  const Icon = district.icon;
                  const positions = [
                    { top: '20%', left: '25%' },
                    { top: '15%', right: '20%' },
                    { bottom: '30%', left: '15%' },
                    { bottom: '25%', right: '25%' },
                    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
                  ];

                  return (
                    <div
                      key={district.id}
                      className={`absolute cursor-pointer group ${selectedDistrict === district.id ? 'z-10' : ''}`}
                      style={positions[index]}
                      onClick={() => setSelectedDistrict(district.id)}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${district.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                        selectedDistrict === district.id ? 'scale-125 shadow-2xl' : ''
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {district.name}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <line x1="25%" y1="25%" x2="75%" y2="20%" stroke="url(#line-gradient)" strokeWidth="2" />
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="2" />
                  <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="2" />
                  <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="2" />
                  <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* District Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            {selectedDistrictData ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedDistrictData.color} flex items-center justify-center`}>
                    <selectedDistrictData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{selectedDistrictData.name}</h3>
                    <p className="text-gray-400">{selectedDistrictData.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {selectedDistrictData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Explore District</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a District</h3>
                  <p className="text-gray-500">Click on any district in the city map to explore its features</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}