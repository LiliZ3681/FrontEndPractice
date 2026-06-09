"use client";

import { addTodo } from "@/api";
import TaskForm from "@/app/components/TaskForm";
import { TaskFormValues } from "@/types/tasks";
import { useRouter } from "next/navigation";

export default function AddTaskPage() {
  const router = useRouter();

  const saveTask = async (data: TaskFormValues) => {
    await addTodo({
      text: data.text,
      description: data.description,
    });

    router.push("/");
  };

  return (
    <main className="w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Add New Task</h1>
        <TaskForm onSave={saveTask} />
      </div>
    </main>
  );
}
