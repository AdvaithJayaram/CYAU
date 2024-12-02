import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

interface DealProgressTrackerProps {
  currentStage: string;
  onStageChange: (stage: string) => void;
}

export default function DealProgressTracker({ currentStage, onStageChange }: DealProgressTrackerProps) {
  const stages: Stage[] = [
    {
      id: 'kyc',
      name: 'KYC',
      description: 'Know Your Customer verification',
      status: 'completed',
    },
    {
      id: 'due-diligence',
      name: 'Due Diligence',
      description: 'Comprehensive evaluation and analysis',
      status: 'active',
    },
    {
      id: 'deal-structuring',
      name: 'Deal Structuring',
      description: 'Define terms and conditions',
      status: 'pending',
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      description: 'Finalize deal terms',
      status: 'pending',
    },
    {
      id: 'signing',
      name: 'Signing',
      description: 'Execute final agreements',
      status: 'pending',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Deal Progress</h2>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: `${
                (stages.findIndex(s => s.id === currentStage) / (stages.length - 1)) * 100
              }%` 
            }}
          />
        </div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              className={`flex flex-col items-center w-32 ${
                stage.id === currentStage ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 ${
                stage.status === 'completed'
                  ? 'border-green-500 text-green-500'
                  : stage.status === 'active'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-300 text-gray-300'
              }`}>
                {stage.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <div className="text-center mt-2">
                <p className={`font-medium ${
                  stage.status === 'completed'
                    ? 'text-green-600'
                    : stage.status === 'active'
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}>
                  {stage.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stage.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}