"use client";

import { addTodo } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddTaskPage() {
  const router = useRouter();
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskText.trim()) return;

    await addTodo({
      id: crypto.randomUUID(),
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
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Type your task"
            className="input input-bordered w-full"
          />
          <div className="flex gap-3">
            <button className="btn btn-primary uppercase" type="submit">
              Save
            </button>
            <Link href="/" className="btn btn-ghost uppercase">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
