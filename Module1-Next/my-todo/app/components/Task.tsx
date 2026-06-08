"use client";

import { deleteTodo, editTodo } from "@/api";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.text);
  const [taskDesc, setTaskDesc] = useState(task.description);

  const handleEdit = async () => {
    if (!taskText.trim()) return;

    await editTodo({
      ...task,
      text: taskText,
      description: taskDesc,
    });

    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setTaskText(task.text);
    setTaskDesc(task.description);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(task.id);
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        ) : (
          task.text
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
        ) : (
          task.description
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                type="button"
                onClick={handleEdit}
                variant="ghost"
                size="icon"
                title="Save"
              >
                <MdCheck size={20} />
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="ghost"
                size="icon"
                title="Cancel"
              >
                <MdClose size={20} />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="icon"
              title="Edit"
            >
              <CiEdit size={20} />
            </Button>
          )}
          <Button
            type="button"
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            title="Delete"
          >
            <MdDeleteOutline size={20} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Task;
