import { useState } from 'react';
import type { Task } from '../types/Task';
import {
  addNewTask,
  deleteTaskById,
  editTask,
  findTaskById,
  getTasksData,
} from '../services/tasksFirebaseService';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routs';

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

  const findTask = async (id: string) => {
    const task = await findTaskById(id);
    return task;
  };

  const handleAddTask = async (taskData: Task, userId: string) => {
    const newTaskData: Task = {
      ...taskData,
      createdAt: new Date().toLocaleString('he-IL'),
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

  const handleEditTask = async (taskData: Task, userId: string) => {
    if (taskData.userId !== userId) return;

    try {
      const task = await findTask(taskData.id);
      const updatedTask: Task = {
        ...task,
        ...taskData,
      };

      const editSuccess = await editTask(updatedTask);
      if (editSuccess) {
        const newTasks: Task[] = tasks.map((t) => (t.id === taskData.id ? taskData : t));
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את המשימה ?')) {
      const isDeleted = await deleteTaskById(id);
      if (isDeleted) {
        navigate(ROUTES.HOME);
      }
    }
  };

  const moveTask = (taskId: string, newColumnId: string) => {
    // Optimistic update — move the task in local state immediately
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, columnId: newColumnId } : t)),
    );

    // Background Firebase sync — fire and forget
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      editTask({ ...task, columnId: newColumnId }).catch((err) =>
        console.error('Failed to sync task move to Firebase:', err),
      );
    }
  };

  return { tasks, getTasks, handleAddTask, handleEditTask, handleDeleteTask, findTask, moveTask };
};

export default useTasks;
