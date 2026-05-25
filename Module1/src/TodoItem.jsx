export function TodoItem({ completed, id, title, deleteTodo, toggleTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button
        // calling the function
        onClick={() => deleteTodo(id)}
        // WRONG: onClick={deleteTodo(todo.id)}
        // pass in the result of deleteTodo
        className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  );
}
