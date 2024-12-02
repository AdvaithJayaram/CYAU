import { User } from '@clerk/clerk-react';

export interface ClerkUserData {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  publicMetadata: {
    role?: string;
    company?: string;
    location?: string;
    expertise?: string[];
    industry?: string[];
    city?: string;
    country?: string;
    phoneNumber?: string;
  };
}

export const getClerkUserData = (user: User | null): ClerkUserData | null => {
  if (!user) return null;

  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    publicMetadata: user.publicMetadata as ClerkUserData['publicMetadata'],
  };
};

export const handleClerkError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again later.';
};