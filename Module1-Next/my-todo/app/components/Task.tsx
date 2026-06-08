"use client";

import { deleteTodo } from "@/api";
import { ITask } from "@/types/tasks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(task.id);
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell>{task.text}</TableCell>
      <TableCell className="whitespace-pre-wrap">{task.description}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" title="Edit">
            <Link href={`/edit-task/${task.id}`}>
              <CiEdit size={20} />
            </Link>
          </Button>
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
