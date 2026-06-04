import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

const AddTask = () => {
  return (
    <div>
      {/* direct to add page */}
      <Button asChild>
        <Link href="/add-task" className="w-full uppercase">
          <MdAdd size={18} />
          Add New Task
        </Link>
      </Button>
    </div>
  );
};

export default AddTask;
