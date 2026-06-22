import { useEffect, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import useTasks from "../hooks/useTasks";
import TaskFormDialog from "../components/TaskFormDialog";
import useColumns from "../hooks/useColumns";
import ColumnFormDialog from "../components/ColumnFormDialog";
import Column from "../components/Column";

const HomePage = () => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { columns, getColumns, handleAddColumn } = useColumns();
  const { tasks, getTasks, handleAddTask } = useTasks();

  useEffect(() => {
    getColumns();
    getTasks();
  }, []);

  return (
    <Box sx={{ width: "95%", mb: 7, display: "flex", gap: 3 }}>
      {columns.map((c) => {
        return (
          <Column
            key={c.id}
            name={c.name}
            tasks={tasks.filter((t) => t.columnId === c.id)}
          />
        );
      })}
      <Box
        component="div"
        dir="trl"
        sx={{
          position: "fixed",
          bottom: "4rem",
          right: "2rem",
          zIndex: 1200,
          display: "flex",
          gap: 2,
        }}
      >
        <Fab
          color="secondary"
          aria-label="add column"
          sx={{
            height: "5rem",
            width: "5rem",
          }}
          onClick={() => setIsColumnOpen(!isColumnOpen)}
        >
          {isColumnOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <>
              <Typography variant="h5">+</Typography>
              <ViewColumnRoundedIcon fontSize="large" />
            </>
          )}
        </Fab>
        {isColumnOpen && (
          <ColumnFormDialog
            open={isColumnOpen}
            setClose={() => setIsColumnOpen(false)}
            handleSave={handleAddColumn}
          />
        )}
        {columns.length > 0 && (
          <Fab
            hidden
            color="primary"
            aria-label="add task"
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            onClick={() => setIsTaskOpen(!isTaskOpen)}
          >
            {isTaskOpen ? <CloseIcon fontSize="large" /> : <AddIcon fontSize="large" />}
          </Fab>
        )}
        {isTaskOpen && (
          <TaskFormDialog
            open={isTaskOpen}
            setClose={() => setIsTaskOpen(false)}
            handleSave={handleAddTask}
          />
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
