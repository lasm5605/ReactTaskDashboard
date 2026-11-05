import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/react/sortable';
import { SubItem } from './Subitem';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function TaskItem({ task, index, onRemoveTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [draftDue, setDraftDue] = useState(task.dueAt || '');
  const { ref, handleRef } = useSortable({ id: task.id, index });
  const [newSub, setNewSub] = useState('');
  const subItems = task.subItems || [];
  const [expanded, setExpanded] = useState(false);

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

  function addSubItem(e) {
  e.preventDefault();
  if (!newSub.trim()) return;
  onUpdateTask({
    ...task,
    subItems: [...subItems, { id: crypto.randomUUID(), title: newSub.trim(), done: false }],
  });
  setNewSub('');
}

function updateSubItem(updated) {
  onUpdateTask({
    ...task,
    subItems: subItems.map((s) => (s.id === updated.id ? updated : s)),
  });
}

function removeSubItem(id) {
  onUpdateTask({ ...task, subItems: subItems.filter((s) => s.id !== id) });
}

  const completedTime = task.completedAt
    ? new Date(task.completedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : '';

  const overdue = !task.done && task.dueAt && new Date(task.dueAt) < new Date();

  const dueText = task.dueAt
    ? new Date(task.dueAt).toLocaleString([], {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      })
    : '';

  return (
    
    <li ref={ref} className="task-item">
      {!task.done && (
        <IconButton ref={handleRef} aria-label="Drag to reorder">
          <DragIndicatorIcon />
        </IconButton>
      )}

      {isEditing ? (
        <>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
          <input
            type="datetime-local"
            value={draftDue}
            onChange={(e) => setDraftDue(e.target.value)}
            aria-label="Due date and time"
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
          <input
            className="task-item__check"
            type="checkbox"
            checked={!!task.done}
            onChange={toggleDone}
            aria-label="Mark task done"
          />
          <IconButton
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? 'Hide subitems' : 'Show subitems'}
            aria-expanded={expanded}
            size="small"
          >
            <ExpandMoreIcon className={`expand-icon ${expanded ? 'expand-icon--open' : ''}`} />
          </IconButton>
          <div className="task-item__body">
            <p className="task-item__title">{task.title}</p>
            {task.dueAt && !task.done && (
              <span className={`task-item__due ${overdue ? 'task-item__due--overdue' : ''}`}>
                <ScheduleIcon fontSize="inherit" />
                {overdue ? 'Overdue · ' : 'Due '}
                {dueText}
              </span>
            )}
          </div>

          {task.done ? (
            <span className="task-item__time">
              {completedTime}
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
          <Collapse in={expanded} timeout="auto" unmountOnExit className="subitem-dropdown">
            <ul className="subitem-list">
              {subItems.map((sub, i) => (
                <SubItem
                  key={sub.id}
                  task={sub}
                  index={i}
                  group={task.id}
                  onRemoveTask={removeSubItem}
                  onUpdateTask={updateSubItem}
                />
              ))}
            </ul>

            <form onSubmit={addSubItem} className="subitem-form">
              <input
                value={newSub}
                onChange={(e) => setNewSub(e.target.value)}
                placeholder="Add a subitem…"
              />
            </form>
          </Collapse>
        </>
      )}
    </li>
  );
}