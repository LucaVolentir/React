import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
const LOCAL_STORAGE_KEY = 'todoApp.todos' 
function App() {

  const[todos, setTodos] = useState([{}])
  const todoNameRef = useRef ()
  const [id, incrementId] = useState(0)

  useEffect (() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (e) {

    const name = todoNameRef.current.value

    if (name === '') return
    
    setTodos(prevTodos => {
      return [...prevTodos, {id:id, name: name, complete: false}]
    })
    incrementId(id + 1)
    todoNameRef.current.value = null
  }

  function clearTodos (){
    setTodos([])
  }

  return (
    <>
    <TodoList todoList={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type='"text' />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={clearTodos}> Clear completed Todos</button>
    <div>{todos.filter(todo => !todo.complte).lenght} left to do</div>
    </>
  )
}

export default App;
