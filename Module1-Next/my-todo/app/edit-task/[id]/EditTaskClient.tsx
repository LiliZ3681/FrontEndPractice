"use client";

import { getTodo } from "@/api";
import EditTaskForm from "./EditTaskForm";
import { useQuery } from "@tanstack/react-query";

interface EditTaskClientProps {
  id: string;
}

export default function EditTaskClient({ id }: EditTaskClientProps) {
  const {
    data: task,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTodo(id),
  });

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        {error instanceof Error ? error.message : "Failed to load task"}
      </p>
    );
  }

  return <EditTaskForm task={task} />;
}
