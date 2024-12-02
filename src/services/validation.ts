import { z } from 'zod';

// Base schemas for common fields
const timestampSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

const metadataSchema = timestampSchema.extend({
  createdBy: z.string(),
  status: z.enum(['active', 'inactive', 'suspended']),
});

// Post validation schema
export const postSchema = z.object({
  content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
  authorId: z.string(),
  authorName: z.string(),
  authorImage: z.string().url(),
  likes: z.number().int().nonnegative(),
  comments: z.array(z.object({
    content: z.string(),
    authorId: z.string(),
    authorName: z.string(),
    authorImage: z.string().url(),
    createdAt: z.string(),
    likes: z.number().int().nonnegative(),
  })),
  shares: z.number().int().nonnegative(),
  likedBy: z.record(z.boolean()).optional(),
}).merge(timestampSchema);

// Deal validation schema
export const dealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['M&A', 'Investment', 'Partnership', 'Asset Sale']),
  status: z.enum(['draft', 'active', 'closed', 'cancelled']),
  visibility: z.enum(['public', 'private', 'invited']),
  overview: z.object({
    description: z.string(),
    highlights: z.array(z.string()),
    sector: z.array(z.string()),
    region: z.string(),
  }),
  financial: z.object({
    value: z.number().positive(),
    currency: z.string(),
    minimumInvestment: z.number().optional(),
    targetRaise: z.number().optional(),
    currentRaise: z.number().optional(),
  }),
  participants: z.object({
    owner: z.string(),
    leads: z.array(z.string()),
    investors: z.array(z.object({
      uid: z.string(),
      amount: z.number(),
      status: z.enum(['pending', 'committed', 'completed']),
      joinedAt: z.string(),
    })),
    advisors: z.array(z.string()),
  }),
  stages: z.object({
    current: z.enum(['kyc', 'dueDiligence', 'negotiation', 'closing']),
    kyc: z.object({
      status: z.enum(['pending', 'inProgress', 'completed']),
      documents: z.array(z.string()),
      completedAt: z.string().optional(),
    }),
    dueDiligence: z.object({
      status: z.enum(['pending', 'inProgress', 'completed']),
      documents: z.array(z.string()),
      completedAt: z.string().optional(),
    }),
    negotiation: z.object({
      status: z.enum(['pending', 'inProgress', 'completed']),
      documents: z.array(z.string()),
      completedAt: z.string().optional(),
    }),
    closing: z.object({
      status: z.enum(['pending', 'inProgress', 'completed']),
      documents: z.array(z.string()),
      completedAt: z.string().optional(),
    }),
  }),
  documents: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string().url(),
    uploadedBy: z.string(),
    uploadedAt: z.string(),
    access: z.enum(['all', 'leads', 'owner']),
  })),
  metadata: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    createdBy: z.string(),
    views: z.number().int().nonnegative(),
    interested: z.number().int().nonnegative(),
  }),
});

// Live Room validation schema
export const liveRoomSchema = z.object({
  status: z.enum(['active', 'ended']),
  participants: z.record(z.object({
    joinedAt: z.string(),
    leftAt: z.string().optional(),
    userId: z.string(),
    name: z.string(),
    avatar: z.string().url(),
  })),
  preferences: z.object({
    offering: z.array(z.string()),
    seeking: z.array(z.string()),
    industries: z.array(z.string()),
    dealSize: z.object({
      min: z.number().nonnegative(),
      max: z.number().positive(),
      currency: z.string(),
    }),
  }).optional(),
}).merge(timestampSchema);

// Activity validation schema
export const activitySchema = z.object({
  type: z.enum(['deal', 'document', 'message', 'user', 'system']),
  action: z.string(),
  dealId: z.string().optional(),
  userId: z.string(),
  details: z.object({
    description: z.string(),
    oldValue: z.any().optional(),
    newValue: z.any().optional(),
  }),
  metadata: z.object({
    timestamp: z.string(),
    ip: z.string().optional(),
    userAgent: z.string().optional(),
  }),
});