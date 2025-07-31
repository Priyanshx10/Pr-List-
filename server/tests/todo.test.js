const request = require("supertest");
const app = require("../app");
const Todo = require("../models/Todo");

describe("Todo API", () => {
  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ text: "Test Todo" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("text", "Test Todo");
    expect(res.body).toHaveProperty("completed", false);
  });

  it("should get all todos", async () => {
    await Todo.create([{ text: "Todo 1" }, { text: "Todo 2" }]);

    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it("should update a todo", async () => {
    const todo = await Todo.create({ text: "Original Todo" });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ text: "Updated Todo", completed: true });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("text", "Updated Todo");
    expect(res.body).toHaveProperty("completed", true);
  });

  it("should delete a todo", async () => {
    const todo = await Todo.create({ text: "Todo to delete" });

    const res = await request(app).delete(`/api/todos/${todo._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Todo deleted successfully");
  });
});
