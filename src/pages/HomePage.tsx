import { useEffect, useState } from "react";
import { Box, Fab, Tooltip, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [isLoading, setIsLoading] = useState(true);

  const { columns, getColumns, handleAddColumn, handleDeleteColumn } = useColumns();
  const { tasks, getTasks, handleAddTask } = useTasks();

  const getAllData = async () => {
    await getColumns();
    await getTasks();
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
        <CircularProgress size="5rem" aria-label="Loading…" />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "95%",
          mb: 7,
          pb: 5,
          display: "flex",
          gap: 3,
          overflowX: "auto",
          scrollbarGutter: "stable",
        }}
      >
        {columns.length > 0 ? (
          columns.map((c) => {
            return (
              <Column
                key={c.id}
                id={c.id}
                name={c.name}
                tasks={tasks.filter((t) => t.columnId === c.id)}
                handleDeleteColumn={handleDeleteColumn}
              />
            );
          })
        ) : (
          <Typography
            dir="rtl"
            color="textSecondary"
            variant="h6"
            sx={{ width: "100%", textAlign: "center", p: 5 }}
          >
            אין עמודות, צור עמודה ראשונה כדי להוסיף משימות.
          </Typography>
        )}
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
          <Tooltip title="הוספת עמודה">
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
          </Tooltip>
          {isColumnOpen && (
            <ColumnFormDialog
              open={isColumnOpen}
              setClose={() => setIsColumnOpen(false)}
              handleSave={handleAddColumn}
            />
          )}
          {columns.length > 0 && (
            <Tooltip title="הוספת משימה">
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
                {isTaskOpen ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <AddIcon fontSize="large" />
                )}
              </Fab>
            </Tooltip>
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
  }
};

export default HomePage;
