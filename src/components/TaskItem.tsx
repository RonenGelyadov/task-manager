import { Box, Typography, Paper, Chip, Container } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { NavLink } from 'react-router-dom';
import type { Task } from '../types/Task';
import ROUTES from '../router/routs';
import { useDraggable } from '@dnd-kit/core';

const TaskItem = ({
  id,
  title,
  body,
  priority,
  dueDate,
  isCompleted,
}: Omit<Task, 'userId'>) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  const getPriorityColor = (
    level: string,
  ): 'error' | 'warning' | 'success' | 'default' => {
    switch (level) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  // תרגום העדיפות לעברית עבור התצוגה
  const getPriorityLabel = (level: string) => {
    switch (level) {
      case 'high':
        return 'גבוהה';
      case 'medium':
        return 'בינונית';
      case 'low':
        return 'נמוכה';
      default:
        return level;
    }
  };

  return (
    <Container
      maxWidth="lg"
      dir="rtl"
      ref={setNodeRef}
      {...attributes}
      style={{
        opacity: isDragging ? 0.3 : 1,
        touchAction: 'none',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: isCompleted ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            '& .drag-handle': {
              opacity: 1,
            },
          },
        }}
      >
        {/* תוכן הכרטיס — NavLink עוטף רק את התוכן */}
        <NavLink
          to={`${ROUTES.TASK}/${id}`}
          style={{ textDecoration: 'none', flexGrow: 1, minWidth: 0 }}
        >
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                color: isCompleted ? 'text.secondary' : 'text.primary',
                textDecoration: isCompleted ? 'line-through' : 'none',
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2.5,
                display: '-webkit-box',
                WebkitLineClamp: 2, // מגביל את גוף המשימה ל-2 שורות כדי לשמור על גובה אחיד
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {body}
            </Typography>

            {/* שורת הנתונים התחתונה: פריוריטי ותאריך */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap', // מאפשר שבירת שורה במסכים צרים מאוד
                gap: 2,
              }}
            >
              <Chip
                label={`עדיפות: ${getPriorityLabel(priority)}`}
                color={getPriorityColor(priority)}
                size="small"
                variant={isCompleted ? 'outlined' : 'filled'} // אם הושלם, הופך את הצבע לשקוף יותר
                sx={{ fontWeight: 500, borderRadius: 1.5 }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: isCompleted ? 'text.disabled' : 'text.secondary',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                🗓️ לביצוע עד: {dueDate}
              </Typography>
            </Box>
          </Box>
        </NavLink>

        {/* אייקון גרירה — מופיע משמאל ב-RTL, רק עליו פועלים ה-listeners */}
        <Box
          className="drag-handle"
          {...listeners}
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            cursor: isDragging ? 'grabbing' : 'grab',
            color: 'text.disabled',
            opacity: 0,
            transition: 'opacity 0.15s ease, color 0.15s ease',
            flexShrink: 0,
            '&:hover': {
              color: 'text.secondary',
            },
          }}
        >
          <DragIndicatorIcon fontSize="medium" />
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskItem;
