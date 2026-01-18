import Checkbox from './Checkbox.jsx';
import '../index.css';
import { useTasksList } from '../Contexts/tasksList.js';
import { useState, useRef, useEffect } from 'react';

function Tasks() {
  const { tasks, deleteTask, editTask, setTasks, editingTaskID, setEditingTaskID, triggerAlert } = useTasksList();
  const [expandedId, setExpandedId] = useState(null);
  const [truncatedTasks, setTruncatedTasks] = useState({});
  const textRefs = useRef({});

  // Check duplicates at save time (case-insensitive, trimmed)
  const isDuplicate = (taskId, text) => {
    const normalized = text.trim().toLowerCase();
    return tasks.some(t => t.id !== taskId && t.text.trim().toLowerCase() === normalized);
  };

  // Toggle completed state
  const handleTaskComplete = (taskID) => {
    const updatedTasks = tasks.map(task => (task.id === taskID ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  // Save edits with validation (empty/duplicate checks)
  const handleSave = (task) => {
    const trimmed = task.text.trim();
    if (!trimmed) {
      triggerAlert('Task cannot be empty');
      return;
    }
    if (isDuplicate(task.id, trimmed)) {
      triggerAlert('Task already exists');
      return;
    }
    editTask(task.id, trimmed);
    setEditingTaskID(null);
  };

  // Measure if task text is truncated (or wraps)
  const measureTruncation = () => {
    const newTruncated = {};
    Object.keys(textRefs.current).forEach(taskId => {
      const el = textRefs.current[taskId];
      if (el) {
        newTruncated[taskId] = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      }
    });
    setTruncatedTasks(newTruncated);
  };

  // Recalculate truncation on changes and resize
  useEffect(() => {
    const raf = requestAnimationFrame(measureTruncation);
    window.addEventListener('resize', measureTruncation);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measureTruncation);
    };
  }, [tasks, editingTaskID, expandedId]);

  return (
    <div className="tasks-container">
      {tasks.length === 0 ? (
        <p className="text-white/70 italic mt-2 text-center text-base md:text-lg user-select-none">No tasks available. Please add a task.</p>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className={`mx-1 mb-2 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4
              bg-white/10 backdrop-blur-lg border border-white/20
              rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 relative
              transition-all duration-300 ease-out
              ${task.deleting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
              ${task.deleting ? 'opacity-0 translate-x-4 scale-[0.97]' : 'opacity-100 translate-x-0 scale-100'}
              ${task.deleting ? 'opacity-0 translate-x-4 blur-[1px]' : 'opacity-100 translate-x-0 blur-0'}
            `}
          >
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto sm:max-w-[calc(100%-160px)] pr-24 sm:pr-0">
              <Checkbox id={task.id} name={task.id} onChange={() => handleTaskComplete(task.id)} checked={task.completed} />

              {editingTaskID === task.id ? (
                <input
                  className="ml-2 sm:ml-3 text-white text-base sm:text-lg md:text-xl bg-transparent border-b border-white/50 focus:outline-none focus:border-white/80 w-full overflow-x-auto whitespace-nowrap pr-2"
                  value={task.text}
                  onChange={(e) => editTask(task.id, e.target.value)}
                  disabled={editingTaskID !== task.id}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(task);
                  }}
                />
              ) : (
                // Collapsed: single-line truncate; Expanded: wrapped text
                <div className="ml-2 sm:ml-3 flex items-start gap-2 flex-1 min-w-0">
                  <p
                    ref={(el) => (textRefs.current[task.id] = el)}
                    className={
                      expandedId === task.id
                        ? 'text-white text-base sm:text-lg md:text-xl whitespace-normal break-anywhere user-select-none'
                        : 'text-white text-base sm:text-lg md:text-xl truncate user-select-none'
                    }
                    style={task.completed ? { textDecoration: 'line-through' } : {}}
                  >
                    {task.text}
                  </p>
                </div>
              )}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:static sm:translate-y-0 flex gap-1 sm:gap-3 sm:ml-4 shrink-0 flex-nowrap w-auto items-center">
              {/* Expand/collapse: show if truncated or currently expanded, and not editing */}
              {editingTaskID !== task.id && (truncatedTasks[task.id] || expandedId === task.id) && (
                <button
                  type="button"
                  aria-label={expandedId === task.id ? 'Collapse' : 'Expand'}
                  onClick={() => setExpandedId(prev => (prev === task.id ? null : task.id))}
                  className="text-white/60 hover:text-white transition select-none shrink-0 text-base sm:text-lg"
                >
                  {expandedId === task.id ? '▲' : '▼'}
                </button>
              )}

              {editingTaskID === task.id ? (
                <button
                  onClick={() => handleSave(task)}
                  className="glass-btn glass-btn-green text-sm sm:text-base"
                  style={{ ...(task.completed && { opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }) }}
                >
                  <span className="hidden sm:inline">SAVE</span>
                  <span className="sm:hidden">✓</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditingTaskID(task.id)}
                  className="glass-btn glass-btn-blue text-sm sm:text-base"
                  style={{ ...(task.completed && { opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }) }}
                >
                  <span className="hidden sm:inline">EDIT</span>
                  <span className="sm:hidden">✏️</span>
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="glass-btn glass-btn-red text-sm sm:text-base"
                style={{ ...(task.completed && { opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }) }}
              >
                <span className="hidden sm:inline">DELETE</span>
                <span className="sm:hidden">🗑️</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks