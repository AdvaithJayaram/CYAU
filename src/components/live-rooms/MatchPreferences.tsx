import { useState } from 'react';
import type { MatchPreference } from '../../types/live-rooms';

const offerings = [
  'Venture Capital',
  'Private Equity',
  'Legal Services',
  'Financial Advisory',
  'Strategic Advisory',
  'Technical Expertise',
  'Industry Connections',
  'Market Access',
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Manufacturing',
  'Energy',
  'Consumer Goods',
  'Education',
];

interface MatchPreferencesProps {
  onSubmit: (preferences: MatchPreference) => void;
}

export default function MatchPreferences({ onSubmit }: MatchPreferencesProps) {
  const [preferences, setPreferences] = useState<MatchPreference>({
    offering: [],
    seeking: [],
    industries: [],
    dealSize: {
      min: 0,
      max: 0,
      currency: 'USD',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are you offering?
        </label>
        <div className="flex flex-wrap gap-2">
          {offerings.map((item) => (
            <label
              key={item}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                preferences.offering.includes(item)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={preferences.offering.includes(item)}
                onChange={(e) => {
                  setPreferences((prev) => ({
                    ...prev,
                    offering: e.target.checked
                      ? [...prev.offering, item]
                      : prev.offering.filter((i) => i !== item),
                  }));
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are you seeking?
        </label>
        <div className="flex flex-wrap gap-2">
          {offerings.map((item) => (
            <label
              key={item}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                preferences.seeking.includes(item)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={preferences.seeking.includes(item)}
                onChange={(e) => {
                  setPreferences((prev) => ({
                    ...prev,
                    seeking: e.target.checked
                      ? [...prev.seeking, item]
                      : prev.seeking.filter((i) => i !== item),
                  }));
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industries
        </label>
        <div className="flex flex-wrap gap-2">
          {industries.map((item) => (
            <label
              key={item}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                preferences.industries.includes(item)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={preferences.industries.includes(item)}
                onChange={(e) => {
                  setPreferences((prev) => ({
                    ...prev,
                    industries: e.target.checked
                      ? [...prev.industries, item]
                      : prev.industries.filter((i) => i !== item),
                  }));
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deal Size (Min)
          </label>
          <input
            type="number"
            min="0"
            value={preferences.dealSize.min}
            onChange={(e) => {
              setPreferences((prev) => ({
                ...prev,
                dealSize: {
                  ...prev.dealSize,
                  min: parseInt(e.target.value),
                },
              }));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deal Size (Max)
          </label>
          <input
            type="number"
            min="0"
            value={preferences.dealSize.max}
            onChange={(e) => {
              setPreferences((prev) => ({
                ...prev,
                dealSize: {
                  ...prev.dealSize,
                  max: parseInt(e.target.value),
                },
              }));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={preferences.dealSize.currency}
            onChange={(e) => {
              setPreferences((prev) => ({
                ...prev,
                dealSize: {
                  ...prev.dealSize,
                  currency: e.target.value,
                },
              }));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="gradient-btn">
          Start Matching
        </button>
      </div>
    </form>
  );
}