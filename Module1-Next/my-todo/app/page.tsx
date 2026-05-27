import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";


export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks)

  return (
    // Tailwind ailwind uses utility classes
    // ready-made class names: each class means one CSS rule
    <main className = "w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask/>
      </div>
      <TodoList tasks = {tasks}/>
    </main>
  );
}
