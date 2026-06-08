"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskFormValues } from "@/types/tasks";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface TaskFormProps {
  defaultValues?: TaskFormValues;
  onSave: (data: TaskFormValues) => Promise<void>;
}

export default function TaskForm({ defaultValues, onSave }: TaskFormProps) {
  const { register, handleSubmit } = useForm<TaskFormValues>({
    defaultValues,
  });

  const handleValidSubmit = async (data: TaskFormValues) => {
    if (!data.text.trim()) return;

    await onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="flex flex-col gap-4"
    >
      <Input {...register("text")} type="text" placeholder="Type your task" />
      <Textarea
        {...register("description")}
        placeholder="Type task description"
      />
      <div className="flex gap-3">
        <Button className="uppercase" type="submit">
          Save
        </Button>
        <Button asChild variant="ghost">
          <Link href="/" className="uppercase">
            Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
