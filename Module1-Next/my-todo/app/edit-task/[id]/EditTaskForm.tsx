"use client";

import { editTodo } from "@/api";
import TaskForm from "@/app/components/TaskForm";
import { ITask, TaskFormValues } from "@/types/tasks";
import { useRouter } from "next/navigation";

interface EditTaskFormProps {
  task: ITask;
}

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter();

  const saveTask = async (data: TaskFormValues) => {
    await editTodo({
      ...task,
      text: data.text,
      description: data.description,
    });

    router.push("/");
    router.refresh();
  };

  return (
    <TaskForm
      defaultValues={{
        text: task.text,
        description: task.description,
      }}
      onSave={saveTask}
    />
  );
}
