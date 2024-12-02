import { Building2, MapPin, Link as LinkIcon } from 'lucide-react';
import type { ClerkUserData } from '../../types/clerk';
import { useUser } from '@clerk/clerk-react';

interface ConnectionCardProps {
  user: ClerkUserData;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnected: boolean;
  isPending: boolean;
}

export default function ConnectionCard({
  user,
  onConnect,
  onDisconnect,
  isConnected,
  isPending,
}: ConnectionCardProps) {
  const { user: currentUser } = useUser();
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous User';
  const role = user.publicMetadata.role || 'Member';
  const company = user.publicMetadata.company || 'Unknown Company';
  const location = user.publicMetadata.location || 'Unknown Location';
  const expertise = (user.publicMetadata.expertise || []).slice(0, 2);

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={user.imageUrl}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{fullName}</h3>
          <p className="text-gray-600">{role}</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <Building2 className="w-4 h-4" />
            {company}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>
      </div>

      {expertise.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {expertise.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        {isConnected ? (
          <button
            onClick={onDisconnect}
            className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            disabled={isPending}
            className="w-full gradient-btn disabled:opacity-50"
          >
            {isPending ? 'Pending' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
}