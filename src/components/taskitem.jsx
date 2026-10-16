import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';


export function TaskItem({ task, onRemoveTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title, task);

  function startEditing() {
    setDraft(task.title);
    setIsEditing(true);
  }

  function save() {
    if (draft.trim()) {
      onUpdateTask({ ...task, title: draft.trim() });
    }
    setIsEditing(false);
  }

  function cancel() {
    setIsEditing(false);
  }

  function toggleDone() {
    onUpdateTask({ ...task, done: !task.done });
}

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />

          <IconButton onClick={save} aria-label="Save">
            <SaveIcon />
          </IconButton>

          <IconButton onClick={cancel} aria-label="Cancel">
            <CancelIcon />
          </IconButton>
        </>

      ) : (
        <>
            <Checkbox checked={!!task.done} onChange={toggleDone} aria-label="Mark task done" />
            {task.title}
     

          <IconButton onClick={startEditing} aria-label="Edit">
            <EditIcon />
          </IconButton>
          
          <IconButton onClick={() => onRemoveTask(task.id)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </li>
  );
}