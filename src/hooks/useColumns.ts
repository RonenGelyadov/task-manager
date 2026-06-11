import { useEffect, useState } from "react";
import type { Column } from "../types/Column";

const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>(
    JSON.parse(localStorage.getItem("columns") as string) ?? [],
  );

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const handleAddColumn = (column: Column) => {
    const newColumns: Column[] = [
      ...columns,
      {
        ...column,
        id: crypto.randomUUID(),
      },
    ];

    setColumns(newColumns);
  };

  return { columns, handleAddColumn };
};

export default useColumns;
