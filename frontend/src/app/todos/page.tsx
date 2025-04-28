"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { io } from "socket.io-client";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

export default function Page() {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const socket = io(BACKEND_URI, {
      withCredentials: true,
      transports: ["websocket"]
    });

    socket.on('todoCreated', (newTodo: Todo) => {
      setTodos((prev) => [...prev, { ...newTodo, id: newTodo._id! }]);
    });

    socket.on('todoUpdated', (updatedTodo: Todo) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === updatedTodo._id
            ? { ...updatedTodo, id: updatedTodo._id }
            : todo
        )
      );
    });

    socket.on('todoDeleted', (deletedTodoId: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== deletedTodoId));
    });

    updateTodos();

    return () => {
      socket.disconnect();
    };
  }, []);

  function changeTodoTitle(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTodo((prev) => ({ ...prev, title: value }));
  }

  function changeTodoDesc(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTodo((prev) => ({ ...prev, description: value }));
  }

  async function createTodo() {
    await axios.post(`${BACKEND_URI}/api/todos`, todo, {
      withCredentials: true,
    });
    setTodo({ id: "", title: "", description: "", completed: false });
  }

  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && todo.title.length + todo.description.length > 0) {
      await createTodo();
    }
  }

  async function updateTodos() {
    const { data }: { data: { todos: Todo[] } } = await axios.get(
      `${BACKEND_URI}/api/todos`,
      {
        withCredentials: true,
      }
    );
    if (Array.isArray(data.todos)) {
      setTodos(
        data.todos.map((todo) => ({
          id: todo._id!,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        }))
      );
    } else {
      setTodos([]);
    }
  }

  async function deleteTodo({ id }: Pick<Todo, "id">) {
    try {
      await axios.delete(`${BACKEND_URI}/api/todos/${id}`, {
        withCredentials: true,
      });
    } catch (error) {}
  }

  async function updateTodo({
    id,
    title,
    description,
    completed,
  }: Pick<Todo, "id" | "title" | "description" | "completed">) {
    try {
      await axios.put(
        `${BACKEND_URI}/api/todos/${id}`,
        {
          title,
          description,
          completed,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  }

  return (
    <div className="p-4 space-y-4 [&_*]:focus:outline-0">
      <div className="mx-auto w-fit border border-black flex flex-col space-y-1">
        <input
          id="title"
          value={todo.title}
          onChange={changeTodoTitle}
          onKeyDown={handleKeyPress}
          placeholder="Add your todo"
          className="mx-2 mt-2 focus:outline-0"
        />
        <input
          id="description"
          value={todo.description}
          onChange={changeTodoDesc}
          onKeyDown={handleKeyPress}
          placeholder="Description"
          className="mx-2 mb-2 text-xs focus:outline-0"
        />
        <button
          onClick={createTodo}
          className="bg-black text-white px-2 focus:bg-zinc-800 hover:bg-zinc-800"
        >
          Add
        </button>
      </div>
      <div>
        <p className="text-xl mb-2">Todos</p>
        <div className="border-t border-black">
          {todos.length ? (
            todos.map((todo, idx) => (
              <TodoItem key={idx} {...{ todo, deleteTodo, updateTodo }} />
            ))
          ) : (
            <div className="text-zinc-600">No Todo found</div>
          )}
        </div>
      </div>
    </div>
  );
}
