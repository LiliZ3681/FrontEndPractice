"use client";

import { editTodo } from "@/api";
import TaskForm from "@/app/components/TaskForm";
import { ITask, TaskFormValues } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface EditTaskFormProps {
  task: ITask;
}

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", task.id] });
    },
  });

  const saveTask = async (data: TaskFormValues) => {
    await editMutation.mutateAsync({
      ...task,
      text: data.text,
      description: data.description,
    });

    router.push("/");
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
