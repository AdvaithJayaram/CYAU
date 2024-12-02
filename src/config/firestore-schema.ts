import { z } from 'zod';

// Schema Definitions
export const schemas = {
  users: z.object({
    id: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    imageUrl: z.string().url(),
    jobTitle: z.string(),
    company: z.string(),
    location: z.object({
      city: z.string(),
      country: z.string(),
    }),
    bio: z.string(),
    expertise: z.array(z.string()),
    preferences: z.object({
      dealTypes: z.array(z.string()),
      industries: z.array(z.string()),
      investmentRange: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.string(),
      }),
    }),
    settings: z.object({
      emailNotifications: z.boolean(),
      visibility: z.enum(['public', 'private', 'connections']),
      twoFactorEnabled: z.boolean(),
    }),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      lastLogin: z.string(),
      status: z.enum(['active', 'inactive', 'suspended']),
    }),
  }),

  posts: z.object({
    id: z.string(),
    authorId: z.string(),
    content: z.string(),
    mediaUrls: z.array(z.string().url()).optional(),
    type: z.enum(['text', 'image', 'link', 'deal']),
    visibility: z.enum(['public', 'connections', 'private']),
    tags: z.array(z.string()),
    metrics: z.object({
      likes: z.number(),
      comments: z.number(),
      shares: z.number(),
      views: z.number(),
    }),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      status: z.enum(['active', 'archived', 'removed']),
    }),
  }),

  deals: z.object({
    id: z.string(),
    title: z.string(),
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
      value: z.number(),
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
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      createdBy: z.string(),
      views: z.number(),
      interested: z.number(),
    }),
  }),

  liveRooms: z.object({
    id: z.string(),
    type: z.enum(['video', 'audio', 'chat']),
    status: z.enum(['active', 'scheduled', 'ended']),
    title: z.string(),
    description: z.string().optional(),
    host: z.string(),
    participants: z.record(z.object({
      userId: z.string(),
      role: z.enum(['host', 'speaker', 'listener']),
      joinedAt: z.string(),
      leftAt: z.string().optional(),
    })),
    settings: z.object({
      maxParticipants: z.number(),
      allowChat: z.boolean(),
      recordingEnabled: z.boolean(),
      visibility: z.enum(['public', 'private', 'invited']),
    }),
    schedule: z.object({
      startTime: z.string(),
      endTime: z.string().optional(),
      timezone: z.string(),
    }).optional(),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      status: z.enum(['active', 'ended', 'cancelled']),
    }),
  }),

  documents: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    size: z.number(),
    url: z.string().url(),
    dealId: z.string().optional(),
    uploadedBy: z.string(),
    access: z.object({
      type: z.enum(['public', 'private', 'shared']),
      users: z.array(z.string()),
      roles: z.array(z.string()),
    }),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      version: z.number(),
      status: z.enum(['active', 'archived', 'deleted']),
    }),
  }),

  comments: z.object({
    id: z.string(),
    content: z.string(),
    authorId: z.string(),
    parentId: z.string().optional(),
    targetType: z.enum(['post', 'deal', 'document']),
    targetId: z.string(),
    mentions: z.array(z.string()),
    metrics: z.object({
      likes: z.number(),
      replies: z.number(),
    }),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      status: z.enum(['active', 'hidden', 'deleted']),
    }),
  }),

  connections: z.object({
    id: z.string(),
    userId: z.string(),
    connectedWith: z.string(),
    type: z.enum(['connection', 'follow', 'block']),
    status: z.enum(['pending', 'accepted', 'rejected', 'blocked']),
    metadata: z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      lastInteraction: z.string(),
    }),
  }),

  activities: z.object({
    id: z.string(),
    userId: z.string(),
    type: z.enum([
      'post_create',
      'post_like',
      'post_comment',
      'deal_create',
      'deal_update',
      'room_join',
      'room_leave',
      'connection_request',
      'connection_accept',
    ]),
    targetType: z.enum(['post', 'deal', 'room', 'user', 'document']),
    targetId: z.string(),
    details: z.object({
      description: z.string(),
      oldValue: z.any().optional(),
      newValue: z.any().optional(),
    }),
    metadata: z.object({
      createdAt: z.string(),
      ip: z.string().optional(),
      userAgent: z.string().optional(),
    }),
  }),
};

// Sample Data
export const sampleData = {
  users: {
    'user1': {
      id: 'user1',
      email: 'sarah.johnson@example.com',
      fullName: 'Sarah Johnson',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      jobTitle: 'Investment Director',
      company: 'Venture Capital Partners',
      location: {
        city: 'San Francisco',
        country: 'USA',
      },
      bio: 'Experienced investment professional focused on tech and healthcare',
      expertise: ['Venture Capital', 'M&A', 'Healthcare'],
      preferences: {
        dealTypes: ['Investment', 'M&A'],
        industries: ['Technology', 'Healthcare'],
        investmentRange: {
          min: 1000000,
          max: 10000000,
          currency: 'USD',
        },
      },
      settings: {
        emailNotifications: true,
        visibility: 'public',
        twoFactorEnabled: true,
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-03-15T12:00:00Z',
        lastLogin: '2024-03-15T12:00:00Z',
        status: 'active',
      },
    },
  },

  posts: {
    'post1': {
      id: 'post1',
      authorId: 'user1',
      content: 'Excited to announce our latest investment in healthcare AI!',
      type: 'text',
      visibility: 'public',
      tags: ['Healthcare', 'AI', 'Investment'],
      metrics: {
        likes: 42,
        comments: 7,
        shares: 12,
        views: 1250,
      },
      metadata: {
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
        status: 'active',
      },
    },
  },

  deals: {
    'deal1': {
      id: 'deal1',
      title: 'Healthcare AI Series A',
      type: 'Investment',
      status: 'active',
      visibility: 'private',
      overview: {
        description: 'Series A investment opportunity in healthcare AI startup',
        highlights: [
          'AI-powered diagnostic platform',
          'FDA approval pending',
          'Strong IP portfolio',
        ],
        sector: ['Healthcare', 'Technology'],
        region: 'North America',
      },
      financial: {
        value: 10000000,
        currency: 'USD',
        minimumInvestment: 250000,
        targetRaise: 10000000,
        currentRaise: 7500000,
      },
      participants: {
        owner: 'user1',
        leads: ['user2'],
        investors: [
          {
            uid: 'user3',
            amount: 1000000,
            status: 'committed',
            joinedAt: '2024-02-01T00:00:00Z',
          },
        ],
        advisors: ['user4'],
      },
      stages: {
        current: 'dueDiligence',
        kyc: {
          status: 'completed',
          documents: ['doc1', 'doc2'],
          completedAt: '2024-02-15T00:00:00Z',
        },
        dueDiligence: {
          status: 'inProgress',
          documents: ['doc3', 'doc4'],
        },
        negotiation: {
          status: 'pending',
          documents: [],
        },
        closing: {
          status: 'pending',
          documents: [],
        },
      },
      metadata: {
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-03-15T12:00:00Z',
        createdBy: 'user1',
        views: 150,
        interested: 12,
      },
    },
  },

  liveRooms: {
    'room1': {
      id: 'room1',
      type: 'video',
      status: 'active',
      title: 'Healthcare AI Deal Discussion',
      description: 'Team meeting to discuss the Healthcare AI investment opportunity',
      host: 'user1',
      participants: {
        'user1': {
          userId: 'user1',
          role: 'host',
          joinedAt: '2024-03-15T14:00:00Z',
        },
        'user2': {
          userId: 'user2',
          role: 'speaker',
          joinedAt: '2024-03-15T14:01:00Z',
        },
      },
      settings: {
        maxParticipants: 10,
        allowChat: true,
        recordingEnabled: true,
        visibility: 'private',
      },
      metadata: {
        createdAt: '2024-03-15T14:00:00Z',
        updatedAt: '2024-03-15T14:00:00Z',
        status: 'active',
      },
    },
  },
};

// Indexes
export const indexes = [
  {
    collection: 'posts',
    fields: ['authorId', 'createdAt'],
  },
  {
    collection: 'deals',
    fields: ['status', 'visibility', 'createdAt'],
  },
  {
    collection: 'liveRooms',
    fields: ['status', 'type', 'createdAt'],
  },
  {
    collection: 'activities',
    fields: ['userId', 'type', 'createdAt'],
  },
  {
    collection: 'connections',
    fields: ['userId', 'status', 'createdAt'],
  },
];