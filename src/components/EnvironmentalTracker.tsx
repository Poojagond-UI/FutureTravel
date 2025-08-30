import React, { useState } from 'react';
import { Globe, Droplets, Wind, Recycle, TreePine, Sun } from 'lucide-react';

interface EnvironmentalTrackerProps {
  profile: Record<string, number>;
}

export function EnvironmentalTracker({ profile }: EnvironmentalTrackerProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('carbon');

  const calculateCarbonFootprint = () => {
    const base = 15; // tons CO2/year in 2025
    const reduction = ((profile.energy + profile.transport + profile.sustainability) / 300) * 12;
    return Math.max(base - reduction, 0.5);
  };

  const calculateWaterUsage = () => {
    const base = 100; // gallons/day in 2025
    const efficiency = (profile.energy + profile.sustainability) / 200;
    return Math.max(base - (efficiency * 60), 20);
  };

  const environmentalMetrics = [
    {
      id: 'carbon',
      name: 'Carbon Footprint',
      icon: Wind,
      current: calculateCarbonFootprint(),
      unit: 'tons CO₂/year',
      target: 0.5,
      color: 'from-red-400 to-orange-500',
      description: 'Your annual carbon emissions in 2070'
    },
    {
      id: 'water',
      name: 'Water Usage',
      icon: Droplets,
      current: calculateWaterUsage(),
      unit: 'gallons/day',
      target: 20,
      color: 'from-blue-400 to-cyan-500',
      description: 'Daily water consumption with smart systems'
    },
    {
      id: 'renewable',
      name: 'Renewable Energy',
      icon: Sun,
      current: profile.energy,
      unit: '% renewable',
      target: 100,
      color: 'from-yellow-400 to-orange-500',
      description: 'Percentage of energy from renewable sources'
    },
    {
      id: 'waste',
      name: 'Waste Reduction',
      icon: Recycle,
      current: Math.round(profile.sustainability * 0.95),
      unit: '% reduced',
      target: 95,
      color: 'from-green-400 to-emerald-500',
      description: 'Waste reduction through circular economy'
    }
  ];

  const globalImpact = {
    treesPlanted: Math.round(profile.sustainability * 50),
    energySaved: Math.round((profile.energy / 100) * 15000),
    carbonOffset: Math.round((15 - calculateCarbonFootprint()) * 100) / 100
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 to-cyan-400 bg-clip-text text-transparent mb-4">
            Environmental Impact 2070
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track your environmental footprint and see how your choices shape the planet's future
          </p>
        </div>

        {/* Global Impact Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
            <TreePine className="w-8 h-8 text-green-400 mb-4" />
            <div className="text-3xl font-bold text-green-400 mb-2">{globalImpact.treesPlanted}</div>
            <div className="text-gray-300">Trees Equivalent Impact</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
            <Sun className="w-8 h-8 text-blue-400 mb-4" />
            <div className="text-3xl font-bold text-blue-400 mb-2">{globalImpact.energySaved}</div>
            <div className="text-gray-300">kWh Saved Annually</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <Globe className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-3xl font-bold text-purple-400 mb-2">{globalImpact.carbonOffset}</div>
            <div className="text-gray-300">Tons CO₂ Offset</div>
          </div>
        </div>

        {/* Environmental Metrics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">Environmental Metrics</h2>
            {environmentalMetrics.map((metric) => {
              const Icon = metric.icon;
              const progress = (metric.current / metric.target) * 100;
              const isSelected = selectedMetric === metric.id;
              
              return (
                <div
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
                        <p className="text-gray-400 text-sm">{metric.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{metric.current}</div>
                      <div className="text-gray-400 text-xs">{metric.unit}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current</span>
                      <span className="text-gray-400">Target: {metric.target} {metric.unit}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Earth Visualization */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Planet Health</h2>
            
            <div className="relative h-64 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-green-500 animate-pulse opacity-20"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-green-400 opacity-60"></div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-300 to-green-300 opacity-80"></div>
              
              {/* Health indicators */}
              <div className="absolute top-8 left-8 right-8 bottom-8 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {Math.round((profile.sustainability + profile.energy) / 2)}%
                  </div>
                  <div className="text-gray-300 text-sm">Planet Health</div>
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-bounce"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${15 + i * 12}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Ocean Health</span>
                <span className="text-cyan-400 font-semibold">{Math.round(profile.sustainability * 0.9)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Air Quality</span>
                <span className="text-green-400 font-semibold">{Math.round(profile.energy * 0.95)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Biodiversity</span>
                <span className="text-purple-400 font-semibold">{Math.round((profile.sustainability + profile.energy) / 2 * 0.8)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}