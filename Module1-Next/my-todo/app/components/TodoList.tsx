"use client";

import { getAllTodos } from "@/api";
import Task from "./Task";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const {
    data: tasks = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTodos,
  });

  return (
    <div className="flex flex-col gap-3">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Tasks</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isPending && (
            <TableRow>
              <TableCell colSpan={3} className="text-sm text-muted-foreground">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {isError && (
            <TableRow>
              <TableCell colSpan={3} className="text-sm text-destructive">
                {error instanceof Error
                  ? error.message
                  : "Failed to load tasks"}
              </TableCell>
            </TableRow>
          )}

          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
