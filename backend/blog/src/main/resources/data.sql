-- This script runs on startup to populate the database with initial data.

-- Note: In a real app, passwords must be securely hashed.
INSERT INTO users (id, name, email, password_hash) VALUES
(1, 'Jane Doe', 'jane@example.com', 'password123'),
(2, 'John Smith', 'john@example.com', 'password456')
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

INSERT INTO post (id, title, content, author_id, author_name, created_at) VALUES
(1, 'Getting Started with React Hooks', 'React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class...', 1, 'Jane Doe', '2024-07-27T10:00:00Z'),
(2, 'A Deep Dive into Tailwind CSS', 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs...', 2, 'John Smith', '2024-07-24T14:30:00Z'),
(3, 'Understanding Asynchronous JavaScript', 'Asynchronous JavaScript is a cornerstone of modern web development. It allows us to perform long-running tasks like fetching data from a server without blocking the main thread, ensuring a smooth user experience...', 1, 'Jane Doe', '2024-07-19T18:00:00Z'),
(4, 'State Management with React Context', 'While libraries like Redux are powerful, sometimes they are overkill for simpler applications. React''s built-in Context API provides a way to pass data through the component tree without having to pass props down manually...', 2, 'John Smith', '2024-07-15T11:00:00Z'),
(5, 'The Importance of Web Accessibility', 'Web accessibility (also known as a11y) is the inclusive practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities...', 1, 'Jane Doe', '2024-07-10T09:00:00Z')
ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content);