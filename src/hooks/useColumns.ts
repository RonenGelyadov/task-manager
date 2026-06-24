import { useState } from "react";
import type { ColumnType } from "../types/Column";
import { addNewColumn, getColumnsData } from "../services/columnsFirebaseService";

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
      //setColumns((prev) => [...prev, newColumn]);
    } catch (error) {
      console.log(error);
    }
  };

  return { columns, getColumns, handleAddColumn };
};

export default useColumns;
