import React from 'react';
import { Battery, Utensils, Car, Activity, Users, Leaf } from 'lucide-react';

interface LifestyleDashboardProps {
  profile: Record<string, number>;
  updateProfile: (key: string, value: number) => void;
}

interface LifestyleMetric {
  key: string;
  label: string;
  icon: React.ElementType;
  color: string;
  unit: string;
  description: string;
}

export function LifestyleDashboard({ profile, updateProfile }: LifestyleDashboardProps) {
  const metrics: LifestyleMetric[] = [
    {
      key: 'energy',
      label: 'Energy Efficiency',
      icon: Battery,
      color: 'from-yellow-400 to-orange-500',
      unit: '%',
      description: 'Smart home automation and renewable energy usage'
    },
    {
      key: 'diet',
      label: 'Nutrition Optimization',
      icon: Utensils,
      color: 'from-green-400 to-emerald-500',
      unit: '%',
      description: 'Lab-grown foods and personalized nutrition'
    },
    {
      key: 'transport',
      label: 'Mobility Score',
      icon: Car,
      color: 'from-blue-400 to-cyan-500',
      unit: '%',
      description: 'Autonomous vehicles and sustainable transport'
    },
    {
      key: 'wellness',
      label: 'Wellness Index',
      icon: Activity,
      color: 'from-pink-400 to-red-500',
      unit: '%',
      description: 'AI health monitoring and preventive care'
    },
    {
      key: 'social',
      label: 'Social Connection',
      icon: Users,
      color: 'from-purple-400 to-indigo-500',
      unit: '%',
      description: 'Community engagement and virtual interactions'
    },
    {
      key: 'sustainability',
      label: 'Eco Impact',
      icon: Leaf,
      color: 'from-teal-400 to-green-500',
      unit: '%',
      description: 'Carbon footprint and environmental stewardship'
    }
  ];

  const getPrediction = (metric: LifestyleMetric, value: number) => {
    const predictions = {
      energy: value > 80 ? 'Net-positive energy home' : value > 60 ? 'Carbon neutral living' : 'Standard efficiency',
      diet: value > 80 ? 'Optimized longevity nutrition' : value > 60 ? 'Personalized meal plans' : 'Basic nutritional needs',
      transport: value > 80 ? 'Fully autonomous mobility' : value > 60 ? 'Hybrid transport options' : 'Limited automation',
      wellness: value > 80 ? 'Enhanced longevity (120+ years)' : value > 60 ? 'Optimal health maintenance' : 'Standard healthcare',
      social: value > 80 ? 'Global community leader' : value > 60 ? 'Active community member' : 'Individual focus',
      sustainability: value > 80 ? 'Regenerative living' : value > 60 ? 'Sustainable practices' : 'Baseline impact'
    };
    return predictions[metric.key as keyof typeof predictions] || 'Unknown';
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
            Your 2070 Lifestyle
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Adjust your future lifestyle choices and see real-time predictions for health, environment, and society
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const value = profile[metric.key];
            
            return (
              <div key={metric.key} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{metric.label}</h3>
                    <p className="text-gray-400 text-sm">{metric.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Current Level</span>
                    <span className="text-white font-semibold">{value}{metric.unit}</span>
                  </div>

                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => updateProfile(metric.key, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, rgb(${value * 2.55}, ${value * 1.5}, 255) 0%, rgb(${value * 2.55}, ${value * 1.5}, 255) ${value}%, rgb(55, 65, 81) ${value}%, rgb(55, 65, 81) 100%)`
                      }}
                    />
                  </div>

                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">2070 Prediction</div>
                    <div className="text-white text-sm font-medium">{getPrediction(metric, value)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Impact Summary */}
        <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Global Impact Projection</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {Math.round((profile.sustainability + profile.energy) / 2)}%
              </div>
              <div className="text-gray-300">Climate Contribution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {Math.round((profile.wellness + profile.diet) / 2)}%
              </div>
              <div className="text-gray-300">Health Optimization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.round((profile.social + Object.values(profile).reduce((a, b) => a + b, 0) / 6) / 2)}%
              </div>
              <div className="text-gray-300">Society Impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}