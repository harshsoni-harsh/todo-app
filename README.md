# Todo App

A full-stack Todo management application with real-time updates and authentication.

## Structure

- `backend/` – Express.js backend with JWT-based authentication, real-time updates via Socket.IO, and Swagger API documentation.
- `frontend/` – Next.js frontend with modern UI for managing todos and user sessions.

## Getting Started

### Prerequisites

- Node.js 22.14
- MongoDB instance
- pnpm (preferred package manager)

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   pnpm start
   ```

The backend will be running at `http://localhost:4000`.

API documentation available at `http://localhost:4000/api-docs`.

---

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

The frontend will be available at `http://localhost:3000`.

---

## Star the Repository

If you find this project helpful or useful, consider [starring the repository](https://github.com/harshsoni-harsh/todo-app) to show your support. It helps others discover the project.

---

## License

This project is licensed under the MIT License.
