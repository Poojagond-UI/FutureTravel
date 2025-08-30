import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CityExplorer } from './components/CityExplorer';
import { LifestyleDashboard } from './components/LifestyleDashboard';
import { HealthSimulator } from './components/HealthSimulator';
import { EnvironmentalTracker } from './components/EnvironmentalTracker';
import { SocialHub } from './components/SocialHub';
import { WelcomeHero } from './components/WelcomeHero';

function App() {
  const [activeSection, setActiveSection] = useState<string>('welcome');
  const [userProfile, setUserProfile] = useState({
    energy: 50,
    diet: 70,
    transport: 60,
    wellness: 80,
    social: 65,
    sustainability: 75
  });

  const updateProfile = (key: string, value: number) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'city':
        return <CityExplorer />;
      case 'lifestyle':
        return <LifestyleDashboard profile={userProfile} updateProfile={updateProfile} />;
      case 'health':
        return <HealthSimulator profile={userProfile} />;
      case 'environment':
        return <EnvironmentalTracker profile={userProfile} />;
      case 'social':
        return <SocialHub profile={userProfile} />;
      default:
        return <WelcomeHero onExplore={() => setActiveSection('city')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        profile={userProfile}
      />
      
      <main className="relative z-10">
        {renderSection()}
      </main>
    </div>
  )
}

export default App;