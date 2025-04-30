const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

const app = require("../src/app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  const userData = {
    email: "testuser@example.com",
    password: "testpass123",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(userData.email);
  });

  it("should not register with existing email", async () => {
    const res = await request(app).post("/api/auth/signup").send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should reject login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should logout the user", async () => {
    const agent = request.agent(app);
    await agent.post("/api/auth/login").send(userData);

    const res = await agent.post("/api/auth/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });
});
