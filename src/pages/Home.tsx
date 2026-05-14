import { Box, Container } from "@mui/material";
import TaskItem from "../components/TaskItem";
import taskList from "../data/taskList";

const Home = () => {
  return (
    <Container dir="rtl" maxWidth="lg">
      <Box>
        {taskList.map((t) => {
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
