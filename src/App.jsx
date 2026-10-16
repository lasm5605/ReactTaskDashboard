import { useState } from 'react'
import logo from './assets/logoTDTD.png'
import './App.css'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { FilterTabs } from './components/FilterTabs'

function App() {
  const [tasks, setTasks] = useState([{ id: 1, title: "Test task" }]) /* tasks is a state variable and setTasks is the setter function */
  const [filter, setFilter] = useState('todo') /* "The [ and ] syntax here is called array destructuring and it lets you read values from an array. The array returned by useState always has exactly two items." -from React documentation 'Sate: A Component's Memory' */

  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function updateTask(updatedTask) {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  function addTask(newTask) {
    setTasks([...tasks, newTask])
  }

  const visibleTasks = tasks.filter((task) =>
    filter === 'completed' ? task.done : !task.done
)


  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={logo} className="base" width="170" height="179" alt="TO DO TA DA" />
        </div>
      </section>
      
      <section id="center">
        <div className="tabs">
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </div>
      </section>
      
      <TaskList tasks={visibleTasks} onRemoveTask={removeTask} onUpdateTask={updateTask} />
      <TaskForm onAddTask={addTask} />
    </>
  )
}

export default App