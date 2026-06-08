import { getTodo } from "@/api";
import EditTaskForm from "./EditTaskForm";

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const task = await getTodo(id);

  return (
    <main className="w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Edit Task</h1>
        <EditTaskForm task={task} />
      </div>
    </main>
  );
}
