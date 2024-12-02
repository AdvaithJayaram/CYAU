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
import type { Post, Comment } from '../types/wall';
import type { UserProfile } from '../types/profile';
import type { Deal } from '../types/firestore';
import type { LiveRoom } from '../types/live-rooms';

const convertTimestampToISO = (timestamp: any): string => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
};

export const DatabaseService = {
  // User Operations
  async getUser(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, collections.USERS, userId));
      if (!userDoc.exists()) return null;
      
      const data = userDoc.data();
      return {
        id: userDoc.id,
        ...data,
        createdAt: convertTimestampToISO(data.createdAt),
        updatedAt: convertTimestampToISO(data.updatedAt),
      } as UserProfile;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, userData: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, collections.USERS, userId), {
        ...userData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Post Operations
  async createPost(postData: Omit<Post, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collections.POSTS), {
        ...postData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        likes: 0,
        shares: 0,
        comments: [],
        likedBy: {},
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async getAllPosts(): Promise<Post[]> {
    try {
      const q = query(
        collection(db, collections.POSTS),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: convertTimestampToISO(data.createdAt),
          updatedAt: convertTimestampToISO(data.updatedAt),
        } as Post;
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async likePost(postId: string, userId: string): Promise<void> {
    try {
      const postRef = doc(db, collections.POSTS, postId);
      await updateDoc(postRef, {
        likes: increment(1),
        [`likedBy.${userId}`]: true,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  // Live Room Operations
  async createLiveRoom(userId: string, preferences: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collections.LIVE_ROOMS), {
        status: 'active',
        participants: {
          [userId]: {
            joinedAt: Timestamp.now(),
            userId,
          },
        },
        preferences,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating live room:', error);
      throw error;
    }
  },

  async joinLiveRoom(roomId: string, userId: string, userData: any): Promise<void> {
    try {
      const roomRef = doc(db, collections.LIVE_ROOMS, roomId);
      await updateDoc(roomRef, {
        [`participants.${userId}`]: {
          joinedAt: Timestamp.now(),
          userId,
          ...userData,
        },
      });
    } catch (error) {
      console.error('Error joining live room:', error);
      throw error;
    }
  },

  async leaveLiveRoom(roomId: string, userId: string): Promise<void> {
    try {
      const roomRef = doc(db, collections.LIVE_ROOMS, roomId);
      await updateDoc(roomRef, {
        [`participants.${userId}.leftAt`]: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error leaving live room:', error);
      throw error;
    }
  },

  subscribeToLiveRooms(callback: (rooms: LiveRoom[]) => void): () => void {
    const q = query(
      collection(db, collections.LIVE_ROOMS),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: convertTimestampToISO(doc.data().createdAt),
        endedAt: doc.data().endedAt ? convertTimestampToISO(doc.data().endedAt) : undefined,
      })) as LiveRoom[];
      
      callback(rooms);
    });
  },
};