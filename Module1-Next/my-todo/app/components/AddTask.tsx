import Link from "next/link";
import { MdAdd } from "react-icons/md";

const AddTask = () => {
  return (
    <div>
      {/* direct to add page */}
      <Link href="/add-task" className="btn btn-primary w-full uppercase">
        <MdAdd size={18} />
        Add New Task
      </Link>
    </div>
  );
};

export default AddTask;
