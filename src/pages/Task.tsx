import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  Button,
  Divider,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
// אייקונים
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../types/Task";
import useTasks from "../hooks/useTasks";

const Task = () => {
  const [task, setTask] = useState<Task | null>();
  const { id } = useParams();
  const { findTask } = useTasks();

  useEffect(() => {
    if (id) {
      const task = findTask(id);
      setTask(task);
    }
  }, []);

  return (
    <Container dir="rtl" maxWidth="md" sx={{ py: 5 }}>
      {/* כפתור חזרה למעלה */}
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, textTransform: "none", color: "text.secondary" }}
      >
        חזרה לרשימה
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        {/* כותרת וסטטוס */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
            >
              {task?.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label="בתהליך"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 1, fontWeight: 600, alignItems: "center" }}
              />
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                נוצר ב-{task?.createdAt}
              </Typography>
            </Stack>
          </Box>

          {/* פעולות מהירות */}
          <Stack direction="row" spacing={1}>
            <Tooltip title="ערוך משימה">
              <IconButton sx={{ border: "1px solid", borderColor: "divider" }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="מחק משימה">
              <IconButton
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.light",
                  backgroundColor: "error.shades",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* פרטי המשימה - גוף המשימה */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.disabled",
              mb: 1,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            תיאור המשימה
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary", lineHeight: 1.8, fontSize: "1.1rem" }}
          >
            {task?.body}
          </Typography>
        </Box>

        {/* מטא-דאטה (תאריך ועדיפות) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            p: 3,
            backgroundColor: "action.hover",
            borderRadius: 3,
            mb: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CalendarTodayIcon color="action" />
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                תאריך יעד
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {task?.dueDate}
              </Typography>
            </Box>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FlagIcon color={task?.priority === "high" ? "error" : "warning"} />
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                רמת דחיפות
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {task?.priority === "high" ? "גבוהה מאוד" : "רגילה"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* כפתור פעולה מרכזי */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          endIcon={<CheckCircleOutlineIcon sx={{ mx: 1 }} />}
          sx={{
            py: 2,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": { boxShadow: "none", backgroundColor: "success.dark" },
            backgroundColor: "success.main",
          }}
        >
          סמן כמשימה שהושלמה
        </Button>
      </Paper>
    </Container>
  );
};

export default Task;
