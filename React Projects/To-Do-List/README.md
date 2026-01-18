# To Do List (React + Vite)

Simple, responsive to-do list with localStorage persistence, duplicate protection, alerts for invalid input, and expandable tasks. Built with React and Vite.

## Features
- Add, edit, delete tasks; completion toggle with strike-through
- LocalStorage persistence (reload-safe)
- Duplicate text prevention (case-insensitive, trimmed)
- Red floating alert for empty/duplicate edits/adds (auto-dismiss)
- Expand/collapse long tasks with truncation detection
- Responsive layout (clamp-based typography/spacing) and mobile-friendly emoji actions
- Scrollable task list sized for about 7 tasks; hidden scrollbars

## Project Structure
- `src/App.jsx`: state, context provider, alerts, persistence
- `src/Components/Form.jsx`: input and add button
- `src/Components/Tasks.jsx`: list, edit/expand controls, delete
- `src/Components/Checkbox.jsx`: checkbox UI
- `src/Contexts/tasksList.js`: context wiring
- `src/index.css`: theme, responsive tokens, glass styles

## Getting Started
```bash
# install deps
npm install

# dev server
npm run dev

# build
npm run build

# preview production build
npm run preview
```

## Usage Notes
- Long text: click the ▼/▲ icon to expand or collapse
- Mobile: edit/save/delete appear as emojis; buttons sit on the right
- Alerts: shown for empty or duplicate text when adding or saving edits
- Persistence: tasks are saved automatically to `localStorage`

## Customization Tips
- Adjust task viewport height in `src/index.css` (`.tasks-container max-height`) to change how many tasks show before scrolling.
- Tweak clamp tokens in `:root` within `src/index.css` to change responsive sizing.
