```typescript
export type DealStage = 'kyc' | 'dueDiligence' | 'dealStructuring' | 'negotiation' | 'signing';

export type StageStatus = {
  status: 'pending' | 'inProgress' | 'completed';
  completionPercentage: number;
  tasks?: {
    name: string;
    completed: boolean;
  }[];
  documents?: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  completedAt?: string;
};

export interface DealProgress {
  currentStage: DealStage;
  stages: Record<DealStage, StageStatus>;
  lastUpdated: string;
  updatedBy: string;
}

export interface DealTemplate {
  id: string;
  name: string;
  icon: string;
  jurisdictions: string[];
  stages: {
    [key in DealStage]: {
      tasks: string[];
    };
  };
}
```