"use client";

import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
import Modal from "./Modal";

const AddTask = () => {
  const router = useRouter();

  const openModal = () => {
    const modal = document.getElementById(
      "my_modal_3",
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const handleSubmitNewTask = async (text: string) => {
    await addTodo({
      id: crypto.randomUUID(),
      text,
    });

    router.refresh();
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary w-full uppercase">
        <MdAdd size={18} />
        Add New Task
      </button>
      <Modal onSubmit={handleSubmitNewTask} />
    </div>
  );
};

export default AddTask;
