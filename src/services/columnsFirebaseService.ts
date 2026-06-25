import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import type { ColumnType } from "../types/Column";

const columnsCollectionName = "columns";
const columnsCollection = collection(db, columnsCollectionName);

export const getColumnsData = async (): Promise<ColumnType[]> => {
  try {
    const querySnapshot = await getDocs(columnsCollection);

    const columns: ColumnType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ColumnType,
    );

    return columns;
  } catch (error) {
    console.error("Error getting columns: ", error);
    throw error;
  }
};

export const addNewColumn = async (data: ColumnType) => {
  try {
    const newDoc = await addDoc(columnsCollection, data);
    return newDoc.id;
  } catch (error) {
    console.error("Error adding column: ", error);
    throw error;
  }
};

export const deleteColumnById = async (id: string) => {
  try {
    const columnDocRef = doc(db, columnsCollectionName, id);
    await deleteDoc(columnDocRef);
  } catch (error) {
    console.error("Error deleting column: ", error);
    throw error;
  }
};
