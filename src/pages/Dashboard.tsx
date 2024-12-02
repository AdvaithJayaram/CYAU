import { CircleDollarSign, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CircleDollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Deals</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Deal Value</p>
              <p className="text-2xl font-semibold">$2.4M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Network Size</p>
              <p className="text-2xl font-semibold">847</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Deal Updates</h2>
          <div className="space-y-4">
            {[
              {
                title: 'New deal room created',
                description: 'Tech Startup Acquisition',
                time: '2 hours ago',
              },
              {
                title: 'Document uploaded',
                description: 'Financial Statement Q4 2023',
                time: '5 hours ago',
              },
              {
                title: 'Team member added',
                description: 'Sarah Johnson joined Deal #127',
                time: '1 day ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Deal Pipeline</h2>
          <div className="space-y-4">
            {[
              { stage: 'KYC Verification', count: 3, color: 'bg-blue-600' },
              { stage: 'Due Diligence', count: 5, color: 'bg-yellow-500' },
              { stage: 'Deal Structuring', count: 2, color: 'bg-green-500' },
              { stage: 'Negotiation', count: 1, color: 'bg-purple-500' },
              { stage: 'Signing', count: 1, color: 'bg-gray-500' },
            ].map((stage, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{stage.stage}</span>
                  <span className="font-medium">{stage.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color}`}
                    style={{ width: `${(stage.count / 12) * 100}%` }}
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