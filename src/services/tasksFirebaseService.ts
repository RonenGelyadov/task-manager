import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Task } from '../types/Task';

const tasksCollectionName = 'tasks';
const tasksCollection = collection(db, tasksCollectionName);

export const getTasksData = async (): Promise<Task[]> => {
  try {
    const querySnapshot = await getDocs(tasksCollection);

    const tasks: Task[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Task,
    );

    return tasks;
  } catch (error) {
    console.error('Error getting tasks: ', error);
    throw error;
  }
};

export const addNewTask = async (data: Task): Promise<string> => {
  try {
    const newDoc = await addDoc(tasksCollection, data);
    return newDoc.id;
  } catch (error) {
    console.error('Error adding task: ', error);
    throw error;
  }
};

export const findTaskById = async (id: string): Promise<Task> => {
  try {
    const teskDocRef = doc(db, tasksCollectionName, id);
    const foundTask = await getDoc(teskDocRef);
    return { id: foundTask.id, ...foundTask.data() } as Task;
  } catch (error) {
    console.error('Error finding task: ', error);
    throw error;
  }
};

export const editTask = async ({ id, ...task }: Task): Promise<boolean | undefined> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    await updateDoc(taskDocRef, task);
    return true;
  } catch (error) {
    console.error('Error editing task: ', error);
    throw error;
  }
};

export const deleteTaskById = async (id: string): Promise<boolean | undefined> => {
  try {
    const teskDocRef = doc(db, tasksCollectionName, id);
    await deleteDoc(teskDocRef);
    return true;
  } catch (error) {
    console.error('Error deleting task: ', error);
    throw error;
  }
};
