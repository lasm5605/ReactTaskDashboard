import { TaskItem } from './taskitem';

export function TaskList({ tasks, onRemoveTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">Nothing here yet.</p>;
    }
    const listItems = tasks.map((task, index) =>
      <li key={task.id}>
        <TaskItem task={task} index={index} onRemoveTask={onRemoveTask} onUpdateTask={onUpdateTask} />
      </li>
    );

  return (
    <ul class="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onRemoveTask={onRemoveTask}
          onUpdateTask={onUpdateTask}
        />

      ))}
    </ul>
    
  )
}

