import { useParams } from 'react-router-dom';
import ListingDetailsComponent from '../components/marketplace/ListingDetails';
import { useNavigation } from '../hooks/useNavigation';
import { AlertCircle } from 'lucide-react';

// Mock data - replace with actual data fetching
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
  // ... other listings
];

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNavigation();
  
  const listing = mockListings.find(l => l.id === Number(id));
  
  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={goBack} className="gradient-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <ListingDetailsComponent listing={listing} />;
}