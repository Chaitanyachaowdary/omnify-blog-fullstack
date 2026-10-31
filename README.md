# Omnify Blog (full stack)

A blog platform with a React + TypeScript frontend and a Java Spring Boot REST backend.

**Live frontend:** https://omnify-blog-fullstack.vercel.app

## Structure

```
frontend/          React 19 + TypeScript + Vite + React Router 7
backend/blog/      Spring Boot API (Maven), JPA repositories, seed data
```

## What it does

- Paginated list of posts, newest first (`GET /api/posts?page=1&limit=4`)
- Single post view (`GET /api/posts/{id}`)
- Post and user models persisted through Spring Data JPA, with `data.sql` seed content
- CORS configured for the Vite dev server and the deployed frontend
- Frontend components: header, footer, layout, post card, pagination

## Run locally

Backend:

```bash
cd backend/blog
./mvnw spring-boot:run        # http://localhost:8080
```

Frontend:

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

Point the frontend at the API with the base URL used in the fetch calls (defaults to the local backend in development).

## Author

Chaitanya Yelamasetty · [portfolio](https://chaitanya.veltore.co.in) · [LinkedIn](https://www.linkedin.com/in/chaitanya-yelamasetty)
