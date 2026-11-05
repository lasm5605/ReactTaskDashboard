import { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueInput, setDueInput] = useState('');
  const dueRef = useRef(null);

  function openPicker() {
    try {
      dueRef.current.showPicker();
    } catch {
      dueRef.current.focus();   // fallback for older browsers
    }
  }

  const dueText = dueInput
    ? new Date(dueInput).toLocaleString([], {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      })
    : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        id: Date.now(),
        title: title.trim(),
        done: false,
        completedAt: null,
        dueAt: dueInput,
      });
      setTitle('');
      setDueInput('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
    <input
      className="task-form__input"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="What do you need to do?"
      aria-label="New task"
    />

    <span className="task-form__cal-wrap">
      <IconButton
        type="button"
        className={dueInput ? 'task-form__cal--set' : ''}
        onClick={openPicker}
        aria-label="Set due date and time"
      >
        <CalendarMonthIcon />
      </IconButton>
      <input
        ref={dueRef}
        className="task-form__due-hidden"
        type="datetime-local"
        value={dueInput}
        onChange={(e) => setDueInput(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </span>

    <button className="btn-primary" type="submit">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
      Add task
    </button>

    {dueInput && (
      <span className="task-form__due-chip">
        Due {dueText}
        <button type="button" onClick={() => setDueInput('')} aria-label="Clear due date">✕</button>
      </span>
    )}
  </form>
);
}