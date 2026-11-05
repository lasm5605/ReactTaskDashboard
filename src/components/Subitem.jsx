import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/react/sortable';

export function SubItem({ task, index, onRemoveTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [draftDue, setDraftDue] = useState(task.dueAt || '');
  const { ref, handleRef } = useSortable({ id: task.id, index, group: 'SUBITEMS' });

  function startEditing() {
    setDraft(task.title);
    setDraftDue(task.dueAt || '');
    setIsEditing(true);
  }

  function save() {
    if (draft.trim()) {
      onUpdateTask({ ...task, title: draft.trim(), dueAt: draftDue });
    }
    setIsEditing(false);
  }

  function cancel() {
    setIsEditing(false);
  }

  function toggleDone() {
    onUpdateTask({
      ...task,
      done: !task.done,
      completedAt: !task.done ? Date.now() : null,
    });
  }

  return (
    <li ref={ref} className="task-item">
      {!task.done && (
        <IconButton ref={handleRef} aria-label="Drag to reorder">
          <DragIndicatorIcon />
        </IconButton>
      )}

      {isEditing ? (
        <>
          <IconButton onClick={save} aria-label="Save">
            <SaveIcon />
          </IconButton>
          <IconButton onClick={cancel} aria-label="Cancel">
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <input
            className="task-item__check"
            type="checkbox"
            checked={!!task.done}
            onChange={toggleDone}
            aria-label="Mark task done"
          />
          <div className="task-item__body">
            <p className="task-item__title">{task.title}</p>
          </div>

          {task.done ? (
            <span className="task-item__time">
              <IconButton onClick={() => onRemoveTask(task.id)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </span>
          ) : (
            <div className="task-item__actions">
              <IconButton onClick={startEditing} aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onRemoveTask(task.id)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </>
      )}
    </li>
  );
}