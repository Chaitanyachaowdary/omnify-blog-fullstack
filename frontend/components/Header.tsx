
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const UserMenu = () => (
    <div className="relative">
        <div className="flex items-center space-x-4">
            <Link to="/create" className="hidden sm:inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">
                Create Post
            </Link>
            <span className="hidden sm:inline-block font-medium text-gray-700">Welcome, {user?.name.split(' ')[0]}</span>
            <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
                Logout
            </button>
        </div>
    </div>
  );

  const GuestMenu = () => (
    <div className="hidden sm:flex items-center space-x-2">
      <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-primary transition-colors">
        Login
      </Link>
      <Link
        to="/signup"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.747-8.494h11.494M4.253 12h15.494" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              </svg>
              <span className="text-2xl font-bold text-gray-800">Omnify</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">All Posts</Link>
          </nav>
          <div className="flex items-center">
            {isAuthenticated ? <UserMenu /> : <GuestMenu />}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link to="/create" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Create Post</Link>
                <button onClick={handleLogout} className="w-full text-left block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
