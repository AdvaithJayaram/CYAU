import { DollarSign, TrendingUp, Users, BarChart3, ArrowRight } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { useNavigate } from 'react-router-dom';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/marketplace/listing/${listing.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{listing.title}</h3>
            <p className="text-sm text-gray-500">{listing.type} • {listing.industry}</p>
          </div>
          {listing.verified && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Verified
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Price</span>
            </div>
            <p className="font-semibold">${(listing.price / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Growth</span>
            </div>
            <p className="font-semibold">+{listing.metrics.growth}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Customers</span>
            </div>
            <p className="font-semibold">{listing.metrics.customers.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">
                {listing.metrics.mrr ? 'MRR' : 'Revenue'}
              </span>
            </div>
            <p className="font-semibold">
              ${((listing.metrics.mrr || listing.metrics.revenue || 0) / 1000).toFixed(1)}K
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-500">{listing.location}</span>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}