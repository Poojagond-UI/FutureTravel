import React, { useState } from 'react';
import { Users, MessageCircle, Globe, Handshake, Trophy, Heart } from 'lucide-react';

interface SocialHubProps {
  profile: Record<string, number>;
}

export function SocialHub({ profile }: SocialHubProps) {
  const [activeTab, setActiveTab] = useState<string>('communities');

  const communities = [
    {
      id: 'sustainability',
      name: 'EcoFuture Collective',
      members: 12847,
      activity: 'High',
      focus: 'Climate Solutions',
      color: 'from-green-400 to-emerald-500',
      description: 'Global community working on regenerative technologies and carbon-negative cities.',
      projects: ['Ocean Cleanup 3.0', 'Atmospheric Carbon Capture', 'Smart Grid Optimization']
    },
    {
      id: 'health',
      name: 'Longevity Network',
      members: 8932,
      activity: 'Very High',
      focus: 'Life Extension',
      color: 'from-pink-400 to-red-500',
      description: 'Researchers and enthusiasts advancing human longevity and wellness technologies.',
      projects: ['Nano-Medicine Trials', 'AI Health Diagnostics', 'Gene Therapy Research']
    },
    {
      id: 'tech',
      name: 'Neural Collective',
      members: 15634,
      activity: 'Medium',
      focus: 'AI & Consciousness',
      color: 'from-purple-400 to-indigo-500',
      description: 'Exploring the intersection of human consciousness and artificial intelligence.',
      projects: ['Brain-Computer Interfaces', 'Digital Consciousness', 'AI Ethics Framework']
    }
  ];

  const globalChallenges = [
    {
      id: 'climate',
      title: 'Climate Restoration Challenge',
      participants: 2.1,
      progress: 67,
      reward: '50,000 Social Credits',
      deadline: '6 days',
      color: 'from-green-400 to-cyan-500'
    },
    {
      id: 'wellness',
      title: 'Global Wellness Initiative',
      participants: 1.8,
      progress: 43,
      reward: '30,000 Social Credits',
      deadline: '12 days',
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 'innovation',
      title: 'Tech Innovation Sprint',
      participants: 0.9,
      progress: 89,
      reward: '75,000 Social Credits',
      deadline: '2 days',
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  const socialScore = Math.round((profile.social + profile.sustainability + profile.wellness) / 3);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-cyan-400 bg-clip-text text-transparent mb-4">
            Social Impact Hub
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with global communities and participate in challenges that shape humanity's future
          </p>
        </div>

        {/* Social Score Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <Users className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-3xl font-bold text-purple-400 mb-2">{socialScore}</div>
            <div className="text-gray-300 text-sm">Social Impact Score</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6">
            <Globe className="w-8 h-8 text-cyan-400 mb-4" />
            <div className="text-3xl font-bold text-cyan-400 mb-2">147K</div>
            <div className="text-gray-300 text-sm">Global Connections</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
            <Trophy className="w-8 h-8 text-green-400 mb-4" />
            <div className="text-3xl font-bold text-green-400 mb-2">23</div>
            <div className="text-gray-300 text-sm">Challenges Completed</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
            <Heart className="w-8 h-8 text-pink-400 mb-4" />
            <div className="text-3xl font-bold text-pink-400 mb-2">89%</div>
            <div className="text-gray-300 text-sm">Community Trust</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          {[
            { id: 'communities', label: 'Communities', icon: Users },
            { id: 'challenges', label: 'Global Challenges', icon: Trophy },
            { id: 'impact', label: 'Your Impact', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'communities' && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div key={community.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${community.color} flex items-center justify-center`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{community.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{community.members.toLocaleString()} members</span>
                      <span className="text-green-400">{community.activity} activity</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{community.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-400">Active Projects:</div>
                  {community.projects.map((project, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span>{project}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 text-cyan-300 font-semibold py-2 rounded-lg transition-all duration-300 border border-cyan-500/30">
                  Join Community
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {globalChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{challenge.title}</h3>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span>{challenge.participants}M participants</span>
                      <span>Ends in {challenge.deadline}</span>
                      <span className="text-yellow-400">{challenge.reward}</span>
                    </div>
                  </div>
                  <button className={`mt-4 lg:mt-0 bg-gradient-to-r ${challenge.color} hover:shadow-lg transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl`}>
                    Join Challenge
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Global Progress</span>
                    <span className="text-white font-semibold">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${challenge.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Personal Impact Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Communities Joined</span>
                  <span className="text-cyan-400 font-semibold">7</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Projects Contributed</span>
                  <span className="text-green-400 font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Global Rank</span>
                  <span className="text-purple-400 font-semibold">Top 15%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Social Credits Earned</span>
                  <span className="text-yellow-400 font-semibold">847,230</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Recognition & Achievements</h2>
              
              <div className="space-y-4">
                {[
                  { title: 'Climate Champion', level: 'Gold', icon: Trophy, color: 'text-yellow-400' },
                  { title: 'Health Advocate', level: 'Silver', icon: Heart, color: 'text-gray-300' },
                  { title: 'Tech Innovator', level: 'Bronze', icon: Users, color: 'text-orange-400' },
                  { title: 'Community Builder', level: 'Platinum', icon: Handshake, color: 'text-cyan-400' }
                ].map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5">
                      <Icon className={`w-8 h-8 ${achievement.color}`} />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm">{achievement.level} Level</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${achievement.color} bg-current bg-opacity-20`}>
                        {achievement.level}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}