// User-related types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  organization: {
    id: string;
    name: string;
    role: string;
  };
  professional: {
    title: string;
    industry: string[];
    expertise: string[];
    experience: number;
    certifications: string[];
  };
  preferences: {
    dealTypes: string[];
    investmentRange: {
      min: number;
      max: number;
      currency: string;
    };
    sectors: string[];
    regions: string[];
  };
  compliance: {
    kycStatus: 'pending' | 'approved' | 'rejected';
    kycDate?: string;
    amlChecked: boolean;
    documents: {
      type: string;
      url: string;
      verified: boolean;
      uploadDate: string;
    }[];
  };
  stats: {
    dealsParticipated: number;
    dealsCreated: number;
    totalInvestment: number;
    successfulDeals: number;
  };
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      deals: boolean;
      messages: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'connections';
      showEmail: boolean;
      showPhone: boolean;
    };
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    status: 'active' | 'inactive' | 'suspended';
  };
}

// Deal-related types
export interface Deal {
  id: string;
  title: string;
  type: 'M&A' | 'Investment' | 'Partnership' | 'Asset Sale';
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  visibility: 'public' | 'private' | 'invited';
  overview: {
    description: string;
    highlights: string[];
    sector: string[];
    region: string;
  };
  financial: {
    value: number;
    currency: string;
    minimumInvestment?: number;
    targetRaise?: number;
    currentRaise?: number;
  };
  participants: {
    owner: string;
    leads: string[];
    investors: {
      uid: string;
      amount: number;
      status: 'pending' | 'committed' | 'completed';
      joinedAt: string;
    }[];
    advisors: string[];
  };
  timeline: {
    created: string;
    updated: string;
    dueDate?: string;
    closingDate?: string;
  };
  stages: {
    current: 'kyc' | 'dueDiligence' | 'negotiation' | 'closing';
    kyc: {
      status: 'pending' | 'inProgress' | 'completed';
      documents: string[];
      completedAt?: string;
    };
    dueDiligence: {
      status: 'pending' | 'inProgress' | 'completed';
      documents: string[];
      completedAt?: string;
    };
    negotiation: {
      status: 'pending' | 'inProgress' | 'completed';
      documents: string[];
      completedAt?: string;
    };
    closing: {
      status: 'pending' | 'inProgress' | 'completed';
      documents: string[];
      completedAt?: string;
    };
  };
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    access: 'all' | 'leads' | 'owner';
  }[];
  room: {
    id: string;
    type: 'video' | 'chat';
    status: 'active' | 'scheduled' | 'ended';
    participants: string[];
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    views: number;
    interested: number;
  };
}

// Organization-related types
export interface Organization {
  id: string;
  name: string;
  type: 'Company' | 'Fund' | 'Bank' | 'Advisory';
  profile: {
    logo?: string;
    website?: string;
    description: string;
    founded?: string;
    size: string;
    locations: string[];
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  members: {
    uid: string;
    role: 'admin' | 'member';
    joinedAt: string;
  }[];
  compliance: {
    verified: boolean;
    documents: {
      type: string;
      url: string;
      verified: boolean;
      uploadDate: string;
    }[];
  };
  deals: {
    total: number;
    active: number;
    completed: number;
    value: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'inactive' | 'suspended';
  };
}

// Activity-related types
export interface Activity {
  id: string;
  type: 'deal' | 'document' | 'message' | 'user' | 'system';
  action: string;
  dealId?: string;
  userId: string;
  details: {
    description: string;
    oldValue?: any;
    newValue?: any;
  };
  metadata: {
    timestamp: string;
    ip?: string;
    userAgent?: string;
  };
}