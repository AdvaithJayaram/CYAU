import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileCompletionBot from '../components/profile/ProfileCompletionBot';
import {
  User,
  Briefcase,
  DollarSign,
  Shield,
  MessageSquare,
  Star,
  Users,
  Lock,
} from 'lucide-react';

export default function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: User },
    { id: 'professional', label: 'Professional Details', icon: Briefcase },
    { id: 'dealflow', label: 'Deal Flow', icon: DollarSign },
    { id: 'legal', label: 'Legal & Compliance', icon: Shield },
    { id: 'negotiation', label: 'Negotiation', icon: MessageSquare },
    { id: 'portfolio', label: 'Portfolio', icon: Star },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-6">
          <img
            src={user?.imageUrl || 'https://via.placeholder.com/100'}
            alt={user?.fullName || 'Profile'}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-600">Complete your profile to unlock all features</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <ProfileForm section={activeTab} />
        </div>
      </div>

      <ProfileCompletionBot
        currentStep={activeTab}
        onStepChange={setActiveTab}
      />
    </div>
  );
}