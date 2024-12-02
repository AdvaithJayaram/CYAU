```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { UserPlus } from 'lucide-react';
import CommunicationPanel from '../components/CommunicationPanel';
import DealFlowGPT from '../components/DealFlowGPT';
import DealProgressTracker from '../components/deals/DealProgressTracker';
import DealTemplates from '../components/deals/DealTemplates';
import { FirestoreService } from '../services/firestore';
import type { Deal } from '../types/firestore';
import type { DealStage, StageStatus, DealTemplate } from '../types/deals';

const createInitialStages = (template?: DealTemplate): Record<DealStage, StageStatus> => {
  const stages: DealStage[] = ['kyc', 'dueDiligence', 'dealStructuring', 'negotiation', 'signing'];
  
  return stages.reduce((acc, stage) => {
    acc[stage] = {
      status: 'pending',
      completionPercentage: 0,
      tasks: template?.stages[stage].tasks.map(name => ({
        name,
        completed: false,
      })) || [],
    };
    return acc;
  }, {} as Record<DealStage, StageStatus>);
};

export default function NewDeal() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [dealName, setDealName] = useState('');
  const [dealType, setDealType] = useState('Investment');
  const [isSaving, setIsSaving] = useState(false);
  const [currentStage, setCurrentStage] = useState<DealStage>('kyc');
  const [stages, setStages] = useState<Record<DealStage, StageStatus>>(createInitialStages());
  const [dealId, setDealId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DealTemplate | null>(null);

  const handleTemplateSelect = (template: DealTemplate) => {
    setSelectedTemplate(template);
    setStages(createInitialStages(template));
  };

  const handleStageChange = async (stage: DealStage) => {
    if (!dealId || !user) return;

    try {
      await FirestoreService.updateDeal(dealId, {
        'stages.current': stage,
        'metadata.updatedAt': new Date().toISOString(),
      });
      setCurrentStage(stage);
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  const handleSaveDeal = async () => {
    if (!user || !dealName.trim() || !selectedTemplate) return;
    
    try {
      setIsSaving(true);
      
      const deal: Partial<Deal> = {
        title: dealName.trim(),
        type: dealType,
        status: 'active',
        visibility: 'private',
        overview: {
          description: '',
          highlights: [],
          sector: [],
          region: 'Global',
        },
        financial: {
          value: 0,
          currency: 'USD',
        },
        participants: {
          owner: user.id,
          leads: [],
          investors: [],
          advisors: [],
        },
        stages: {
          current: currentStage,
          ...stages,
        },
        documents: [],
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: user.id,
          views: 0,
          interested: 0,
        },
      };

      const newDealId = await FirestoreService.createDeal(deal);
      setDealId(newDealId);
      
      await FirestoreService.logActivity({
        type: 'deal',
        action: 'create',
        dealId: newDealId,
        userId: user.id,
        details: {
          description: `Deal "${deal.title}" created using ${selectedTemplate.name} template`,
        },
        metadata: {
          timestamp: new Date().toISOString(),
        },
      });

      navigate(`/deals/${newDealId}`);
    } catch (error) {
      console.error('Error saving deal:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 space-y-6">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">New Deal</h1>
              {selectedTemplate && (
                <p className="text-gray-500">Template: {selectedTemplate.name}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <UserPlus className="w-5 h-5" />
                Invite Participants
              </button>
              <button
                onClick={handleSaveDeal}
                disabled={isSaving || !dealName.trim() || !selectedTemplate}
                className="gradient-btn disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Deal'}
              </button>
            </div>
          </div>

          {selectedTemplate ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Name
                </label>
                <input
                  type="text"
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder="Enter deal name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Type
                </label>
                <select
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Investment">Investment</option>
                  <option value="M&A">M&A</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Asset Sale">Asset Sale</option>
                </select>
              </div>
            </div>
          ) : (
            <DealTemplates onSelect={handleTemplateSelect} />
          )}
        </div>
      </div>

      {selectedTemplate && (
        <div className="max-w-7xl mx-auto px-6">
          <DealProgressTracker
            dealId={dealId || ''}
            currentStage={currentStage}
            stages={stages}
            onStageChange={handleStageChange}
          />

          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-3">
              <CommunicationPanel />
            </div>

            <div className="col-span-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Current Stage: {currentStage}</h2>
                <div className="space-y-4">
                  {stages[currentStage].tasks?.map((task, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          const newStages = { ...stages };
                          newStages[currentStage].tasks![index].completed = !task.completed;
                          setStages(newStages);
                        }}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{task.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <DealFlowGPT />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```