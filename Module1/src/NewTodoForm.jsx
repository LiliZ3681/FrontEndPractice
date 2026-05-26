import { useState } from "react";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  // state cannot change, immutable. change using setNewItem
  function handleSubmit(e) {
    e.preventDefault();
    // pass in function
    // setTodos((currentTodos) => {
    //   return [
    //     ...currentTodos,
    //     { id: crypto.randomUUID(), title: newItem, completed: false },
    //   ];
    // });
    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }
  return (
    // avoid conflicts or confusion with JS, where uses class *
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          // pass in value
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>

      <button className="btn">Add</button>
    </form>
  );
}
