import { useState } from 'react';
import { Search, Filter, DollarSign, Users, TrendingUp, BarChart3, Building2, ArrowRight } from 'lucide-react';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import ListingCard from '../components/marketplace/ListingCard';
import { useNavigate } from 'react-router-dom';

const mockListings = [
  {
    id: 1,
    title: 'SaaS Analytics Platform',
    type: 'SaaS',
    price: 2500000,
    metrics: {
      mrr: 85000,
      growth: 15,
      customers: 250,
      arpu: 340,
      margin: 75,
      ltv: 12000,
      cac: 1500,
      churnRate: 2.5,
    },
    description: 'B2B analytics platform with strong growth and high customer retention.',
    location: 'United States',
    industry: 'Technology',
    verified: true,
    documents: [
      { name: 'Financial Statements', type: 'pdf' },
      { name: 'Growth Metrics', type: 'xlsx' },
      { name: 'Customer Analysis', type: 'pdf' },
    ],
  },
  {
    id: 2,
    title: 'E-commerce Fashion Brand',
    type: 'E-commerce',
    price: 1800000,
    metrics: {
      revenue: 2500000,
      growth: 25,
      customers: 15000,
      margin: 65,
      aov: 165,
      repeatRate: 45,
      inventoryTurnover: 8,
      marketingRoi: 3.2,
    },
    description: 'Premium fashion brand with established market presence and loyal customer base.',
    location: 'United Kingdom',
    industry: 'Fashion',
    verified: true,
    documents: [
      { name: 'P&L Statement', type: 'pdf' },
      { name: 'Inventory Report', type: 'xlsx' },
      { name: 'Brand Guidelines', type: 'pdf' },
    ],
  },
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [view, setView] = useState<'buy' | 'sell'>('buy');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">Discover vetted businesses for acquisition</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setView('buy')}
            className={`px-6 py-2 rounded-lg font-medium ${
              view === 'buy'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setView('sell')}
            className={`px-6 py-2 rounded-lg font-medium ${
              view === 'sell'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {view === 'buy' ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-semibold">2,547</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-semibold">$2.1B</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verified Buyers</p>
                  <p className="text-2xl font-semibold">500K+</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Deal Time</p>
                  <p className="text-2xl font-semibold">90 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <MarketplaceFilters />
            </div>
          </div>

          {/* Listings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing}
                onClick={() => navigate(`/marketplace/listing/${listing.id}`)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">List Your Business</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get expert support to create high-quality listings and connect with over 500,000 verified buyers. 
            Our platform simplifies negotiations and ensures safe transactions.
          </p>
          <button className="gradient-btn inline-flex items-center gap-2">
            Start Listing <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}