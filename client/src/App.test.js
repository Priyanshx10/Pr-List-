import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./services/api", () => ({
  getTodos: jest.fn(() =>
    Promise.resolve([
      { _id: "1", text: "Test Todo 1", completed: false },
      { _id: "2", text: "Test Todo 2", completed: true },
    ])
  ),
  createTodo: jest.fn((todo) => Promise.resolve({ _id: "3", ...todo })),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders todos", async () => {
    expect(await screen.findByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(await screen.findByText("New Todo")).toBeInTheDocument();
  });
});
