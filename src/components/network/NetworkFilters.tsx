import { Search, Filter } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

interface NetworkFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: 'all' | 'connected';
  onFilterChange: (value: 'all' | 'connected') => void;
}

export default function NetworkFilters({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}: NetworkFiltersProps) {
  const debouncedSearch = useDebounce(searchTerm);

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value as 'all' | 'connected')}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Users</option>
        <option value="connected">My Connections</option>
      </select>
    </div>
  );
}