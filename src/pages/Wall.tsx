import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { DatabaseService } from '../services/database';
import CreatePost from '../components/wall/CreatePost';
import PostCard from '../components/wall/PostCard';
import type { Post } from '../types/wall';
import { AlertCircle } from 'lucide-react';

export default function Wall() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await DatabaseService.getAllPosts();
        
        if (mounted) {
          setPosts(fetchedPosts || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (mounted) {
          setError('Unable to load posts. Please try again later.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleCreatePost = async (content: string) => {
    if (!user) return;

    try {
      const newPost: Omit<Post, 'id'> = {
        content,
        authorId: user.id,
        authorName: user.fullName || '',
        authorImage: user.imageUrl,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
      };

      const postId = await DatabaseService.createPost(newPost);
      if (postId) {
        setPosts(prevPosts => [{ id: postId, ...newPost }, ...prevPosts]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;
    
    try {
      await DatabaseService.likePost(postId, user.id);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onSubmit={handleCreatePost} />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <div className="flex-1">{error}</div>
          <button
            onClick={handleRetry}
            className="px-3 py-1 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <div className="space-y-6 mt-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onLike={() => handleLikePost(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}