import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api/todos";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post("/", todo);
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await api.put(`/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/${id}`);
};
