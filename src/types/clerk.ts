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
    connections?: string[];
    connectionRequests?: string[];
  };
}