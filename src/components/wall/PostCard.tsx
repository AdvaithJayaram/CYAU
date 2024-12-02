import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import type { Post } from '../../types/wall';
import type { User } from '@clerk/clerk-react';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  currentUser: User | null | undefined;
  onLike: () => void;
}

export default function PostCard({ post, currentUser, onLike }: PostCardProps) {
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await onLike();
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{post.authorName}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <p className="mt-4">{post.content}</p>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 text-gray-500 hover:text-blue-600 ${
            isLiking ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiking ? 'animate-pulse' : ''}`} />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
          <Share2 className="w-5 h-5" />
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}