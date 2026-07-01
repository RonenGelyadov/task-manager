import { Box, IconButton, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ColumnType } from '../types/Column';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { useUser } from '../providers/UserProvider';

type ColumnProps = {
  id: ColumnType['id'];
  name: ColumnType['name'];
  tasks: Task[];
  handleDeleteColumn: (id: string) => void;
};

const Column = ({ id, name, tasks, handleDeleteColumn }: ColumnProps) => {
  const theme = useTheme();

  const { user } = useUser();

  return (
    <Paper
      dir="rtl"
      elevation={2}
      sx={{
        minWidth: { xs: '95vw', md: '50vw', lg: '40vw', xl: '25vw' },
        maxWidth: { xs: '95vw', md: '50vw', lg: '40vw', xl: '25vw' },
        minHeight: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: `2px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.300',
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: '600', flex: 1 }}>
          {name}
        </Typography>
        {user?.role === 'admin' && (
          <Tooltip title="מחק עמודה">
            <IconButton
              color="error"
              sx={{
                backgroundColor: 'error.shades',
              }}
              onClick={() => {
                if (tasks.length > 0) {
                  alert('אין אפשרות למחוק עמודה עם משימות !');
                  return;
                }
                handleDeleteColumn(id);
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
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
              fontStyle: 'italic',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            אין משימות בעמודה...
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Column;
