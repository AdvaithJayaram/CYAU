import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreService } from '../services/firestore';
import CommunicationPanel from '../components/CommunicationPanel';
import DealFlowGPT from '../components/DealFlowGPT';
import UserAvatars from '../components/UserAvatars';
import DealProgressTracker from '../components/DealProgressTracker';
import { FileText, Users2, Clock, Tag, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import type { Deal } from '../types/firestore';

export default function DealSummary() {
  const { dealId } = useParams<{ dealId: string }>();
  const { goBack } = useNavigation();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState('kyc');

  useEffect(() => {
    const fetchDeal = async () => {
      if (!dealId) return;
      
      try {
        setLoading(true);
        setError(null);
        const dealData = await FirestoreService.getDeal(dealId);
        
        if (!dealData) {
          setError('Deal not found');
          return;
        }

        setDeal(dealData);
        setCurrentStage(dealData.stages.current);
      } catch (error) {
        console.error('Error fetching deal:', error);
        setError('Failed to load deal details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [dealId]);

  const handleStageChange = async (stage: string) => {
    if (!dealId) return;
    
    try {
      await FirestoreService.updateDeal(dealId, {
        'stages.current': stage,
        'metadata.updatedAt': new Date().toISOString(),
      });
      setCurrentStage(stage);
      
      // Log activity
      await FirestoreService.logActivity({
        type: 'deal',
        action: 'stage_change',
        dealId,
        details: {
          description: `Deal stage updated to ${stage}`,
          oldStage: currentStage,
          newStage: stage,
        },
        metadata: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error updating deal stage:', error);
      // Show error notification
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Deal not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error 
              ? 'We encountered an error while loading the deal details.' 
              : "The deal you're looking for doesn't exist or you don't have access."}
          </p>
          <button onClick={goBack} className="gradient-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 space-y-6">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={goBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{deal.title}</h1>
              <p className="text-gray-500">ID: {dealId}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Tag className="w-4 h-4" />
                <span className="text-sm">Stage</span>
              </div>
              <p className="font-medium capitalize">{deal.stages.current}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Value</span>
              </div>
              <p className="font-medium">
                {deal.financial.value.toLocaleString()} {deal.financial.currency}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Users2 className="w-4 h-4" />
                <span className="text-sm">Participants</span>
              </div>
              <p className="font-medium">
                {Object.keys(deal.participants).length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last Updated</span>
              </div>
              <p className="font-medium">
                {new Date(deal.metadata.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <DealProgressTracker
          currentStage={currentStage}
          onStageChange={handleStageChange}
        />

        <UserAvatars users={Object.values(deal.participants)} />

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Communication Panel */}
          <div className="col-span-3">
            <CommunicationPanel />
          </div>

          {/* Middle Column - Deal Details */}
          <div className="col-span-6">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Deal Description</h2>
                <p className="text-gray-600">{deal.overview.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Key Documents</h2>
                <div className="space-y-2">
                  {deal.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Added {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Deal Highlights</h2>
                <div className="space-y-2">
                  {deal.overview.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Assistant */}
          <div className="col-span-3">
            <DealFlowGPT />
          </div>
        </div>
      </div>
    </div>
  );
}