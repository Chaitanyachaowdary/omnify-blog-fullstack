import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Post } from '../types';
import { api } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPostById(postId);
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
      if (err instanceof Error && err.message.toLowerCase().includes('not found')) {
        navigate('/404');
      } else {
        setError('An error occurred while fetching the post.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [postId, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    if (!post || !user || !token) return;
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeleteError(null);
      setIsDeleting(true);
      try {
        await api.deletePost(String(post.id), token);
        navigate('/');
      } catch (err) {
        let message = 'Failed to delete post. Please try again.';
        if (err instanceof Error) {
          message = err.message;
        }
        setDeleteError(message);
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</p>;
  if (!post) return null;

  const isAuthor = isAuthenticated && user?.id === post.authorId;

  return (
    <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-xl">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>By {post.authorName}</span>
          <span className="mx-2">&bull;</span>
          <span>Published on {formatDate(post.createdAt)}</span>
        </div>
        {isAuthor && (
          <div className="mt-6">
            <div className="flex space-x-4">
              <Link to={`/edit/${post.id}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400"
              >
                {isDeleting ? 'Deleting...' : 'Delete Post'}
              </button>
            </div>
            {deleteError && <p className="text-red-500 text-sm mt-2">{deleteError}</p>}
          </div>
        )}
      </header>
      <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
};

export default BlogPostPage;