import { ITask, NewTask } from "./types/tasks";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("Missing EXPO_PUBLIC_API_URL environment variable");
}

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`);

  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`);
  }
  const todos = await res.json();
  return todos;
};

// export const getTodo = async (id: string): Promise<ITask> => {
//   const res = await fetch(`${baseUrl}/tasks/${id}`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch task: ${res.status}`);
//   }

//   const todo = await res.json();
//   return todo;
// };

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
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error(`Failed to edit task: ${res.status}`);
  }

  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete task: ${res.status}`);
  }
};
