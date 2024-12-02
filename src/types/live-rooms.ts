export interface MatchPreference {
  offering: string[];
  seeking: string[];
  industries: string[];
  dealSize: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface LiveRoom {
  id: string;
  status: 'active' | 'ended';
  participants: Record<string, {
    joinedAt: string;
    leftAt?: string;
    userId: string;
    name: string;
    avatar: string;
  }>;
  createdAt: string;
  endedAt?: string;
  preferences?: MatchPreference;
}