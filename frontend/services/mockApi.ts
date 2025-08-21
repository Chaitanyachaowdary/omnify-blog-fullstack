import type { User, Post } from '../types';

// --- MOCK DATA ---
const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
];

const postTemplates = [
  {
    title: "Unlocking the Power of React Hooks",
    content: `React Hooks have revolutionized how we write components. This post dives deep into useState, useEffect, and useContext with practical examples. We'll explore custom hooks and advanced patterns to make your React code cleaner and more efficient. 
    
Forget class components; the future is functional. Join us to refactor a class-based component into a modern, hook-based one, highlighting the improvements in readability and performance.`
  },
  {
    title: "A Deep Dive into TypeScript for Beginners",
    content: `TypeScript is a superset of JavaScript that adds static types. Why is this important? It helps catch errors early, improves code readability, and enhances developer tooling. This guide will take you from zero to hero, covering basic types, interfaces, generics, and setting up a project with TypeScript.
    
We'll build a small To-Do application to demonstrate the power of TypeScript in a real-world scenario.`
  },
  {
    title: "State Management in React: Context vs. Redux",
    content: `Managing state in a large React application can be challenging. The two most popular solutions are React's built-in Context API and the Redux library. Which one should you choose? This article breaks down the pros and cons of each, providing clear use cases and code examples to help you make an informed decision for your next project.
    
We'll compare boilerplate, performance, and developer experience.`
  },
  {
    title: "Building a REST API with Node.js and Express",
    content: `Node.js and Express make a powerful combination for building fast and scalable backend services. This tutorial will guide you through creating a complete REST API from scratch. We'll cover routing, middleware, connecting to a database, and handling user authentication. By the end, you'll have a solid foundation for building your own backend applications.
    
Security best practices like data validation and environment variables will also be discussed.`
  },
  {
    title: "The Ultimate Guide to Responsive Web Design",
    content: `In a mobile-first world, responsive design is non-negotiable. This comprehensive guide covers the principles of responsive web design, from fluid grids and flexible images to media queries. We'll explore modern CSS techniques like Flexbox and Grid to create layouts that look great on any device, from a small phone to a large desktop monitor.
    
We'll also touch upon accessibility considerations for different screen sizes.`
  },
  {
    title: "Getting Started with Vue.js 3",
    content: `Vue.js is known for its gentle learning curve and excellent documentation. With the release of Vue 3, the framework has become even more powerful with the Composition API. This article is a beginner-friendly introduction to Vue 3, covering project setup, creating components, handling user input, and fetching data from an API.
    
We'll build a simple weather app to put these concepts into practice.`
  },
  {
    title: "Demystifying Asynchronous JavaScript",
    content: `Asynchronous programming is a core concept in JavaScript, but it can be tricky for newcomers. This post demystifies the topic by explaining the evolution from callbacks to Promises and finally to the modern async/await syntax. We'll look at real-world examples of handling asynchronous operations like API calls, with a focus on writing clean, error-free code.`
  },
  {
    title: "An Introduction to Svelte: The Disappearing Framework",
    content: `Svelte is a radical new approach to building user interfaces. Where traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. This results in highly optimized, vanilla JavaScript. Learn the basics of Svelte and see why it's gaining so much popularity.`
  },
  {
    title: "10 Essential VS Code Extensions for Web Developers",
    content: `A great code editor can significantly boost your productivity. Visual Studio Code is one of the most popular editors, largely due to its vast ecosystem of extensions. In this article, we'll share 10 essential extensions for web developers, covering everything from code formatting and linting to live server previews and Git integration. Supercharge your workflow with these must-have tools.`
  },
  {
    title: "The Importance of Web Accessibility (a11y)",
    content: `Web accessibility (often abbreviated as a11y) is the practice of ensuring that your websites are usable by everyone, regardless of disability. This isn't just a legal requirement in many places; it's the right thing to do. This post covers the fundamentals of a11y, including semantic HTML, ARIA attributes, and keyboard navigation. Learn how to make your websites more inclusive.`
  },
  {
    title: "CI/CD for Frontend Projects using GitHub Actions",
    content: `Continuous Integration and Continuous Deployment (CI/CD) can automate your development workflow, from running tests to deploying your application. This tutorial shows you how to set up a simple CI/CD pipeline for a frontend project using GitHub Actions. We'll configure workflows to automatically build, test, and deploy a React app to a hosting service like Netlify or Vercel.`
  },
  {
    title: "GraphQL vs. REST: Which API Architecture is Right for You?",
    content: `When building an API, one of the first decisions is choosing an architecture. For years, REST has been the standard, but GraphQL has emerged as a powerful alternative. This article compares GraphQL and REST, highlighting their key differences in data fetching, schema definition, and caching. We'll explore the strengths and weaknesses of each to help you decide which is a better fit for your application's needs.`
  }
];


const mockPosts: Post[] = postTemplates.map((post, i) => {
  const user = mockUsers[i % mockUsers.length];
  return {
    id: (i + 1).toString(),
    title: post.title,
    content: post.content,
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
  };
}).reverse(); // Show newest posts first

// --- HELPER ---
const fakeNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const api = {
  // --- AUTHENTICATION ---
  login: async (email: string, password: string): Promise<{ user: User, token: string }> => {
    await fakeNetworkDelay(600);
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      // In a real app, you'd verify the password here.
      return { user, token: `fake-jwt-token-for-${user.id}` };
    }
    throw new Error("Invalid credentials. Please try again.");
  },

  signup: async (name: string, email: string, password: string): Promise<{ user: User, token: string }> => {
    await fakeNetworkDelay(800);
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const newUser: User = { id: Date.now().toString(), name, email };
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
    const userIdStr = token.replace('fake-jwt-token-for-', '');
    const user = mockUsers.find(u => u.id === userIdStr);
    if (!user) {
         throw new Error("Invalid user.");
    }

    const newPost: Post = {
      id: Date.now().toString(),
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