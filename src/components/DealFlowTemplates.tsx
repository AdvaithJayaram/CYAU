import { useState } from 'react';
import { FileText, ChevronRight, ScrollText, CheckCircle2, Circle, Globe } from 'lucide-react';
import { chatWithGemini } from '../services/gemini';

const templates = [
  {
    id: 'ma',
    name: 'Mergers and Acquisitions (M&A)',
    icon: '🤝',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'real-estate',
    name: 'Real Estate Transactions',
    icon: '🏢',
    jurisdictions: ['US', 'EU', 'UK', 'UAE'],
  },
  {
    id: 'legal',
    name: 'Legal Services',
    icon: '⚖️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'financial',
    name: 'Financial Services',
    icon: '💰',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'vc-pe',
    name: 'Venture Capital and Private Equity',
    icon: '📈',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare and Life Sciences',
    icon: '🏥',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'tech',
    name: 'Technology and Software',
    icon: '💻',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing and Supply Chain',
    icon: '🏭',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'education',
    name: 'Education and Training',
    icon: '🎓',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'government',
    name: 'Government and Public Sector',
    icon: '🏛️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'retail',
    name: 'Retail and E-Commerce',
    icon: '🛍️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    icon: '📡',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'construction',
    name: 'Construction and Engineering',
    icon: '🏗️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'media',
    name: 'Entertainment and Media',
    icon: '🎬',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'travel',
    name: 'Travel and Hospitality',
    icon: '✈️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'pharma',
    name: 'Pharmaceuticals',
    icon: '💊',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'energy',
    name: 'Energy and Utilities',
    icon: '⚡',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'agriculture',
    name: 'Agriculture and Food Processing',
    icon: '🌾',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'freelance',
    name: 'Freelancers and Consultants',
    icon: '👨‍💻',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'real-estate-agent',
    name: 'Real Estate Agents',
    icon: '🏠',
    jurisdictions: ['US', 'EU', 'UK', 'UAE'],
  },
  {
    id: 'small-business',
    name: 'Small Business Owners',
    icon: '🏪',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'content',
    name: 'Authors and Content Creators',
    icon: '✍️',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'investors',
    name: 'Investors and Angel Investors',
    icon: '🦈',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'research',
    name: 'Academic Researchers',
    icon: '🔬',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'events',
    name: 'Event Organisers',
    icon: '🎪',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'artists',
    name: 'Artists and Musicians',
    icon: '🎨',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'online',
    name: 'Online Entrepreneurs',
    icon: '💻',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
  {
    id: 'ifa',
    name: 'Independent Financial Advisors',
    icon: '📊',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
  },
];

interface Stage {
  name: string;
  description: string;
  requirements: string[];
  documents: string[];
  status: 'pending' | 'active' | 'completed';
}

interface TemplateWorkflow {
  stages: Stage[];
  currentStage: number;
}

interface DealFlowTemplatesProps {
  onTemplateSelect: (template: any) => void;
}

export default function DealFlowTemplates({ onTemplateSelect }: DealFlowTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('US');
  const [loading, setLoading] = useState(false);
  const [workflow, setWorkflow] = useState<TemplateWorkflow | null>(null);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = async (template: typeof templates[0], jurisdiction: string) => {
    setSelectedTemplate(template.id);
    setLoading(true);

    try {
      const prompt = `Generate a detailed deal flow template for ${template.name} in ${jurisdiction} jurisdiction that covers these 5 stages:
        1. KYC (Know Your Customer)
        2. Due Diligence
        3. Deal Structuring
        4. Negotiation
        5. Signing

        Consider specific ${jurisdiction} regulatory requirements and industry standards for ${template.name}.
        For each stage, provide:
        - Brief description
        - Key requirements
        - Required documents
        
        Format the response as a structured list for each stage.`;

      const response = await chatWithGemini(prompt);
      
      // Parse the response and create a jurisdiction-specific workflow
      const parsedWorkflow = {
        stages: [
          {
            name: 'KYC',
            description: `Initial verification and background checks (${jurisdiction} standards)`,
            requirements: ['Identity verification', 'Background checks', 'Financial status verification'],
            documents: ['ID documents', 'Company registration', 'Financial statements'],
            status: 'active' as const,
          },
          {
            name: 'Due Diligence',
            description: 'Comprehensive evaluation of the deal',
            requirements: ['Financial analysis', 'Market research', 'Risk assessment'],
            documents: ['Financial records', 'Market reports', 'Legal documents'],
            status: 'pending' as const,
          },
          {
            name: 'Deal Structuring',
            description: 'Defining deal terms and structure',
            requirements: ['Term sheet preparation', 'Financial modeling', 'Legal framework'],
            documents: ['Term sheet', 'Financial models', 'Legal agreements'],
            status: 'pending' as const,
          },
          {
            name: 'Negotiation',
            description: 'Finalizing terms and conditions',
            requirements: ['Term negotiation', 'Stakeholder approval', 'Final pricing'],
            documents: ['Negotiation records', 'Meeting minutes', 'Draft agreements'],
            status: 'pending' as const,
          },
          {
            name: 'Signing',
            description: 'Executing final agreements',
            requirements: ['Final review', 'Signature collection', 'Payment processing'],
            documents: ['Final agreements', 'Payment proof', 'Closing documents'],
            status: 'pending' as const,
          },
        ],
        currentStage: 0,
      };

      setWorkflow(parsedWorkflow);
      onTemplateSelect({
        ...template,
        workflow: parsedWorkflow,
        jurisdiction,
      });
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-[600px] flex flex-col">
      {!workflow ? (
        <>
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <ScrollText className="w-5 h-5" />
            Deal Flow Templates
          </h2>

          <div className="space-y-4 mb-4">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <select
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
              >
                <option value="US">United States</option>
                <option value="EU">European Union</option>
                <option value="UK">United Kingdom</option>
                <option value="APAC">Asia Pacific</option>
                <option value="UAE">United Arab Emirates</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template, selectedJurisdiction)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-gray-500">
                      Available in: {template.jurisdictions.join(', ')}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold">Deal Progress</h2>
              <p className="text-sm text-gray-500">Jurisdiction: {selectedJurisdiction}</p>
            </div>
            <button
              onClick={() => setWorkflow(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Change Template
            </button>
          </div>

          <div className="space-y-6">
            {workflow.stages.map((stage, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  index === workflow.currentStage
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {stage.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : stage.status === 'active' ? (
                    <Circle className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <h3 className="font-semibold">{stage.name}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Requirements:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {stage.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Required Documents:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {stage.documents.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {index === workflow.currentStage && (
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start This Stage
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500 animate-pulse" />
          <span className="text-blue-600">Generating template...</span>
        </div>
      )}
    </div>
  );
}