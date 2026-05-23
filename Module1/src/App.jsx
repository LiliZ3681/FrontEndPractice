import { useState } from 'react'
import "./styles.css"

// component
function App() {
  const [newItem, setNewItem] = useState("")
  // state cannot change, immutable. change using setNewItem
  const [todos, setTodos] = useState([])

  function handleSubmit(e){
    e.preventDefault()
    // pass in function 
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed:false},
      ]
    })
    
    setNewItem("")
  }

  return (
    // <></>: fragment/empty tag
    // used when return multiple elemetes without add extra HTML tag
    <> 
    {/* avoid conflicts or confusion with JS, where uses class */} 
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className='form-row'>
        <label htmlFor="item">New Item</label>
        <input 
        value = {newItem} 
        // pass in value
        onChange={e => setNewItem(e.target.value)}
        type="text" 
        id="item"
        />
      </div>

      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
    <ul className='list'>
      {todos.map(todo => {
        return(
          <li>
            <label>
              <input type="checkbox" checked={todo.completed}/>
              {todo.title}
            </label>
            <button className='btn btn-danger'>Delete</button>
          </li>

        )
      })}
      
    </ul>


    </>
  )
}

export default App
