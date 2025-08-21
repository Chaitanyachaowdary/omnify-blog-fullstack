
import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface BlogPostCardProps {
  post: Post;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const snippet = post.content.substring(0, 100) + '...';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <span>{post.authorName}</span>
          <span className="mx-2">&bull;</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">
          <Link to={`/post/${post.id}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{snippet}</p>
        <Link
          to={`/post/${post.id}`}
          className="font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
