# To Do Ta Da

A task dashboard for planning your day and checking things off. Add what you need to get done, break bigger tasks into subitems, and watch your to-dos turn into ta-das.

**👉 Use it now: [leafy-capybara-0d6161.netlify.app](https://leafy-capybara-0d6161.netlify.app)**

## Features

- **Add tasks** with an optional due date and time
- **Edit and delete** tasks
- **Check tasks off.** Completed tasks record the time they were finished.
- **Overdue warnings** for unfinished tasks that are past their due date
- **Subitems:** break a task into smaller steps in a collapsible dropdown under the task, and check, edit or delete each one
- **Drag to reorder** unfinished tasks
- **To Do / Ta Da tabs** to switch between unfinished and completed tasks
- **Latest ta-das** sidebar listing recently completed tasks and when they were finished
- **Time-of-day greetings** that change for morning, afternoon, evening and late night, plus a celebration when everything is done
- **Saved automatically** in your browser, so your list is still there when you come back

## Built with

- [React](https://react.dev/): UI components and state
- [Vite](https://vite.dev/): development server and production build
- [MUI](https://mui.com/): icons, buttons and the collapse animation for subitems
- [dnd-kit](https://dndkit.com/) (`@dnd-kit/react`): drag-and-drop reordering
- Plain CSS with custom properties (design tokens) for colors, spacing and type
- `localStorage`: saves tasks in the browser, no backend needed

## How it works

### Data

Each task is a plain object:

```js
{
  id: "…",              // unique id
  title: "Grocery shopping",
  done: false,
  dueAt: "2026-11-05T17:00",   // optional, from a datetime-local input
  completedAt: null,           // timestamp set when the task is checked off
  subItems: [
    { id: "…", title: "Milk", done: false }
  ]
}
```

`App.jsx` holds the list of tasks in state and passes it down along with functions to add, update and remove tasks. The state is synced to `localStorage`, so every change is saved automatically.

### Components

The app's own files are in `src/`:

| File | What it does |
|---|---|
| `main.jsx` | Entry point that mounts the app |
| `App.jsx` | Holds the task state, the add/update/remove functions, and the page layout (header, greeting, task area, sidebar) |
| `App.css` | All styles, including the color and spacing tokens at the top |
| `components/TaskForm.jsx` | The "What would you like to get done?" bar with the due-date picker and Add task button |
| `components/FilterTabs.jsx` | The To Do / Ta Da tabs |
| `components/TaskList.jsx` | Renders the list of tasks, or an empty message when there are none |
| `components/taskitem.jsx` | A single task: checkbox, title, due date, edit/delete buttons, drag handle and subitem dropdown |
| `components/Subitem.jsx` | A single subitem inside a task |
| `components/SaveLocally.jsx` | Saving and loading tasks from `localStorage` |
| `components/Date.jsx` | The current date and time shown above the greeting |

### Subitems

Subitems are stored inside their parent task's `subItems` array. Adding, editing or removing a subitem creates an updated copy of the parent task and passes it to the same `onUpdateTask` function used for tasks. Each task's subitems use their own drag-and-drop group, so they can't be dragged into the main list.

### Saving

Tasks are saved in the browser's `localStorage`. Each person who uses the app has their own private list on their own device. Lists don't sync between devices, and clearing browser data erases them.

## Running it locally
 
You only need this to work on the code. To just use the app, open the [live site](https://leafy-capybara-0d6161.netlify.app).
 
You'll need [Node.js](https://nodejs.org/) installed.
 
```bash
# install dependencies
npm install
 
# start the development server
npm run dev
```
 
Then open the local address Vite prints, usually http://localhost:5173.
 
### Other scripts
 
```bash
npm run build     # build the production version into dist/
npm run preview   # serve the built version locally to check it
npm run lint      # check the code with ESLint
```
 
## Deploying
 
The live app is hosted on Netlify at **https://leafy-capybara-0d6161.netlify.app**.
 
Netlify builds the site with these settings:
 
- Build command: `npm run build`
- Output directory: `dist`
The app is fully static, with no server or database, so the built `dist/` folder could also be hosted on any other static host, such as Vercel or GitHub Pages.

## Ideas for later

- Progress ring showing how many of today's tasks are done
- Dark mode/seasonal themes options
- Accounts and a backend so lists sync across devices
