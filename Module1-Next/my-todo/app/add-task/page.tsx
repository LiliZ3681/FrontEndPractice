"use client";

import { addTodo } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type AddTaskForm = {
  text: string;
  description: string;
};

export default function AddTaskPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AddTaskForm>();

  const saveTask = async (data: AddTaskForm) => {
    if (!data.text.trim()) return;

    await addTodo({
      text: data.text,
      description: data.description,
    });

    router.push("/");
  };

  return (
    // add task page format
    <main className="w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Add New Task</h1>
        <form onSubmit={handleSubmit(saveTask)} className="flex flex-col gap-4">
          <Input
            {...register("text")}
            type="text"
            placeholder="Type your task"
          />
          <Input
            {...register("description")}
            type="text"
            placeholder="Type task description"
          />
          <div className="flex gap-3">
            <Button className="uppercase" type="submit">
              Save
            </Button>
            <Button asChild>
              <Link href="/" className="uppercase">
                Cancel
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
