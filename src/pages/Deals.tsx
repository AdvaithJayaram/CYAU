import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Users2, Clock, Tag, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FirestoreService } from '../services/firestore';
import type { Deal } from '../types/firestore';
import { formatDistanceToNow } from 'date-fns';

export default function Deals() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchDeals = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);
        
        const constraints = [];
        if (filterStage !== 'all') {
          constraints.push(FirestoreService.createQueryConstraints({ 'stages.current': filterStage })[0]);
        }
        
        const { deals: fetchedDeals } = await FirestoreService.queryDeals(constraints);
        setDeals(fetchedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError('Unable to load deals. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [filterStage, retryCount, user]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.overview.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stages = ['kyc', 'dueDiligence', 'negotiation', 'closing'];

  const handleDealClick = (dealId: string) => {
    navigate(`/deals/${dealId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Active Deals</h1>
        <button 
          onClick={() => navigate('/new-deal')}
          className="gradient-btn"
        >
          Create New Deal
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleRetry}
            className="px-3 py-1 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stages</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredDeals.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No deals found. Create your first deal!</p>
            </div>
          ) : (
            filteredDeals.map((deal) => (
              <div
                key={deal.id}
                onClick={() => handleDealClick(deal.id)}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{deal.title}</h3>
                    <p className="text-gray-600">{deal.overview.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    deal.stages.current === 'kyc' ? 'bg-blue-100 text-blue-700' :
                    deal.stages.current === 'dueDiligence' ? 'bg-yellow-100 text-yellow-700' :
                    deal.stages.current === 'negotiation' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {deal.stages.current}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4" />
                    <span>{deal.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users2 className="w-4 h-4" />
                    <span>{Object.keys(deal.participants).length} Participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>{deal.financial.value.toLocaleString()} {deal.financial.currency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDistanceToNow(new Date(deal.metadata.updatedAt), { addSuffix: true })}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ 
                        width: `${
                          stages.indexOf(deal.stages.current) / (stages.length - 1) * 100
                        }%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}