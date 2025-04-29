# Todo App Backend

A backend service for managing todo items, featuring user authentication, real-time updates, and comprehensive API documentation.

## Features

- User authentication (signup, login, logout) using JWT stored in cookies
- CRUD operations for todo items, scoped to the authenticated user
- Real-time updates on todo changes via Socket.IO
- API documentation generated with swagger-jsdoc and served through swagger-ui-express
- Code linting and formatting enforced with Biome

## Technologies

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Socket.IO for real-time communication
- Swagger for API documentation
- Biome for code linting and formatting

## Prerequisites

- Node.js v22.14
- MongoDB instance
- pnpm package manager

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with appropriate values.

3. Start the development server:

   ```bash
   pnpm start
   ```

   The server will start on the port specified in the `.env` file (default is 4000).

## Scripts

- `pnpm start`: Start the development server with nodemon
- `pnpm lint`: Run Biome linter on the codebase
- `pnpm format`: Format the codebase using Biome

## API Documentation

Access the Swagger UI for API documentation at:

```
http://localhost:4000/api-docs
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route handlers
├── models/         # Mongoose schemas and models
├── routes/         # Express route definitions
├── services/       # Business logic and service functions
├── middlewares/    # Custom middlewares
├── app.js          # Application entry point
```
