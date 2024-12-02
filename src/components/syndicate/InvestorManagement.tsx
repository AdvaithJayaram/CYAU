import { useState } from 'react';
import { Users, Upload, Download, Search, Filter } from 'lucide-react';

export default function InvestorManagement() {
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      amount: 50000,
      status: 'pending',
      kycStatus: 'completed',
      documents: ['passport.pdf', 'proof_of_funds.pdf'],
    },
    // Add more mock investors as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || investor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Investor Management</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Upload className="w-5 h-5" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="gradient-btn">
            <Users className="w-5 h-5" />
            Add Investor
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-semibold text-gray-600">Investor</th>
              <th className="text-left py-3 font-semibold text-gray-600">Amount</th>
              <th className="text-left py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 font-semibold text-gray-600">KYC Status</th>
              <th className="text-left py-3 font-semibold text-gray-600">Documents</th>
              <th className="text-left py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.map((investor) => (
              <tr key={investor.id} className="border-b last:border-0">
                <td className="py-4">
                  <div>
                    <p className="font-medium">{investor.name}</p>
                    <p className="text-sm text-gray-500">{investor.email}</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-medium">${investor.amount.toLocaleString()}</span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    investor.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : investor.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {investor.status.charAt(0).toUpperCase() + investor.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    investor.kycStatus === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {investor.kycStatus.charAt(0).toUpperCase() + investor.kycStatus.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col gap-1">
                    {investor.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="text-sm text-blue-600 hover:text-blue-700 text-left"
                      >
                        {doc}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}