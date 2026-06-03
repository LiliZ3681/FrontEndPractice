import { ITask, NewTask } from "./types/tasks";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

export const getAllTodos = async (): Promise<ITask[]> => {
  // Always get fresh data from the server.
  // Do not use a cached old response.
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  // add error check
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`);
  }
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: NewTask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error(`Failed to add task: ${res.status}`);
  }

  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: todo.text }),
  });

  if (!res.ok) {
    throw new Error(`Failed to edit task: ${res.status}`);
  }

  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete task: ${res.status}`);
  }
};
