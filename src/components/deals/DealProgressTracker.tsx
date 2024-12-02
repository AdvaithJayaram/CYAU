import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, ChevronRight, Lock } from 'lucide-react';
import { FirestoreService } from '../../services/firestore';
import type { DealStage, StageStatus } from '../../types/deals';

interface DealProgressTrackerProps {
  dealId: string;
  currentStage: DealStage;
  stages: Record<DealStage, StageStatus>;
  onStageChange: (stage: DealStage) => Promise<void>;
}

export default function DealProgressTracker({
  dealId,
  currentStage,
  stages,
  onStageChange,
}: DealProgressTrackerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stageOrder: DealStage[] = ['kyc', 'dueDiligence', 'dealStructuring', 'negotiation', 'signing'];
  const stageLabels: Record<DealStage, string> = {
    kyc: 'KYC',
    dueDiligence: 'Due Diligence',
    dealStructuring: 'Deal Structuring',
    negotiation: 'Negotiation',
    signing: 'Signing',
  };

  const handleStageClick = async (stage: DealStage) => {
    if (loading) return;
    
    const currentIndex = stageOrder.indexOf(currentStage);
    const targetIndex = stageOrder.indexOf(stage);
    
    // Prevent skipping stages
    if (targetIndex > currentIndex + 1) {
      setError('Cannot skip stages. Please complete them in order.');
      return;
    }

    // Prevent moving to next stage if current stage is not completed
    if (targetIndex > currentIndex && stages[currentStage].status !== 'completed') {
      setError('Please complete the current stage before proceeding.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onStageChange(stage);
    } catch (error) {
      console.error('Error changing stage:', error);
      setError('Failed to update stage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStageIcon = (stage: DealStage) => {
    const stageStatus = stages[stage].status;
    const isLocked = stageOrder.indexOf(stage) > stageOrder.indexOf(currentStage) + 1;

    if (isLocked) {
      return <Lock className="w-6 h-6 text-gray-400" />;
    }

    switch (stageStatus) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'inProgress':
        return <Circle className="w-6 h-6 text-blue-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStageProgress = (stage: DealStage) => {
    return stages[stage].completionPercentage || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Deal Progress</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: `${
                (stageOrder.indexOf(currentStage) / (stageOrder.length - 1)) * 100
              }%` 
            }}
          />
        </div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {stageOrder.map((stage) => (
            <button
              key={stage}
              onClick={() => handleStageClick(stage)}
              disabled={loading}
              className={`flex flex-col items-center w-32 ${
                loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 ${
                stage === currentStage
                  ? 'border-blue-500'
                  : stages[stage].status === 'completed'
                  ? 'border-green-500'
                  : 'border-gray-300'
              }`}>
                {getStageIcon(stage)}
              </div>
              
              <div className="text-center mt-2">
                <p className={`font-medium ${
                  stage === currentStage
                    ? 'text-blue-600'
                    : stages[stage].status === 'completed'
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                  {stageLabels[stage]}
                </p>
                <p className="text-sm text-gray-500">
                  {getStageProgress(stage)}% Complete
                </p>
              </div>

              {stage === currentStage && stages[stage].tasks && (
                <div className="absolute top-full mt-4 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                  <h4 className="font-medium mb-2">Required Tasks:</h4>
                  <ul className="space-y-2">
                    {stages[stage].tasks.map((task, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300" />
                        )}
                        <span>{task.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}