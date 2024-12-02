export interface UserProfile {
  // Basic Information
  fullName: string;
  profilePicture: string;
  jobTitle: string;
  organizationName: string;
  email: string;
  phoneNumber: string;
  location: {
    city: string;
    state: string;
    country: string;
  };

  // Professional Details
  industry: string[];
  expertise: string[];
  yearsOfExperience: number;
  certifications: string[];
  currentEmployer: {
    name: string;
    position: string;
    startDate: string;
  };
  linkedinProfile: string;
  professionalSummary: string;

  // Deal Flow Attributes
  dealRole: string[];
  primaryDealTypes: string[];
  preferredDealSize: {
    min: number;
    max: number;
    currency: string;
  };
  geographicalFocus: string[];
  sectorFocus: string[];
  dealFrequency: string;

  // Legal and Compliance
  kycStatus: 'pending' | 'completed' | 'needs_update';
  amlCompliance: {
    certified: boolean;
    documentUrl: string;
    expiryDate: string;
  };
  authorizedRepresentative: boolean;
  powerOfAttorney: {
    exists: boolean;
    documentUrl?: string;
    expiryDate?: string;
  };
  conflictOfInterest: string[];

  // Negotiation Preferences
  communicationStyle: string;
  communicationModes: string[];
  timeZone: string;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  negotiationPriorities: string[];

  // Portfolio/Deal History
  pastDeals: {
    id: string;
    title: string;
    type: string;
    value: number;
    currency: string;
    date: string;
    outcome: string;
    metrics: {
      roi?: number;
      moic?: number;
    };
  }[];
  caseStudies: {
    title: string;
    description: string;
    url: string;
  }[];
  notablePartnerships: string[];

  // Network and Collaboration
  connections: number;
  teams: {
    id: string;
    name: string;
    role: string;
  }[];
  recommendations: {
    from: string;
    text: string;
    rating: number;
    date: string;
  }[];
  collaborationStatus: 'open' | 'closed';

  // AI-Powered Insights
  aiInsights: {
    strengths: string[];
    suggestedConnections: string[];
    negotiationStyle: string;
    lastUpdated: string;
  };

  // Security and Privacy
  dataSharing: {
    profile: 'public' | 'private' | 'connections';
    deals: 'public' | 'private' | 'connections';
    network: 'public' | 'private' | 'connections';
  };
  twoFactorEnabled: boolean;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}