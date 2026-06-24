import { Box, Paper, Typography, useTheme } from "@mui/material";
import type { ColumnType } from "../types/Column";
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

type ColumnProps = {
  name: ColumnType["name"];
  tasks: Task[];
};

const Column = ({ name, tasks }: ColumnProps) => {
  const theme = useTheme();

  return (
    <Paper
      dir="rtl"
      elevation={2}
      sx={{
        width: "25vw",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === "dark" ? "background.paper" : "grey.50",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "white",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
          {name}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              body={task.body}
              priority={task.priority}
              dueDate={task.dueDate}
              isCompleted={task.isCompleted}
              columnId={task.columnId}
              createdAt={task.createdAt}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              fontStyle: "italic",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            גרור משימות לכאן...
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Column;
