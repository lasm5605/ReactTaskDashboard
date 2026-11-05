import { useState } from 'react'
import logo from './assets/logoTDTD.png'
import './App.css'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { FilterTabs } from './components/FilterTabs'
import DynamicDate from './components/Date';
import { useLocalStorage } from './SaveLocally'
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';



function App() {

  /* establish states that app.jsx holds */
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("filter", "todo");


  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function updateTask(updatedTask) {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  function addTask(newTask) {
    setTasks([...tasks, newTask])
  }

  function getGreeting(tasks) {
    const allDone = tasks.length > 0 && tasks.every((t) => t.done);
    if (allDone) return 'Ta Da! All done.';

    const hour = new Date().getHours();
    if (hour < 12) return 'Coffee first, then Ta Das.';
    if (hour < 17) return 'Time for some Ta Das.';
    return 'A few more Ta Das before bed?';
  }

  const visibleTasks = tasks.filter((task) =>
    filter === 'completed' ? task.done : !task.done
  );

  const latestTaDas = tasks
    .filter((task) => task.done && task.completedAt) /* keeps only completed tasks that have a timestamp */
    .sort((a, b) => b.completedAt - a.completedAt) /* puts the most recently completed first (bigger timestamp = later) */
    .slice(0, 5); /* keeps the latest five */

  function formatTime(ms) {
    return new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function handleDragEnd(event) {
    if (event.canceled) return;

      // reorder only the tasks currently visible
      const reordered = move(visibleTasks, event);
      const visibleIds = new Set(visibleTasks.map((task) => task.id));

      // put them back into the same slots in the full list
      let next = 0;
      setTasks(tasks.map((task) => (visibleIds.has(task.id) ? reordered[next++] : task)));
  }



  return (

    <>

      <section>
        <header className="app-header">
        <a className="logo" href="/" aria-label="To Do Ta Da">
          <img src={logo} className="base" width="150" height="auto" alt="TO DO TA DA" />
        </a>

        <button className="avatar" type="button" aria-label="Account">LS</button>
        </header>

        <main className="page">
          <DynamicDate />
          <h1 className="page__title">{getGreeting(tasks)}</h1>
          <div className="layout"></div>
        </main>
      </section>

      <div className="flex-container">
        <div className="column">
          <TaskForm onAddTask={addTask} />
          <section id="center">
            <div className="task-card">
              <div className="task-card__toolbar"id="center">
                <div className="tabs" role="tablist">
                  <FilterTabs filter={filter} onFilterChange={setFilter} />
                </div>
              </div>
              <DragDropProvider onDragEnd={handleDragEnd}>
                <TaskList tasks={visibleTasks} onRemoveTask={removeTask} onUpdateTask={updateTask} />
              </DragDropProvider>
              <div className="task-card__footer">
                <span>Check it off. Make it a ta da.</span>
              </div>
        </div> 
      </section>
 
      <p className="save-status">All changes saved</p>

        </div>

        <div className="column">
          <aside className="sidebar">
            <div className="motivation">
              <svg className="motivation__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 4l1.6 4.4L15 10l-4.4 1.6L9 16l-1.6-4.4L3 10l4.4-1.6L9 4z" />
                <path d="M18 3v4M16 5h4M18 15v4M16 17h4" />
              </svg>
              <p className="motivation__title">Look at you go.</p>
              <p className="motivation__text">A clear list. A clearer head.</p>
            </div>

            <div className="latest">
              <div className="latest__header">
                <h2 className="latest__title">Latest ta das</h2>
              </div>

              <ul className="latest__list">
                {latestTaDas.map((task) => (
                  <li className="latest__item" key={task.id}>
                    <span className="latest__check">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                    </span>
                    <div>
                      <span className="latest__name">{task.title}</span>
                      <span className="latest__time">{formatTime(task.completedAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </aside>
        </div>
      </div>
    </>
    
  )
}

export default App