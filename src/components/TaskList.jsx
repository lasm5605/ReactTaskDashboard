import { TaskItem } from './taskitem';
import { SunnyWindow } from './SunnyWindow';

export function TaskList({ tasks, onRemoveTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty">
        <span>
          <SunnyWindow />
        </span>
        <p className="task-empty__title">All clear.</p>
        <p className="task-empty__subtitle">Add something, or go enjoy the quiet.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
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
  );
}