import { Box, Container } from "@mui/material";
import useTasks from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const { tasks } = useTasks();

  return (
    <Container dir="rtl" maxWidth="lg">
      <Box>
        {tasks.map((t) => {
          return (
            <TaskItem
              key={t.id}
              id={t.id}
              title={t.title}
              body={t.body}
              priority={t.priority}
              dueDate={t.dueDate}
              isCompleted={t.isCompleted}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Home;
