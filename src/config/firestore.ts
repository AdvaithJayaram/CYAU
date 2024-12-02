import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { app } from './firebase';

// Initialize Firestore with settings
export const firestore = initializeFirestore(app, {
  cacheSizeBytes: 50 * 1024 * 1024, // 50 MB cache size
  experimentalForceLongPolling: false,
});

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(firestore).catch((err) => {
    console.error('Firestore persistence error:', err);
  });
}

// Collection names as constants
export const collections = {
  USERS: 'users',
  DEALS: 'deals',
  ORGANIZATIONS: 'organizations',
  TRANSACTIONS: 'transactions',
  DOCUMENTS: 'documents',
  ACTIVITIES: 'activities',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
} as const;