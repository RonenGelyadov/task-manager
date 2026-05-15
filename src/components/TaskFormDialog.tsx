import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Task } from "../types/Task";

interface TaskFormDialogProps {
  open: boolean;
  setClose: () => void;
  handleSave: (data: Task) => void;
}

const TaskFormDialog = ({
  open,
  setClose,
  handleSave,
}: TaskFormDialogProps) => {
  const { register, handleSubmit, control, reset } = useForm<Task>({
    defaultValues: {
      title: "",
      body: "",
      dueDate: "",
      priority: "low",
    },
  });

  const onSubmit = (data: Task) => {
    handleSave(data);
    reset();
    setClose();
  };

  return (
    <Dialog dir="rtl" open={open} onClose={setClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center" }}>הוספת משימה חדשה</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              {...register("title")}
              variant="outlined"
              label="כותרת"
            />

            <TextField
              {...register("body")}
              multiline
              rows={3}
              variant="outlined"
              label="תיאור המשימה"
            />

            <TextField
              {...register("dueDate")}
              type="date"
              variant="outlined"
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" label="עדיפות">
                  <MenuItem value="high">גבוהה</MenuItem>
                  <MenuItem value="medium">בינונית</MenuItem>
                  <MenuItem value="low">נמוכה</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions dir="ltr">
          <Button variant="contained" type="submit" color="primary">
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskFormDialog;
