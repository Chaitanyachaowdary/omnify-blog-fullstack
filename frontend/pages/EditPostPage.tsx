import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/mockApi';
import Spinner from '../components/Spinner';

const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPost = useCallback(async () => {
    if (!postId || !user) return;
    setIsLoading(true);
    try {
      const post = await api.getPostById(postId);
      if (post.authorId !== user.id) {
        // This check is a failsafe; the backend should enforce this rule.
        setError("You don't have permission to edit this post.");
        navigate('/');
        return;
      }
      setTitle(post.title);
      setContent(post.content);
    } catch (err) {
      console.error("Error fetching post for editing:", err);
      setError('Could not load post for editing. It may not exist or you may not have permission.');
    } finally {
      setIsLoading(false);
    }
  }, [postId, user, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postId || !token) {
      setError('An unexpected error occurred. Please log in again.');
      return;
    }
    setError('');
    setIsSaving(true);
    try {
      await api.updatePost(postId, title, content, token);
      navigate(`/post/${postId}`);
    } catch (err) {
      let message = 'Failed to update post. Please try again.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Spinner />;
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4 text-center bg-red-50 p-3 rounded-md">{error}</p>}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Write your post content here."
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;