import { Check, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  userId?: string; // Support both id and userId for flexibility
  name: string;
  avatar: string;
  role?: string;
  status?: string;
}

interface UserAvatarsProps {
  users: User[];
}

export default function UserAvatars({ users }: UserAvatarsProps) {
  const [copied, setCopied] = useState(false);
  const dealRoomLink = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(dealRoomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex -space-x-4">
          {users.map((user) => {
            // Generate a unique key using either id or userId
            const uniqueKey = user.id || user.userId || Math.random().toString(36).substr(2, 9);
            
            return (
              <div
                key={uniqueKey}
                className="relative group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                {user.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
                <div className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                  {user.name} {user.role && `• ${user.role}`}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              Share Deal Room
            </>
          )}
        </button>
      </div>
    </div>
  );
}