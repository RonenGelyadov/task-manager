import { useState } from "react";
import type { Task } from "../types/Task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") as string) ?? [],
  );

  const handleAddTask = (task: Task) => {
    const newTasks: Task[] = [
      ...tasks,
      {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
      },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEditTask = (task: Task) => {
    const newTasks: Task[] = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (id: string) => {
    const newTasks: Task[] = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const findTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    return task;
  };

  return { tasks, handleAddTask, handleEditTask, handleDeleteTask, findTask };
};

export default useTasks;
