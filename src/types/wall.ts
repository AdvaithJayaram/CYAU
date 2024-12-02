export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
  shares: number;
  likedBy?: Record<string, boolean>;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  likes: number;
}