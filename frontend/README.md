# Omnify Blog Platform

Omnify is a modern, responsive blog application built with React and Tailwind CSS. It provides a complete, client-side solution for a multi-user blog, featuring post creation and user authentication.

## ✨ Key Features

- **Full CRUD for Posts**: Create, Read, Update, and Delete blog posts.
- **User Authentication**: Secure Login and Sign Up functionality.
- **Protected Routes**: Only authenticated users can create, edit, or delete their posts.
- **Responsive Design**: A mobile-first interface that looks great on any device, built with Tailwind CSS.
- **Pagination**: Efficiently browse through a large number of blog posts.
- **Client-Side Mock API**: Simulates a backend with realistic network delays for a smooth development experience.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **In-Browser Transpilation**: Babel Standalone (for running TSX/JSX directly in the browser)

## 📂 Project Structure

The project is organized into a modular and scalable structure:

```
.
├── components/         # Reusable UI components (Header, Footer, Spinner, etc.)
├── context/            # React Context for global state (AuthContext)
├── pages/              # Top-level page components for each route
├── services/           # API layer for the application
│   └── api.ts          # Mock API for handling posts and user data
├── App.tsx             # Main application component with routing setup
├── index.html          # The single HTML entry point
├── index.tsx           # React application entry point
└── types.ts            # TypeScript type definitions for the project
```

## 🚀 Getting Started

This project is designed to run entirely in the browser without a dedicated backend server. It uses a mock API to simulate data fetching and mutations.

### Prerequisites

- A modern web browser.
- Node.js or Python to run a simple local server.

### How to Run

1.  **Serve the Files**:
    - To run this project, you need a simple static file server. You can use any server, such as the `http.server` module in Python or the `serve` package from npm.
    - Open your terminal in the project's root directory and run one of the following commands:

    **Using Node.js (`serve`)**:
    ```bash
    # If you have Node.js, you can use npx without a global installation
    npx serve .
    ```

    **Using Python**:
    ```bash
    # For Python 3
    python -m http.server
    ```

2.  **Open in Browser**:
    - Open your web browser and navigate to the local address provided by the server (e.g., `http://localhost:3000` or `http://localhost:8000`).

## ⚙️ Core Functionality

### Authentication (`context/AuthContext.tsx`)

- Manages user state, including login, signup, and logout actions.
- Persists user sessions to `localStorage` to keep users logged in across browser sessions.
- Provides authentication status to the rest of the application.

### Mock API (`services/api.ts`)

- Simulates a RESTful API backend for managing users and posts.
- Uses `setTimeout` to mimic real-world network latency.
- All data is stored in memory and will reset on a full page reload.

## Available Test Accounts

You can use the following pre-configured accounts to log in and test the application:

- **Email**: `alice@example.com` | **Password**: (any password)
- **Email**: `bob@example.com` | **Password**: (any password)
- **Email**: `charlie@example.com` | **Password**: (any password)
