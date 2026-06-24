import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import type { ColumnType } from "../types/Column";
import { useForm } from "react-hook-form";

interface ColumnFormDialogProps {
  open: boolean;
  setClose: () => void;
  handleSave: (data: ColumnType) => void;
}

const ColumnFormDialog = ({
  open,
  setClose,
  handleSave,
}: ColumnFormDialogProps) => {
  const { register, handleSubmit, reset } = useForm<ColumnType>();

  const onSubmit = async (data: ColumnType) => {
    await handleSave(data);
    reset();
    setClose();
  };

  return (
    <Dialog dir="rtl" open={open} onClose={setClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center" }}>הוספת עמודה חדשה</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField {...register("name")} variant="outlined" label="כותרת" />
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

export default ColumnFormDialog;
