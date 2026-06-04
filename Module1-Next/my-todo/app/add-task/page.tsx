"use client";

import { addTodo } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddTaskPage() {
  const router = useRouter();
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskText.trim()) return;

    await addTodo({
      text: taskText,
    });

    router.push("/");
  };

  return (
    // add task page format
    <main className="w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Add New Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Type your task"
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
