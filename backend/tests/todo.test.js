const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

const app = require("../src/app");

let cookie;

jest.mock("../src/config/socket-io", () => ({
  getIO: () => ({
    to: () => ({
      emit: jest.fn(),
    }),
    emit: jest.fn(),
  }),
}));

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
  const user = { email: "todo@example.com", password: "123456" };

  await request(app).post("/api/auth/signup").send(user);
  const res = await request(app).post("/api/auth/login").send(user);
  cookie = res.headers["set-cookie"];
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Todo Routes", () => {
  let todoId;

  it("should create a todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Cookie", cookie)
      .send({ title: "Test Todo", description: "Test description" });

    expect(res.statusCode).toBe(201);
    expect(res.body.todo.title).toBe("Test Todo");
    todoId = res.body.todo._id;
  });

  it("should get all todos", async () => {
    const res = await request(app).get("/api/todos").set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.todos)).toBe(true);
  });

  it("should update a todo", async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Cookie", cookie)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.todo.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Todo deleted");
  });
});
