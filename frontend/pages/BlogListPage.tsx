import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Post } from '../types';
import { api } from '../services/mockApi';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPosts(page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching posts:", err);
      let message = 'An error occurred while fetching posts. Please try again later.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">From Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center py-10 px-4">
          <p className="text-lg text-red-600 bg-red-100 p-4 rounded-lg shadow-md">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BlogListPage;