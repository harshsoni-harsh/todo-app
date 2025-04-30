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

## Flow

### 1. **Authentication Flow**

- **Signup**:  
  - `POST /api/auth/signup`  
  - User submits email and password → Server checks for existing user → Hashes password → Saves new user → Generates JWT → Sets it in an HTTP-only cookie.

- **Login**:  
  - `POST /api/auth/login`  
  - Server verifies email and password → On success, generates a new JWT → Sets it in an HTTP-only cookie.

- **Logout**:  
  - `POST /api/auth/logout`  
  - Clears the authentication cookie.

- **JWT Token**:  
  - Stored in an HTTP-only cookie (with `SameSite=Lax`, `Secure` in production).
  - Middleware `verifyToken` decodes and validates it before allowing access to protected routes.

**Flow example (login):**
```
Client → POST /api/auth/login → Middleware parses body → Controller checks credentials → Generates JWT → Sets cookie → Responds with user data and token
```

### 2. **Todo Flow (Protected Routes)**

- All `/api/todos` routes are secured via `verifyToken` middleware.
- The authenticated user's ID is extracted from the JWT and used to scope data access.

**Flow example (create todo):**

```
Client → POST /api/todos → Middleware verifies JWT → Controller uses req.user.id → Saves todo → Responds with saved item
```

### 3. **Real-Time Updates with Socket.IO**

- On socket connection, the server uses the `authenticateSocket` middleware to extract and verify the JWT from cookies in the WebSocket handshake.
- Once authenticated, the user’s ID is attached to the `socket` object and can be used to scope events to the user.
- When a todo is created/updated/deleted, the server emits events like `todo_created`, `todo_updated`, or `todo_deleted` to that user's room for real-time updates.

### 4. **API Documentation**

- Swagger definitions for all routes (auth + todos) are written using JSDoc comments.
- Served at `/api-docs` using `swagger-ui-express`.

### 5. **Error Handling & Structure**

- Controllers use try-catch blocks to catch async errors and respond with meaningful messages.
- Project structure separates concerns into `controllers`, `services`, `models`, and `middlewares` for clarity and scalability.
