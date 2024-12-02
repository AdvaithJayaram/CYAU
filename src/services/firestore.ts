import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  Timestamp,
  addDoc,
  increment,
  onSnapshot,
} from 'firebase/firestore';
import { db, collections } from '../config/firebase';
import type { Deal, Activity } from '../types/firestore';
import { handleFirestoreError } from './error';
import { cache } from './cache';
import { retryOperation } from './retry';

const convertTimestampToISO = (timestamp: any): string => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
};

export class FirestoreService {
  // Deal Operations
  static async createDeal(dealData: Partial<Deal>): Promise<string> {
    try {
      const dealsRef = collection(db, collections.DEALS);
      const dealDoc = await addDoc(dealsRef, {
        ...dealData,
        metadata: {
          ...dealData.metadata,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
      });
      
      return dealDoc.id;
    } catch (error) {
      throw handleFirestoreError(error);
    }
  }

  static async getDeal(dealId: string): Promise<Deal | null> {
    try {
      // Check cache first
      const cacheKey = `deal_${dealId}`;
      const cachedDeal = cache.get<Deal>(cacheKey);
      if (cachedDeal) {
        return cachedDeal;
      }

      const dealRef = doc(db, collections.DEALS, dealId);
      const dealDoc = await retryOperation(() => getDoc(dealRef));
      
      if (!dealDoc.exists()) {
        return null;
      }

      const data = dealDoc.data();
      const deal = {
        id: dealDoc.id,
        ...data,
        metadata: {
          ...data.metadata,
          createdAt: convertTimestampToISO(data.metadata.createdAt),
          updatedAt: convertTimestampToISO(data.metadata.updatedAt),
        },
      } as Deal;

      // Cache the result
      cache.set(cacheKey, deal);
      return deal;
    } catch (error) {
      throw handleFirestoreError(error);
    }
  }

  static async updateDeal(dealId: string, dealData: Partial<Deal>): Promise<void> {
    try {
      const dealRef = doc(db, collections.DEALS, dealId);
      await updateDoc(dealRef, {
        ...dealData,
        'metadata.updatedAt': Timestamp.now(),
      });

      // Invalidate cache
      cache.delete(`deal_${dealId}`);
    } catch (error) {
      throw handleFirestoreError(error);
    }
  }

  static async queryDeals(
    constraints: QueryConstraint[] = [],
    lastDoc?: DocumentSnapshot,
    pageSize: number = 10
  ): Promise<{ deals: Deal[]; lastDoc: DocumentSnapshot | null }> {
    try {
      const dealsRef = collection(db, collections.DEALS);
      let q = query(
        dealsRef,
        ...constraints,
        orderBy('metadata.createdAt', 'desc'),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await retryOperation(() => getDocs(q));
      const deals = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          metadata: {
            ...data.metadata,
            createdAt: convertTimestampToISO(data.metadata.createdAt),
            updatedAt: convertTimestampToISO(data.metadata.updatedAt),
          },
        } as Deal;
      });

      return {
        deals,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
      };
    } catch (error) {
      throw handleFirestoreError(error);
    }
  }

  // Activity Logging
  static async logActivity(activity: Omit<Activity, 'id'>): Promise<string> {
    try {
      const activitiesRef = collection(db, collections.ACTIVITIES);
      const activityDoc = await addDoc(activitiesRef, {
        ...activity,
        metadata: {
          ...activity.metadata,
          timestamp: Timestamp.now(),
        },
      });
      return activityDoc.id;
    } catch (error) {
      throw handleFirestoreError(error);
    }
  }

  // Query Helpers
  static createQueryConstraints(filters: Record<string, any>): QueryConstraint[] {
    return Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([field, value]) => where(field, '==', value));
  }

  // Real-time Subscriptions
  static subscribeToDeal(dealId: string, callback: (deal: Deal | null) => void): () => void {
    const dealRef = doc(db, collections.DEALS, dealId);
    
    return onSnapshot(dealRef, (doc) => {
      if (!doc.exists()) {
        callback(null);
        return;
      }

      const data = doc.data();
      const deal = {
        id: doc.id,
        ...data,
        metadata: {
          ...data.metadata,
          createdAt: convertTimestampToISO(data.metadata.createdAt),
          updatedAt: convertTimestampToISO(data.metadata.updatedAt),
        },
      } as Deal;

      callback(deal);
    });
  }
}