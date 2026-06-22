import { useState } from "react";
import type { ColumnType } from "../types/Column";
import { getColumnsData } from "../services/columnsFirebaseService";

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

  const handleAddColumn = (column: ColumnType) => {
    const newColumns: ColumnType[] = [
      ...columns,
      {
        ...column,
        id: crypto.randomUUID(),
      },
    ];

    setColumns(newColumns);
  };

  return { columns, getColumns, handleAddColumn };
};

export default useColumns;
