import React, { useState } from 'react';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ id: Date.now(), title: title.trim(), done: false });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
