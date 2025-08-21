import type { User, Post } from '../types';

// --- MOCK DATA ---
const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com' },
];

const mockPosts: Post[] = Array.from({ length: 17 }, (_, i) => {
  const user = mockUsers[i % mockUsers.length];
  return {
    id: `${i + 1}`,
    title: `Post ${i + 1}: A Journey Into Modern Web Development`,
    content: `This is the full, detailed content for post number ${i + 1}. This post explores the nuances of building scalable and maintainable applications using cutting-edge technologies.

We'll cover topics such as:
- State management with context and hooks.
- Asynchronous operations and data fetching.
- Building responsive layouts with Tailwind CSS.
- The importance of component-based architecture.

Join us as we break down complex concepts into understandable pieces. Whether you're a seasoned developer or just starting, there's something valuable to learn here. The landscape of web development is constantly evolving, and staying updated is key to success.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
  };
}).reverse(); // Show newest posts first

// --- HELPER ---
const fakeNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const api = {
  // --- AUTHENTICATION ---
  login: async (email: string, password_unused: string): Promise<{ user: User, token: string }> => {
    await fakeNetworkDelay(600);
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      // In a real app, you'd verify the password here.
      return { user, token: `fake-jwt-token-for-${user.id}` };
    }
    throw new Error("Invalid credentials. Please try again.");
  },

  signup: async (name: string, email: string, password_unused: string): Promise<{ user: User, token: string }> => {
    await fakeNetworkDelay(800);
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const newUser: User = { id: `user-${mockUsers.length + 1}`, name, email };
    mockUsers.push(newUser);
    return { user: newUser, token: `fake-jwt-token-for-${newUser.id}` };
  },

  // --- POSTS ---
  getPosts: async (page = 1, limit = 4): Promise<{ posts: Post[], totalPages: number, currentPage: number }> => {
    await fakeNetworkDelay(500);
    const totalPosts = mockPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const paginatedPosts = mockPosts.slice(startIndex, startIndex + limit);
    return { posts: paginatedPosts, totalPages, currentPage: page };
  },

  getPostById: async (postId: string): Promise<Post> => {
    await fakeNetworkDelay(300);
    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  // --- PROTECTED ACTIONS ---
  createPost: async (title: string, content: string, token: string): Promise<Post> => {
    await fakeNetworkDelay(700);
    if (!token || !token.startsWith('fake-jwt-token-for-')) {
      throw new Error("Authentication error. Please log in again.");
    }
    // Extract user from fake token
    const userId = token.replace('fake-jwt-token-for-', '');
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
         throw new Error("Invalid user.");
    }

    const newPost: Post = {
      id: `${Date.now()}`,
      title,
      content,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
    };
    mockPosts.unshift(newPost); // Add to the top of the list
    return newPost;
  },

  updatePost: async (postId: string, title: string, content: string, token: string): Promise<Post> => {
    await fakeNetworkDelay(700);
    if (!token || !token.startsWith('fake-jwt-token-for-')) {
        throw new Error("Authentication error. Please log in again.");
    }

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error("Post not found.");
    }
    
    // In a real app, we'd also verify ownership from the token
    const updatedPost = { ...mockPosts[postIndex], title, content };
    mockPosts[postIndex] = updatedPost;
    return updatedPost;
  },

  deletePost: async (postId: string, token: string): Promise<{ success: boolean }> => {
    await fakeNetworkDelay(500);
    if (!token || !token.startsWith('fake-jwt-token-for-')) {
      throw new Error("Authentication error. Please log in again.");
    }
    
    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex > -1) {
      mockPosts.splice(postIndex, 1);
      return { success: true };
    }
    throw new Error("Post not found.");
  },
};