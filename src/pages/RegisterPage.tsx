import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container dir="rtl" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            התחברות
          </Typography>

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{ width: "100%" }}
          >
            <TextField
              {...register("firstName")}
              fullWidth
              label="שם פרטי"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("lastName")}
              fullWidth
              label="שם משפחה"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("email")}
              fullWidth
              label="כתובת אימייל"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("password")}
              fullWidth
              label="סיסמה"
              type="password"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              היכנס
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
