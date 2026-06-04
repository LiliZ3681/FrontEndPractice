// Old dialog version kept for reference.
// The current add flow uses app/add-task/page.tsx instead.
"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ModalProps {
  onSubmit: (text: string) => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ onSubmit }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskText.trim()) return;

    await onSubmit(taskText);
    setTaskText("");

    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className="backdrop:bg-black/50">
      <div className="fixed left-1/2 top-1/2 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
          >
            ✕
          </Button>
        </form>
        <h3 className="font-bold text-lg">Add New Task</h3>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Type your task"
          />
          <Button className="uppercase" type="submit">
            Add
          </Button>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
