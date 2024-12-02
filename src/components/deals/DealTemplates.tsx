```tsx
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import type { DealTemplate } from '../../types/deals';

const templates: DealTemplate[] = [
  {
    id: 'ma',
    name: 'Mergers and Acquisitions (M&A)',
    icon: '🤝',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
    stages: {
      kyc: {
        tasks: [
          'Verify company registration',
          'Conduct background checks',
          'Review ownership structure',
        ],
      },
      dueDiligence: {
        tasks: [
          'Financial statement analysis',
          'Market position assessment',
          'Legal compliance review',
        ],
      },
      dealStructuring: {
        tasks: [
          'Valuation analysis',
          'Term sheet preparation',
          'Tax structure planning',
        ],
      },
      negotiation: {
        tasks: [
          'Purchase agreement drafting',
          'Price negotiation',
          'Terms finalization',
        ],
      },
      signing: {
        tasks: [
          'Final document review',
          'Signature collection',
          'Closing conditions verification',
        ],
      },
    },
  },
  {
    id: 'vc',
    name: 'Venture Capital Investment',
    icon: '📈',
    jurisdictions: ['US', 'EU', 'UK', 'APAC'],
    stages: {
      kyc: {
        tasks: [
          'Startup verification',
          'Founder background checks',
          'Cap table review',
        ],
      },
      dueDiligence: {
        tasks: [
          'Product/market fit analysis',
          'Financial projections review',
          'Technical assessment',
        ],
      },
      dealStructuring: {
        tasks: [
          'Investment terms definition',
          'Equity structure planning',
          'Rights and preferences',
        ],
      },
      negotiation: {
        tasks: [
          'Valuation discussion',
          'Term sheet negotiation',
          'Investment agreement',
        ],
      },
      signing: {
        tasks: [
          'Final documentation',
          'Board approval',
          'Investment closing',
        ],
      },
    },
  },
  // Add more templates...
];

interface DealTemplatesProps {
  onSelect: (template: DealTemplate) => void;
}

export default function DealTemplates({ onSelect }: DealTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('US');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    template.jurisdictions.includes(selectedJurisdiction)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Select Deal Template</h2>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedJurisdiction}
          onChange={(e) => setSelectedJurisdiction(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="US">United States</option>
          <option value="EU">European Union</option>
          <option value="UK">United Kingdom</option>
          <option value="APAC">Asia Pacific</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors"
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
  );
}
```