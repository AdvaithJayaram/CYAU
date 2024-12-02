interface DealInfoProps {
  onUpdate?: (data: any) => void;
}

export default function DealInfo({ onUpdate }: DealInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-bold mb-4">Deal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Deal Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deal name"
            onChange={(e) => onUpdate?.({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Deal Value</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deal value"
            onChange={(e) => onUpdate?.({ value: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onUpdate?.({ status: e.target.value })}
          >
            <option>In Progress</option>
            <option>Under Review</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}