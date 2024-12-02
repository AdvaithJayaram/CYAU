import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart3,
  Share2,
  Download,
  FileText,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import type { Listing } from '../../types/marketplace';

interface ListingDetailsProps {
  listing: Listing;
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
  const { goBack } = useNavigation();
  const [showQR, setShowQR] = useState(false);
  const listingUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(listingUrl);
      // TODO: Show success toast
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button 
        onClick={goBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Marketplace
      </button>

      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{listing.title}</h1>
                {listing.verified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>{listing.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowQR(true)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="gradient-btn">
                Request Info
              </button>
            </div>
          </div>

          <p className="text-gray-600">{listing.description}</p>
        </div>

        {/* Key Metrics */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Asking Price</span>
              </div>
              <p className="font-semibold">${(listing.price / 1000000).toFixed(1)}M</p>
            </div>
            {listing.metrics.mrr && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">MRR</span>
                </div>
                <p className="font-semibold">${listing.metrics.mrr.toLocaleString()}</p>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Growth</span>
              </div>
              <p className="font-semibold">+{listing.metrics.growth}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Customers</span>
              </div>
              <p className="font-semibold">{listing.metrics.customers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Advanced Metrics */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Advanced Metrics</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(listing.metrics)
              .filter(([key]) => !['mrr', 'growth', 'customers'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="font-semibold">
                    {typeof value === 'number' && key.toLowerCase().includes('rate')
                      ? `${value}%`
                      : typeof value === 'number' && value > 1000
                      ? `$${value.toLocaleString()}`
                      : value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Documents */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          <div className="space-y-2">
            {listing.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Share Listing</h3>
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={listingUrl} size={200} />
            </div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Scan this QR code to share the listing
              </p>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mx-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Copy Link
              </button>
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="w-full gradient-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}