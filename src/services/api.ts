import type { AxiosError } from 'axios';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: AxiosError | null = null
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const API_ENDPOINTS = {
  DEALS: '/api/deals',
  USERS: '/api/users',
  POSTS: '/api/posts',
  NOTIFICATIONS: '/api/notifications',
  CONNECTIONS: '/api/connections',
  ACTIVITIES: '/api/activities',
} as const;