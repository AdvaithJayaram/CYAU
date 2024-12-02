import { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  fields: string[];
  completed: boolean;
}

export default function ProfileCompletionBot({ currentStep, onStepChange }: {
  currentStep: string;
  onStepChange: (step: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [steps] = useState<Step[]>([
    {
      id: 'basic',
      title: 'Basic Information',
      description: "Let's start with your basic details",
      fields: ['Full Name', 'Profile Picture', 'Job Title', 'Organization'],
      completed: false,
    },
    {
      id: 'professional',
      title: 'Professional Details',
      description: 'Tell us about your professional background',
      fields: ['Industry', 'Expertise', 'Experience', 'Certifications'],
      completed: false,
    },
    {
      id: 'dealflow',
      title: 'Deal Flow Preferences',
      description: 'Specify your deal preferences',
      fields: ['Deal Types', 'Deal Size', 'Geographical Focus', 'Sector Focus'],
      completed: false,
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      description: 'Complete your compliance requirements',
      fields: ['KYC Status', 'AML Certification', 'Representative Status'],
      completed: false,
    },
    {
      id: 'negotiation',
      title: 'Negotiation Preferences',
      description: 'Set your negotiation style and preferences',
      fields: ['Communication Style', 'Availability', 'Priorities'],
      completed: false,
    },
  ]);

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const currentStepData = steps[currentStepIndex];
  const nextStep = steps[currentStepIndex + 1];

  if (!currentStepData) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg transition-transform ${
      isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]'
    }`}>
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Profile Assistant</h3>
        </div>
        <span className="text-sm text-gray-500">
          {Math.round((steps.filter(s => s.completed).length / steps.length) * 100)}% Complete
        </span>
      </div>

      {isOpen && (
        <div className="p-4 border-t">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{currentStepData.title}</h4>
              <p className="text-sm text-gray-500">{currentStepData.description}</p>
            </div>

            <div className="space-y-2">
              {currentStepData.fields.map((field, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>{field}</span>
                </div>
              ))}
            </div>

            {nextStep && (
              <button
                onClick={() => onStepChange(nextStep.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to {nextStep.title}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}