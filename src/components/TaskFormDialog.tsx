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
import useColumns from "../hooks/useColumns";
import { useEffect } from "react";
import { useUser } from "../providers/UserProvider";

interface TaskFormDialogProps {
  open: boolean;
  setClose: () => void;
  handleSave: (data: Task, userId: string) => void;
  initialValues?: Task | null;
  setTask?: (data: Task) => void;
}

const TaskFormDialog = ({
  open,
  setClose,
  handleSave,
  initialValues,
  setTask,
}: TaskFormDialogProps) => {
  const { columns, getColumns } = useColumns();

  const { user } = useUser();

  useEffect(() => {
    getColumns();
  }, []);

  const { register, handleSubmit, control, reset, setValue, getValues } = useForm<Task>({
    defaultValues: initialValues ?? {
      title: "",
      body: "",
      dueDate: "",
      priority: "low",
      columnId: "",
    },
  });

  useEffect(() => {
    if (!initialValues && columns.length > 0 && !getValues("columnId")) {
      setValue("columnId", columns[0].id);
    }
  }, [columns, initialValues, setValue, getValues]);

  const onSubmit = (data: Task) => {
    handleSave(data, user!.id);

    if (setTask) {
      setTask(data);
    }

    reset();
    setClose();
  };

  return (
    <Dialog dir="rtl" open={open} onClose={setClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center" }}>הוספת משימה חדשה</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Controller
              name="columnId"
              control={control}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" label="עמודה">
                  {columns.map((c) => (
                    <MenuItem value={c.id}>{c.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField {...register("title")} variant="outlined" label="כותרת" />

            <TextField
              {...register("body")}
              multiline
              rows={3}
              variant="outlined"
              label="תיאור המשימה"
            />

            <TextField {...register("dueDate")} type="date" variant="outlined" />

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
          <Button variant="contained" color="error" onClick={setClose}>
            ביטול
          </Button>
          <Button variant="contained" type="submit" color="primary">
            אישור
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskFormDialog;
