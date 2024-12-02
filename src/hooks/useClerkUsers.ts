import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import type { ClerkUserData } from '../types/clerk';
import { useInfiniteScroll } from './useInfiniteScroll';

const PAGE_SIZE = 12;

export function useClerkUsers() {
  const { user } = useUser();
  const clerk = useClerk();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'connected'>('all');

  const fetchUsers = async (page: number) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const startIndex = (page - 1) * PAGE_SIZE;
      const userList = await clerk.users.getUserList({
        limit: PAGE_SIZE,
        offset: startIndex,
      });

      return userList
        .filter(u => u.id !== user.id)
        .map(u => ({
          userId: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          imageUrl: u.imageUrl,
          publicMetadata: u.publicMetadata as ClerkUserData['publicMetadata'],
        }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to load users');
    }
  };

  const {
    data: users,
    loading,
    error,
    hasMore,
    loadMoreRef,
    reset,
  } = useInfiniteScroll({
    fetchData: fetchUsers,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    reset();
  }, [searchTerm, filterType]);

  return {
    users,
    loading,
    error,
    hasMore,
    loadMoreRef,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  };
}