import { useEffect, useState } from 'react';
import { Box, Chip, Fab, Paper, Tooltip, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import useTasks from '../hooks/useTasks';
import TaskFormDialog from '../components/TaskFormDialog';
import useColumns from '../hooks/useColumns';
import ColumnFormDialog from '../components/ColumnFormDialog';
import Column from '../components/Column';
import { useUser } from '../providers/UserProvider';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import type { Task } from '../types/Task';

const HomePage = () => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { columns, getColumns, handleAddColumn, handleDeleteColumn } = useColumns();
  const { tasks, getTasks, handleAddTask, moveTask } = useTasks();
  const { user } = useUser();

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const found = tasks.find((t) => t.id === taskId) ?? null;
    setActiveTask(found);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    // Find the task's current column to avoid a no-op update
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.columnId === newColumnId) return;

    moveTask(taskId, newColumnId);
  };

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
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <CircularProgress size="5rem" aria-label="Loading…" />
      </Box>
    );
  } else {
    return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Box
          sx={{
            width: '95%',
            mb: 7,
            pb: 5,
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollbarGutter: 'stable',
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                p: 5,
              }}
            >
              <Typography dir="rtl" color="textSecondary" variant="h6">
                אין עמודות, צור עמודה ראשונה כדי להוסיף משימות.
              </Typography>
            </Box>
          )}
          {user && (
            <Box
              component="div"
              dir="trl"
              sx={{
                position: 'fixed',
                bottom: '4rem',
                right: '2rem',
                zIndex: 1200,
                display: 'flex',
                gap: 2,
              }}
            >
              <Tooltip title="הוספת עמודה">
                <Fab
                  color="secondary"
                  aria-label="add column"
                  sx={{
                    height: '5rem',
                    width: '5rem',
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
                      height: '5rem',
                      width: '5rem',
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
          )}
        </Box>

        {/* DragOverlay renders outside all overflow contexts — fixes clipping & sizing */}
        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <Paper
              elevation={6}
              dir="rtl"
              sx={{
                p: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                backgroundColor: activeTask.isCompleted ? 'action.hover' : 'background.paper',
                boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                opacity: 0.95,
                cursor: 'grabbing',
                width: 320,
              }}
            >
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    color: activeTask.isCompleted ? 'text.secondary' : 'text.primary',
                    textDecoration: activeTask.isCompleted ? 'line-through' : 'none',
                    mb: 0.5,
                  }}
                >
                  {activeTask.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {activeTask.body}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label={`עדיפות: ${{ high: 'גבוהה', medium: 'בינונית', low: 'נמוכה' }[activeTask.priority] ?? activeTask.priority}`}
                    color={({ high: 'error', medium: 'warning', low: 'success' } as const)[activeTask.priority] ?? 'default'}
                    size="small"
                    variant={activeTask.isCompleted ? 'outlined' : 'filled'}
                    sx={{ fontWeight: 500, borderRadius: 1.5 }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    🗓️ לביצוע עד: {activeTask.dueDate}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }
};

export default HomePage;
