import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Video, Clock, Share2, ThumbsUp, Flag, Calendar } from 'lucide-react';
import { DatabaseService } from '../services/database';
import LiveChat from '../components/live-rooms/LiveChat';
import MatchPreferences from '../components/live-rooms/MatchPreferences';
import LiveUserCounter from '../components/live-rooms/LiveUserCounter';
import type { MatchPreference } from '../types/live-rooms';

export default function LiveRooms() {
  const { user } = useUser();
  const [isMatching, setIsMatching] = useState(false);
  const [matchedUser, setMatchedUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<MatchPreference>({
    offering: [],
    seeking: [],
    industries: [],
    dealSize: { min: 0, max: 0, currency: 'USD' },
  });

  const handleStartMatching = async (prefs: MatchPreference) => {
    setPreferences(prefs);
    setIsMatching(true);
    // Simulate finding a match after 3 seconds
    setTimeout(() => {
      setMatchedUser({
        id: 'mock-user',
        name: 'Sarah Johnson',
        role: 'Investment Director',
        company: 'Venture Capital Partners',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        offering: ['Venture Capital', 'Strategic Advisory'],
        seeking: ['Tech Startups', 'Healthcare Innovation'],
      });
    }, 3000);
  };

  const handleEndChat = () => {
    setMatchedUser(null);
    setIsMatching(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {!matchedUser ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Live Deal Rooms</h1>
                  <p className="text-gray-600">Connect with potential partners in real-time</p>
                </div>
              </div>
              <LiveUserCounter />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-medium mb-1">10-Minute Sessions</h3>
                <p className="text-sm text-gray-600">Quick, focused conversations</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Share2 className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-medium mb-1">Smart Matching</h3>
                <p className="text-sm text-gray-600">AI-powered partner suggestions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-medium mb-1">Easy Scheduling</h3>
                <p className="text-sm text-gray-600">Set up follow-up meetings</p>
              </div>
            </div>

            {isMatching ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold mb-2">Finding your match...</h2>
                <p className="text-gray-600">We're looking for the perfect partner based on your preferences</p>
              </div>
            ) : (
              <MatchPreferences onSubmit={handleStartMatching} />
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">1</div>
                <h3 className="font-medium">Set Your Preferences</h3>
                <p className="text-sm text-gray-600">Tell us what you're offering and what you're looking for</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">2</div>
                <h3 className="font-medium">Get Matched</h3>
                <p className="text-sm text-gray-600">Our AI finds someone with complementary needs</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">3</div>
                <h3 className="font-medium">Start Chatting</h3>
                <p className="text-sm text-gray-600">Connect in a time-boxed, focused session</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LiveChat user={matchedUser} onEnd={handleEndChat} />
      )}
    </div>
  );
}