import Tasks from './Components/Tasks.jsx'
import Form from './Components/Form.jsx'
import './index.css'
import { TasksListContext } from './Contexts/tasksList.js'
import { useState, useEffect, useRef } from 'react'

function App() {
  // Ensure tasks always carry string IDs (helps when switching ID strategies)
  const normalizeTasks = (list = []) => list.map((t, idx) => ({
    ...t,
    id: t?.id != null ? String(t.id) : `${Date.now().toString(36)}-${idx}`,
  }));

  // Load tasks from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? normalizeTasks(parsed) : [];
  });
  
  const [editingTaskID, setEditingTaskID] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const alertTimerRef = useRef(null);

  // Persist tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Auto-dismiss alert after 2 seconds
  useEffect(() => {
    if (!alertMessage) return;
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setAlertMessage(null), 2000);
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, [alertMessage]);

  // Show alert message
  const triggerAlert = (msg) => setAlertMessage(msg);

  // Helper: check for duplicate task text (case-insensitive, trimmed)
  const isDuplicateText = (text, excludeId = null) => {
    const candidate = text.trim().toLowerCase();
    return tasks.some(t => (excludeId ? t.id !== excludeId : true) && t.text.trim().toLowerCase() === candidate);
  };

  const addTask = (task) => {
    if (isDuplicateText(task.text)) {
      triggerAlert('Task already exists');
      return;
    }
    setTasks([...tasks, { ...task, text: task.text.trim() }]);
  };
  
  const deleteTask = (taskId) => {
    // Mark as deleting (for transition), then remove
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, deleting: true } : t));
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }, 300);
  };


  const editTask = (taskId, newText) => {
    const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, text: newText } : task));
    setTasks(updatedTasks);
  }





  return (
    <TasksListContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      editTask,
      setTasks,
      editingTaskID,
      setEditingTaskID,
      triggerAlert,
    }}>
    <div className='card-container'>
      {alertMessage && (
        <div className="floating-alert">{alertMessage}</div>
      )}
      <div className='card border-2 border-gray-300'>
        <Form />
        <h3 className="glass-heading text-left font-bold user-select-none mb-0 py-0">Tasks</h3>
        <Tasks />
        
        <footer className="mt-auto pt-3 pb-2 text-center">
          <p className="text-white/60 text-sm user-select-none">
            Made with <span className="text-red-400 animate-pulse">❤️</span> by <span className="text-white/80 font-semibold">Hitesh</span> © {new Date().getFullYear()}
          </p>
        </footer>

      </div>
        
      </div>

    </TasksListContext.Provider>
      
    
  )
}

export default App