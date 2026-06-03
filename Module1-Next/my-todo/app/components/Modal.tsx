// Old dialog version kept for reference.
// The current add flow uses app/add-task/page.tsx instead.
"use client";

import React, { useRef, useState } from "react";

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
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add New Task</h3>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Type your task"
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary uppercase" type="submit">
            Add
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
