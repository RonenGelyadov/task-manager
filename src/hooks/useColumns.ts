import { useState } from "react";
import type { ColumnType } from "../types/Column";
import {
  addNewColumn,
  deleteColumnById,
  getColumnsData,
} from "../services/columnsFirebaseService";

const useColumns = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const getColumns = async (): Promise<void> => {
    try {
      const savedColumns = await getColumnsData();
      setColumns(savedColumns);
    } catch (error) {
      throw error;
    }
  };

  const handleAddColumn = async (column: ColumnType) => {
    const newColumnData: ColumnType = {
      ...column,
    };

    try {
      await addNewColumn(newColumnData);

      getColumns();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteColumn = async (id: string) => {
    try {
      await deleteColumnById(id);
      
      getColumns();
    } catch (error) {
      console.log(error);
    }
  };

  return { columns, getColumns, handleAddColumn, handleDeleteColumn };
};

export default useColumns;
