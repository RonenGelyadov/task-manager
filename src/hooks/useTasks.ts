import { useState } from "react";
import type { TaskFields } from "../types/TaskFields";

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskFields[]>(
    JSON.parse(localStorage.getItem("tasks") as string) ?? [],
  );

  const handleAddTask = (task: TaskFields) => {
    const newTasks = [...tasks, { ...task, id: crypto.randomUUID() }];
    setTasks(newTasks);
  };

  const handleEditTask = (task: TaskFields) => {
    const newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  return { tasks, handleAddTask, handleEditTask, handleDeleteTask };
};

export default useTasks;
