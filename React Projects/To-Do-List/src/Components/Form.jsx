import '../index.css';
import { useTasksList } from '../Contexts/tasksList.js';
import { useState } from 'react';

function Form() {
  // Access list actions and alert helper
  const { addTask, triggerAlert } = useTasksList();
  const [newTaskText, setNewTaskText] = useState('');

  // Generate ID: use crypto.randomUUID when available; fallback to timestamp + random
  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    return `${ts}-${rand}`;
  };

  // Add a new task (validates empty input)
  const handleAddTask = () => {
    if (newTaskText.trim() === '') {
      triggerAlert('Task cannot be empty');
      return;
    }

    const trimmed = newTaskText.trim();

    const newTask = {
      id: generateId(),
      text: trimmed,
      completed: false,
      deleting: false,
    };

    setNewTaskText('');
    addTask(newTask);
  };

  


  return (
    <div className="w-full mx-auto py-2 px-1 mb-2">
        <h1 className="glass-heading user-select-none text-center font-bold mb-2" style={{ fontSize: 'clamp(2.25rem, 7.5vw, 2.25rem)' }}>Manage Your Tasks</h1>
        <div className="m-0 flex items-center justify-between overflow-hidden transition-all user-select-none focus-within:shadow-2xl mt-2 bg-white/10 backdrop-blur-lg border border-white/20"
             style={{ borderRadius: '12px' }}>
    
    {/* Task input */}
    <input 
      type="text"
      placeholder="Enter new task"
      value={newTaskText}
      onChange={(e) => setNewTaskText(e.target.value)}
      className="
        outline-none bg-transparent w-full
        px-4 py-2
        text-white placeholder-white/60
        text-base md:text-lg
      "
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleAddTask();
        }
      }}
    />
    
    {/* Add button */}
    <button
      className="
        font-semibold text-white
        transition-colors duration-300 cursor-pointer
        user-select-none
        px-6 py-3
        bg-green-500 hover:bg-green-600 active:bg-green-700
        no-focus-outline
      "
      style={{ borderRadius: '0 12px 12px 0' }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => handleAddTask()}>
      
      Add
    </button>
</div>

        
    </div>
  )
}

export default Form