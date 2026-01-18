import { createContext, useContext } from "react";

export const TasksListContext = createContext({
    tasks: [],
    addTask: (task) => {},
    deleteTask: (taskId) => {},
    editTask: (taskId, newText) => {},
    editingTaskID: 0,
}
    
);

export const useTasksList = () => {
  return useContext(TasksListContext);
};