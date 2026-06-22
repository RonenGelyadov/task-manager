import { collection, getDocs } from "firebase/firestore";
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
