import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, collections } from '../../config/firebase';

export default function LiveUserCounter() {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const liveRoomsQuery = query(
      collection(db, collections.LIVE_ROOMS),
      where('status', '==', 'active')
    );
    
    const unsubscribe = onSnapshot(liveRoomsQuery, (snapshot) => {
      let activeUsers = 0;
      
      snapshot.forEach((doc) => {
        const room = doc.data();
        if (room.participants) {
          activeUsers += Object.values(room.participants).filter(
            (participant: any) => !participant.leftAt
          ).length;
        }
      });
      
      setUserCount(activeUsers);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching live users:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"></div>
        <span className="text-gray-500">Counting users...</span>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-2">
      <div className="relative">
        <Users className="w-5 h-5 text-blue-600" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <span className="font-medium">{userCount.toLocaleString()}</span>
      <span className="text-gray-500">users online</span>
    </div>
  );
}