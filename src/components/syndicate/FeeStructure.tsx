import { useState } from 'react';
import { DollarSign, Percent, FileText, AlertCircle } from 'lucide-react';

interface SyndicateDetails {
  currency?: string;
  targetRaise?: number;
}

interface FeeStructureProps {
  syndicateDetails?: SyndicateDetails;
  onSubmit: (data: any) => void;
}

export default function FeeStructure({ syndicateDetails, onSubmit }: FeeStructureProps) {
  const [fees, setFees] = useState({
    carried_interest: '',
    management_fee: '',
    deal_expenses: '',
    setup_fee: '',
    admin_fee: '',
    legal_fee: '',
    incentives: [{ recipient: '', percentage: '', description: '' }],
  });

  const addIncentive = () => {
    setFees(prev => ({
      ...prev,
      incentives: [...prev.incentives, { recipient: '', percentage: '', description: '' }],
    }));
  };

  const removeIncentive = (index: number) => {
    setFees(prev => ({
      ...prev,
      incentives: prev.incentives.filter((_, i) => i !== index),
    }));
  };

  const updateIncentive = (index: number, field: string, value: string) => {
    setFees(prev => ({
      ...prev,
      incentives: prev.incentives.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = () => {
    onSubmit(fees);
  };

  const calculateTotalFees = () => {
    const setupFee = Number(fees.setup_fee) || 0;
    const adminFee = Number(fees.admin_fee) || 0;
    return setupFee + adminFee;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Fee Structure</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carried Interest (%)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={fees.carried_interest}
                onChange={(e) => setFees({ ...fees, carried_interest: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Management Fee (% per year)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={fees.management_fee}
                onChange={(e) => setFees({ ...fees, management_fee: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Setup Fee
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={fees.setup_fee}
                onChange={(e) => setFees({ ...fees, setup_fee: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter setup fee amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Administrative Fee
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={fees.admin_fee}
                onChange={(e) => setFees({ ...fees, admin_fee: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter administrative fee amount"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Incentive Structure</h3>
            <button
              type="button"
              onClick={addIncentive}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add Incentive
            </button>
          </div>

          <div className="space-y-4">
            {fees.incentives.map((incentive, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={incentive.recipient}
                    onChange={(e) => updateIncentive(index, 'recipient', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter recipient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={incentive.percentage}
                      onChange={(e) => updateIncentive(index, 'percentage', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter percentage"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeIncentive(index)}
                    className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {syndicateDetails?.targetRaise && (
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-600 mb-1">Fee Structure Summary</h4>
              <p className="text-sm text-blue-600">
                Based on your target raise of {syndicateDetails.currency} {syndicateDetails.targetRaise.toLocaleString()}, 
                the estimated total fees would be {syndicateDetails.currency} {calculateTotalFees().toLocaleString()} upfront
                {fees.carried_interest && ` plus ${fees.carried_interest}% carried interest`}
                {fees.management_fee && ` and ${fees.management_fee}% annual management fee`}.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button type="button" className="px-4 py-2 text-gray-600 hover:text-gray-700">
            Save as Draft
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            className="gradient-btn"
          >
            Continue to Investor Management
          </button>
        </div>
      </div>
    </div>
  );
}