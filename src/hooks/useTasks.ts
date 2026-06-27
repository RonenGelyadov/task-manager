import { useState } from "react";
import type { Task } from "../types/Task";
import {
  addNewTask,
  deleteTaskById,
  findTaskById,
  getTasksData,
} from "../services/tasksFirebaseService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routs";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const savedTasks = await getTasksData();
      setTasks(savedTasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async (task: Task, userId: string) => {
    const newTaskData: Task = {
      ...task,
      createdAt: new Date().toLocaleString("he-IL"),
      isCompleted: false,
      userId,
    };

    try {
      const newId = await addNewTask(newTaskData);

      const newTask: Task = {
        ...newTaskData,
        id: newId,
      };

      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (task: Task) => {
    const newTasks: Task[] = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק את המשימה ?")) {
      const isDeleted = await deleteTaskById(id);
      if (isDeleted) {
        navigate(ROUTES.HOME);
      }
    }
  };

  const findTask = async (id: string) => {
    const task = await findTaskById(id);
    return task;
  };

  return { tasks, getTasks, handleAddTask, handleEditTask, handleDeleteTask, findTask };
};

export default useTasks;
