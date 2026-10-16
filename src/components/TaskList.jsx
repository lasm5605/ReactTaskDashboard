import { TaskItem } from './taskitem';

export function TaskList({ tasks, onRemoveTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p>Nothing here yet.</p>;
    }
    const listItems = tasks.map(task =>
      <li key={task.id}>
        <TaskItem task={task} onRemoveTask={onRemoveTask} onUpdateTask={onUpdateTask} />
      </li>
    );

  return <ul style={{ listStyle: 'none', padding: 0 }}>{listItems}</ul>;
}

