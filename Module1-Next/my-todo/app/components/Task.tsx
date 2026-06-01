"use client";

import { deleteTodo, editTodo } from "@/api";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

  const handleEdit = async () => {
    if (!taskText.trim()) return;

    await editTodo({
      ...task,
      text: taskText,
    });

    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setTaskText(task.text);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(task.id);
    router.refresh();
  };

  return (
    <tr className="hover:bg-base-300">
      <td>
        {isEditing ? (
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
        ) : (
          task.text
        )}
      </td>
      <td>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn-ghost btn-sm btn-square tooltip"
                data-tip="Save"
              >
                <MdCheck size={20} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-ghost btn-sm btn-square tooltip"
                data-tip="Cancel"
              >
                <MdClose size={20} />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn btn-ghost btn-sm btn-square tooltip"
              data-tip="Edit"
            >
              <CiEdit size={20} />
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-ghost btn-sm btn-square tooltip"
            data-tip="Delete"
          >
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
