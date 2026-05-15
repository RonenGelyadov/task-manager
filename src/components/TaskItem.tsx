import {
  Box,
  Typography,
  Paper,
  Chip,
  Checkbox,
  Container,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import type { Task } from "../types/Task";
import ROUTES from "../router/routs";

const TaskItem = ({
  id,
  title,
  body,
  priority,
  dueDate,
  isCompleted,
}: Task) => {
  const getPriorityColor = (
    level: string,
  ): "error" | "warning" | "success" | "default" => {
    switch (level) {
      case "high":
        return "error"; // אדום
      case "medium":
        return "warning"; // כתום
      case "low":
        return "success"; // ירוק
      default:
        return "default";
    }
  };

  // תרגום העדיפות לעברית עבור התצוגה
  const getPriorityLabel = (level: string) => {
    switch (level) {
      case "high":
        return "גבוהה";
      case "medium":
        return "בינונית";
      case "low":
        return "נמוכה";
      default:
        return level;
    }
  };

  return (
    <Container maxWidth="lg">
      <NavLink to={`${ROUTES.TASK}/${id}`} style={{ textDecoration: "none" }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 }, // קצת יותר מרווח במסכים גדולים
            mb: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: isCompleted ? "action.hover" : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // צל עדין במעבר עכבר
            },
          }}
        >
          {/* צ'קבוקס לסימון המשימה */}
          <Box sx={{ pt: 0.5 }}>
            <Checkbox
              checked={isCompleted}
              sx={{
                color: "text.disabled",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          </Box>

          {/* אזור התוכן המרכזי */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                color: isCompleted ? "text.secondary" : "text.primary",
                textDecoration: isCompleted ? "line-through" : "none",
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2.5,
                display: "-webkit-box",
                WebkitLineClamp: 2, // מגביל את גוף המשימה ל-2 שורות כדי לשמור על גובה אחיד
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {body}
            </Typography>

            {/* שורת הנתונים התחתונה: פריוריטי ותאריך */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap", // מאפשר שבירת שורה במסכים צרים מאוד
                gap: 2,
              }}
            >
              <Chip
                label={`עדיפות: ${getPriorityLabel(priority)}`}
                color={getPriorityColor(priority)}
                size="small"
                variant={isCompleted ? "outlined" : "filled"} // אם הושלם, הופך את הצבע לשקוף יותר
                sx={{ fontWeight: 500, borderRadius: 1.5 }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: isCompleted ? "text.disabled" : "text.secondary",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                🗓️ לביצוע עד: {dueDate}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </NavLink>
    </Container>
  );
};

export default TaskItem;
