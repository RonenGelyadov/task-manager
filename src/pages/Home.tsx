import { useState } from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import useTasks from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";
import TaskFormDialog from "../components/TaskFormDialog";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { tasks, handleAddTask } = useTasks();

  return (
    <Box sx={{ width: "100%", mb: 7, overflow: "auto" }}>
      {tasks.map((t) => {
        return (
          <TaskItem
            key={t.id}
            id={t.id}
            title={t.title}
            body={t.body}
            priority={t.priority}
            createdAt={t.createdAt}
            dueDate={t.dueDate}
            isCompleted={t.isCompleted}
          />
        );
      })}
      <Fab
        color={isOpen ? "secondary" : "primary"}
        aria-label="add task"
        sx={{
          height: "5rem",
          width: "5rem",
          position: "fixed",
          bottom: "4rem",
          right: "2rem",
          zIndex: 1200,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon fontSize="large" /> : <AddIcon fontSize="large" />}
      </Fab>
      {isOpen && (
        <TaskFormDialog
          open={isOpen}
          setClose={() => setIsOpen(false)}
          handleSave={handleAddTask}
        />
      )}
    </Box>
  );
};

export default Home;
