import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB3HyG3Nfh7PiIc6OQNQSO960k8pD_V7eA",
  authDomain: "humancentricdealflow.firebaseapp.com",
  projectId: "humancentricdealflow",
  storageBucket: "humancentricdealflow.firebasestorage.app",
  messagingSenderId: "1041871370052",
  appId: "1:1041871370052:web:c0b6687475e105b1f24911",
  measurementId: "G-TSP8ED02CB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize other Firebase services
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Collection references
export const collections = {
  USERS: 'users',
  DEALS: 'deals',
  ORGANIZATIONS: 'organizations',
  TRANSACTIONS: 'transactions',
  DOCUMENTS: 'documents',
  ACTIVITIES: 'activities',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIVE_ROOMS: 'liveRooms',
  CONNECTIONS: 'connections',
} as const;