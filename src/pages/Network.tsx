import { useState } from 'react';
import { useClerkUsers } from '../hooks/useClerkUsers';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../components/ErrorFallback';
import NetworkFilters from '../components/network/NetworkFilters';
import ConnectionCard from '../components/network/ConnectionCard';
import { useUser } from '@clerk/clerk-react';
import type { ClerkUserData } from '../types/clerk';

export default function Network() {
  const { user: currentUser } = useUser();
  const {
    users,
    loading,
    error,
    hasMore,
    loadMoreRef,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  } = useClerkUsers();

  const handleConnect = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      await currentUser.update({
        publicMetadata: {
          ...currentUser.publicMetadata,
          connectionRequests: [
            ...(currentUser.publicMetadata.connectionRequests || []),
            userId,
          ],
        },
      });
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleDisconnect = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      const connections = (currentUser.publicMetadata.connections || []) as string[];
      await currentUser.update({
        publicMetadata: {
          ...currentUser.publicMetadata,
          connections: connections.filter(id => id !== userId),
        },
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const isConnected = (userId: string) => {
    const connections = (currentUser?.publicMetadata?.connections || []) as string[];
    return connections.includes(userId);
  };

  const isPending = (userId: string) => {
    const requests = (currentUser?.publicMetadata?.connectionRequests || []) as string[];
    return requests.includes(userId);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Network</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <NetworkFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
          />

          {loading && users.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {searchTerm 
                  ? 'No connections found matching your search.'
                  : 'No connections available. Start building your network!'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <ConnectionCard
                  key={user.userId}
                  user={user}
                  onConnect={() => handleConnect(user.userId)}
                  onDisconnect={() => handleDisconnect(user.userId)}
                  isConnected={isConnected(user.userId)}
                  isPending={isPending(user.userId)}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div ref={loadMoreRef} className="py-4 text-center">
              <div className="animate-spin w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}