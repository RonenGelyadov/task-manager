import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import ROUTES from "../router/routs";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") as string) ?? [],
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
  };

  const handleEditTask = (task: Task) => {
    const newTasks: Task[] = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  const handleDeleteTask = (id: string, returnHome: boolean = false) => {
    if (confirm("האם אתה בטוח שברצונך למחוק את המשימה ?")) {
      const newTasks: Task[] = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
      if (returnHome) navigate(ROUTES.HOME);
    }
  };

  const findTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    return task;
  };

  return { tasks, handleAddTask, handleEditTask, handleDeleteTask, findTask };
};

export default useTasks;
